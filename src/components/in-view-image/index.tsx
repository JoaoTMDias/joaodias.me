import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { useIntersection } from "react-use";

function InViewImage(props: HTMLAttributes<HTMLImageElement>) {
  const [show, setShow] = useState(false);
  const hasIntersectedBefore = useRef(false);
  const ref = useRef(null);
  const observer = useIntersection(ref, {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  });
  const isIntersecting = !!(observer && observer.isIntersecting && observer.intersectionRatio >= 1);

  useEffect(() => {
    debugger;
    if (isIntersecting && !hasIntersectedBefore) {
      setShow(true);
      hasIntersectedBefore.current = true;
    }
  }, [isIntersecting, hasIntersectedBefore]);

  return <img {...props} data-visible={show} />;
}

export default InViewImage;
