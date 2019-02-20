// Libraries
import React, { useState } from 'react';
import { useSprings, animated, interpolate } from 'react-spring';
import { useGesture } from 'react-with-gesture';

import styled from 'styled-components';
import { rem } from 'polished';

// Interface
interface ISkillsDeckProps {
  theme?: any;
}

const cards = [
  'https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg',
  'https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg',
  'https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg',
  'https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg',
  'https://upload.wikimedia.org/wikipedia/en/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg',
  'https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg',
  'https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg',
  'https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg',
  'https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg',
  'https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg',
  'https://upload.wikimedia.org/wikipedia/en/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg',
  'https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg',
];

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
export const SkillsDeck: React.FunctionComponent<ISkillsDeckProps> = props => {
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
        key={index}
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
          style={{
            transform: interpolate([rotate, scale], trans),
            backgroundImage: `url(${cards[index]})`,
          }}
        />
      </Container>
    ),
  );

  return (
    <Wrapper className="l__container l__section">
      <div className="l__row">{list}</div>
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

const Item = styled.div`
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
  box-shadow: 0 12.5px 100px -10px rgba(50, 50, 73, 0.4),
    0 10px 10px -10px rgba(50, 50, 73, 0.3);
  margin: 0;
  padding: 0;
`;
