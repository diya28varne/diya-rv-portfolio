"use client";

import { cn } from "@/lib/utils";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

type TrailImage = {
  id: number;
  x: number;
  y: number;
  src: string;
  rotate: number;
};

type ImageCursorTrailProps = {
  items: string[];
  maxNumberOfImages?: number;
  distance?: number;
  imgClass?: string;
  className?: string;
  fadeAnimation?: boolean;
  children?: ReactNode;
};

export function ImageCursorTrail({
  items,
  maxNumberOfImages = 8,
  distance = 20,
  imgClass,
  className,
  fadeAnimation = true,
  children,
}: ImageCursorTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: -9999, y: -9999 });
  const indexRef = useRef(0);
  const idRef = useRef(0);
  const [trail, setTrail] = useState<TrailImage[]>([]);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const removeTrailItem = useCallback((id: number) => {
    setTrail((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || items.length === 0) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    if (Math.hypot(dx, dy) < distance) return;

    lastPos.current = { x, y };
    const src = items[indexRef.current % items.length];
    indexRef.current += 1;
    idRef.current += 1;
    const id = idRef.current;
    const rotate = (Math.random() - 0.5) * 36;

    setTrail((prev) => {
      const next = [...prev, { id, x, y, src, rotate }];
      return next.slice(-maxNumberOfImages);
    });

    if (fadeAnimation) {
      window.setTimeout(() => removeTrailItem(id), 1500);
    }
  };

  const onLeave = () => {
    lastPos.current = { x: -9999, y: -9999 };
    if (fadeAnimation) setTrail([]);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("relative overflow-hidden", className)}
    >
      {children}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
        {trail.map((item) => (
          <span
            key={item.id}
            className="absolute animate-[skill-trail-fade_1.5s_ease_forwards]"
            style={{
              left: item.x,
              top: item.y,
              transform: `translate(-50%, -50%) rotate(${item.rotate}deg)`,
            }}
          >
            <img src={item.src} alt="" className={cn("select-none", imgClass)} />
          </span>
        ))}
      </div>
    </div>
  );
}
