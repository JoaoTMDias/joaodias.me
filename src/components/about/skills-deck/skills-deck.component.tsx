// Libraries
import React, { useState } from 'react';
import { useSprings, animated, interpolate } from 'react-spring';
import { useGesture } from 'react-with-gesture';

import { AllContentfulSkillsEdge } from '../../../data/interfaces/index.interfaces';
import styled from 'styled-components';
import { rem } from 'polished';

// Interface
interface ISkillsDeckProps {
  theme?: any;
  cards: AllContentfulSkillsEdge[];
}

const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rotate: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (i: number) => ({
  x: 0,
  y: i * -4,
  rotate: 0,
  scale: 1.1,
  z: -1000,
});
const trans = (rotate: number, scale: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${rotate /
    10}deg) rotateZ(${rotate}deg) scale(${scale})`;

/**
 * @description A Card Deck of Skills
 * @author João Dias
 * @date 2019-02-16
 * @returns {React.FunctionComponent<ISkillsDeckProps>}
 */
export const SkillsDeck: React.FunctionComponent<ISkillsDeckProps> = ({
  cards,
}) => {
  const [gone] = useState(() => new Set());
  const [data, set] = useSprings(
    cards.length,
    //@ts-ignore
    (i: number) => {
      return {
        ...to(i),
        from: from(i),
      };
    },
  );

  // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDirection],
      velocity,
    }) => {
      const trigger = velocity > 0.2; // If you flick hard enough it should trigger the card to fly out
      const direction = xDirection < 0 ? -1 : 1; // Direction should either point left or right
      if (!down && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      set((i: number) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone
          ? (200 + window.innerWidth) * direction
          : down
          ? xDelta
          : 0;
        const rotate = xDelta / 100 + (isGone ? direction * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1; // Active cards lift up a bit
        return {
          x,
          rotate,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === cards.length)
        setTimeout(
          //@ts-ignore
          () => gone.clear() || set((i: number) => to(i)),
          600,
        );
    },
  );

  const Container = animated(Item);
  const Card = animated(Image);

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  const list: JSX.Element[] = data.map(
    ({ x, y, rotate, scale }: any, index: number) => (
      <Container
        key={cards[index].node.id}
        aria-title={`${cards[index].node.title}`}
        aria-label={`${cards[index].node.description}`}
        style={{
          transform: interpolate(
            [x, y],
            (x, y) => `translate3d(${x}px,${y}px,0)`,
          ),
        }}
      >
        {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
        <Card
          {...bind(index)}
          aria-label={`${cards[index].node.icon.description}`}
          style={{
            transform: interpolate([rotate, scale], trans),
            backgroundImage: `url(${cards[index].node.icon.file.url})`,
            backgroundColor: `${cards[index].node.backgroundColor}`,
          }}
        />
      </Container>
    ),
  );

  return (
    <Wrapper className="l__container l__section">
      <ul className="l__row">{list}</ul>
    </Wrapper>
  );
};

// Styling
const Wrapper = styled.section`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  .l__row {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 50vh;
  }
`;

const Item = styled.li`
  position: absolute;
  width: 50vw;
  max-width: ${rem('230px')};
  height: 50vh;
  max-height: ${rem('300px')};
  margin: 0 auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  will-change: transform;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${({ theme }) => theme.breakpointMedium} {
    max-width: ${rem('190px')};
  }
`;

const Image = styled.figure`
  width: 50vw;
  max-width: ${rem('230px')};
  height: 50vh;
  max-height: ${rem('300px')};

  @media ${({ theme }) => theme.breakpointMedium} {
    max-width: ${rem('190px')};
  }

  background-color: white;
  background-size: auto 85%;
  background-repeat: no-repeat;
  background-position: center center;
  will-change: transform;
  border-radius: 10px;
  box-shadow: 0 12px 96px -12px rgba(50, 50, 73, 0.1),
    0 8px 8px -8px rgba(50, 50, 73, 0.2);
  margin: 0;
  padding: 0;
`;
