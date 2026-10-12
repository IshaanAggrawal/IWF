import { useEffect, useRef, useState } from "react";
import { useLocation } from "@tanstack/react-router";

/**
 * PageTransition — wraps page content with a fade-in/out on route changes.
 * Also renders the global scroll progress bar.
 */
export function ScrollProgressBar() {
  return (
    <div
      className="scroll-progress-bar"
      aria-hidden="true"
    />
  );
}

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    const currentPath = location.pathname;

    if (prevPathRef.current !== null && prevPathRef.current !== currentPath) {
      setIsVisible(false);
      setAnimationDone(false);
      const timer = setTimeout(() => {
        setIsVisible(true);
        window.scrollTo({ top: 0, behavior: "instant" });
        const doneTimer = setTimeout(() => {
          setAnimationDone(true);
        }, 300);
        return () => clearTimeout(doneTimer);
      }, 150);
      prevPathRef.current = currentPath;
      return () => clearTimeout(timer);
    }

    // Initial mount
    const timer = setTimeout(() => {
      setIsVisible(true);
      const doneTimer = setTimeout(() => {
        setAnimationDone(true);
      }, 300);
      return () => clearTimeout(doneTimer);
    }, 10);
    prevPathRef.current = currentPath;
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: animationDone ? "none" : (isVisible ? "translateY(0)" : "translateY(6px)"),
        transition: animationDone ? "opacity 0.28s cubic-bezier(0.16,1,0.3,1)" : "opacity 0.28s cubic-bezier(0.16,1,0.3,1), transform 0.28s cubic-bezier(0.16,1,0.3,1)",
        willChange: animationDone ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
