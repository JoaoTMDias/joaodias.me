import { ReactNode, FC, CSSProperties, useEffect, useState, useRef } from "react";
import styles from "./styles.module.scss";

interface MarqueeProps {
  /**
   * Inline style for the container div
   * Type: object
   * Default: {}
   */
  style?: CSSProperties;
  /**
   * Class name to style the container div
   * Type: string
   * Default: ""
   */
  className?: string;
  /**
   * Whether to play or pause the marquee
   * Type: boolean
   * Default: true
   */
  play?: boolean;
  /**
   * Whether to pause the marquee when hovered
   * Type: boolean
   * Default: false
   */
  pauseOnHover?: boolean;
  /**
   * Whether to pause the marquee when clicked
   * Type: boolean
   * Default: false
   */
  pauseOnClick?: boolean;
  /**
   * The direction the marquee is sliding
   * Type: "left" or "right"
   * Default: "left"
   */
  direction?: "left" | "right";
  /**
   * Speed calculated as pixels/second
   * Type: number
   * Default: 20
   */
  speed?: number;
  /**
   * Duration to delay the animation after render, in seconds
   * Type: number
   * Default: 0
   */
  delay?: number;
  /**
   * The number of times the marquee should loop, 0 is equivalent to infinite
   * Type: number
   * Default: 0
   */
  loop?: number;

  /**
   * A callback for when the marquee finishes scrolling and stops. Only calls if loop is non-zero.
   * Type: Function
   * Default: null
   */
  onFinish?: () => void;
  /**
   * A callback for when the marquee finishes a loop. Does not call if maximum loops are reached (use onFinish instead).
   * Type: Function
   * Default: null
   */
  onCycleComplete?: () => void;
  /**
   * The children rendered inside the marquee
   * Type: ReactNode
   * Default: null
   */
  children?: ReactNode;
}

export const Marquee: FC<MarqueeProps> = ({
  style = {},
  className = "",
  play = true,
  pauseOnHover = true,
  pauseOnClick = false,
  direction = "left",
  speed = 20,
  delay = 0,
  loop = 0,
  onFinish,
  onCycleComplete,
  children,
}) => {
  // React Hooks
  const [containerWidth, setContainerWidth] = useState(0);
  const [marqueeWidth, setMarqueeWidth] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const calculateWidth = () => {
    // Find width of container and width of marquee
    if (marqueeRef.current && containerRef.current) {
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
      setMarqueeWidth(marqueeRef.current.getBoundingClientRect().width);
    }

    if (marqueeWidth < containerWidth) {
      setDuration(containerWidth / speed);
    } else {
      setDuration(marqueeWidth / speed);
    }
  };

  useEffect(() => {
    calculateWidth();
    // Rerender on window resize
    window.addEventListener("resize", calculateWidth);
    return () => {
      window.removeEventListener("resize", calculateWidth);
    };
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const marqueeElement = (
    <div
      ref={marqueeRef}
      style={{
        ["--play" as string]: play ? "running" : "paused",
        ["--direction" as string]: direction === "left" ? "normal" : "reverse",
        ["--duration" as string]: `${duration}s`,
        ["--delay" as string]: `${delay}s`,
        ["--iteration-count" as string]: !!loop ? `${loop}` : "infinite",
      }}
      className={styles.marquee}
      onAnimationIteration={onCycleComplete}
      onAnimationEnd={onFinish}
    >
      {children}
    </div>
  );

  return (
    <>
      {!isMounted ? null : (
        <div
          ref={containerRef}
          style={{
            ...style,
            ["--pause-on-hover" as string]: pauseOnHover ? "paused" : "running",
            ["--pause-on-click" as string]: pauseOnClick ? "paused" : "running",
          }}
          className={className + styles["marquee-container"]}
        >
          {marqueeElement}
          {marqueeElement}
          {marqueeElement}
        </div>
      )}
    </>
  );
};
