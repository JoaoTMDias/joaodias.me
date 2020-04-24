// Libraries
import React, { useState } from "react";
import { useSprings, animated, interpolate } from "react-spring";
import { useGesture } from "react-with-gesture";
import { Wrapper, Item, Image } from "./styles";

const ROTATION_FACTOR = 10;

const to = (i) => ({
	x: 0,
	y: i * -4,
	scale: 1,
	rotate: -10 + Math.random() * 20,
	delay: i * 100,
});
const from = (i) => ({
	x: 0,
	y: i * -4,
	rotate: 0,
	scale: 1.1,
	z: -1000,
});
const trans = (rotate, scale) =>
	`perspective(1500px) rotateX(30deg) rotateY(${rotate / ROTATION_FACTOR}deg) rotateZ(${rotate}deg) scale(${scale})`;

/**
 * @description A Card Deck of Skills
 * @author João Dias
 * @date 2019-02-16
 */
export const SkillsDeck = ({ cards }) => {
	const [gone] = useState(() => new Set());
	const [spring, setSpring] = useSprings(
		cards.length,

		(i) => {
			return {
				...to(i),
				from: from(i),
			};
		},
	);

	// Create a bunch of springs using the helpers above
	// Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
	const bind = useGesture(({ args: [index], down, delta: [xDelta], distance, direction: [xDirection], velocity }) => {
		const trigger = velocity > 0.2;
		const direction = xDirection < 0 ? -1 : 1;

		if (!down && trigger) {
			gone.add(index);
		}

		setSpring((i) => {
			if (index !== i) return;

			const isGone = gone.has(index);

			let x = 0;

			if (isGone) {
				x = (200 + window.innerWidth) * direction;
			} else if (down) {
				x = xDelta;
			}

			const rotate = xDelta / 100 + (isGone ? direction * 10 * velocity : 0);
			const scale = down ? 1.1 : 1;

			return {
				x,
				rotate,
				scale,
				delay: undefined,
				config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
			};
		});

		if (!down && gone.size === cards.length) {
			setTimeout(() => gone.clear() || setSpring((i) => to(i)), 600);
		}
	});

	const Container = animated(Item);
	const Card = animated(Image);

	/**
	 *
	 * @param {object} param
	 * @param {React.KeyboardEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>} param.event
	 * @param {number} param.index
	 * @param {boolean} [param.isDoubleClick]
	 */
	
	function removeCardfromIndex({ event, index, isDoubleClick = false }) {
		if (event.keyCode === 13 || isDoubleClick) {
			event.preventDefault();

			gone.add(index);
			bind(index).onMouseDown(event);
		}
	}

	const list = spring.map(({ x, y, rotate, scale }, index) => {
		const isRemoved = !!gone.has(index);
		return (
			<Container
				key={cards[index].node.id}
				aria-label={`${cards[index].node.description}`}
				style={{
					transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`),
				}}
			>
				<Card
					{...bind(index)}
					type="button"
					aria-label={`${cards[index].node.icon.description}`}
					onKeyUp={(event) => removeCardfromIndex({ event, index })}
					onDoubleClick={(event) => removeCardfromIndex({ event, index, isDoubleClick: true })}
					tabIndex={isRemoved ? -1 : 0}
					style={{
						transform: interpolate([rotate, scale], trans),
						backgroundImage: `url(${cards[index].node.icon.file.url})`,
						backgroundColor: `${cards[index].node.backgroundColor}`,
					}}
				/>
			</Container>
		);
	});

	return (
		<Wrapper className="skills layout__container layout__section">
			<h5 className="skills__title">My skillset</h5>
			<ol className="layout__row">{list}</ol>
			<p className="skills__disclaimer">Swipe Left/Right to check them out.</p>
		</Wrapper>
	);
};

// Styling

export default SkillsDeck;
