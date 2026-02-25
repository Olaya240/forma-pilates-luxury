import { ReactNode, useRef, useEffect, useState, CSSProperties, ElementType } from "react";

const KEYFRAMES = `
  @keyframes asFadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes asFadeDown {
    from { opacity: 0; transform: translateY(-32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes asSlideLeft {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes asSlideRight {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes asScaleIn {
    from { opacity: 0; transform: scale(0.94); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes asFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes asReveal {
    from { opacity: 0; transform: translateY(20px) skewY(1deg); }
    to   { opacity: 1; transform: translateY(0) skewY(0deg); }
  }
`;

type AnimationType =
  | "fade-in-up"
  | "fade-in-down"
  | "slide-in-left"
  | "slide-in-right"
  | "scale-in"
  | "fade-in"
  | "reveal"
  | "fade-slide-up"
  | "fade-slide-down"
  | "fade-slide-left"
  | "fade-slide-right";

const ANIMATION_MAP: Record<AnimationType, string> = {
  "fade-in-up":      "asFadeUp",
  "fade-slide-up":   "asFadeUp",
  "fade-in-down":    "asFadeDown",
  "fade-slide-down": "asFadeDown",
  "slide-in-left":   "asSlideLeft",
  "fade-slide-right":"asSlideRight",
  "slide-in-right":  "asSlideRight",
  "fade-slide-left": "asSlideLeft",
  "scale-in":        "asScaleIn",
  "fade-in":         "asFadeIn",
  "reveal":          "asReveal",
};

type EasingPreset = "elegant" | "spring" | "smooth" | "linear";
const EASING: Record<EasingPreset, string> = {
  elegant: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  spring:  "cubic-bezier(0.34, 1.3, 0.64, 1)",
  smooth:  "cubic-bezier(0.4, 0, 0.2, 1)",
  linear:  "linear",
};

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
  easing?: EasingPreset;
  threshold?: number;
  once?: boolean;
  // ElementType accepts string tags AND React components — no SVG collision
  as?: ElementType;
}

let injected = false;

const AnimatedSection = ({
  children,
  animation = "fade-in-up",
  className = "",
  style,
  delay = 0,
  duration = 800,
  easing = "elegant",
  threshold = 0.12,
  once = true,
  as: Tag = "div",
}: AnimatedSectionProps) => {
  // HTMLDivElement is a safe concrete type for IntersectionObserver — works for all HTML tags
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (injected) return;
    const el = document.createElement("style");
    el.textContent = KEYFRAMES;
    document.head.appendChild(el);
    injected = true;
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  const keyframe = ANIMATION_MAP[animation] ?? "asFadeUp";

  const getInitialTransform = (): string => {
    if (animation === "scale-in") return "scale(0.94)";
    if (animation === "fade-in-up" || animation === "fade-slide-up" || animation === "reveal")
      return "translateY(32px)";
    if (animation === "fade-in-down" || animation === "fade-slide-down")
      return "translateY(-32px)";
    if (animation === "slide-in-left" || animation === "fade-slide-left")
      return "translateX(40px)";
    if (animation === "slide-in-right" || animation === "fade-slide-right")
      return "translateX(-40px)";
    return "none";
  };

  const animStyle: CSSProperties = isVisible
    ? {
        animation: `${keyframe} ${duration}ms ${EASING[easing]} ${delay}ms both`,
        willChange: "opacity, transform",
      }
    : {
        opacity: 0,
        transform: getInitialTransform(),
      };

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={className}
      style={{ ...animStyle, ...style }}
    >
      {children}
    </Tag>
  );
};

export default AnimatedSection;