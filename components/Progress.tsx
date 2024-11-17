"use client";

import * as React from "react";
import { useRef } from "react";

export function ProgressSound({
  isMute,
  volume,
  onVolumeChange,
  className,
}: {
  isMute: boolean;
  volume: number;
  onVolumeChange: (newVolume: number) => void;
  className: string;
}) {
  const progressRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (event: MouseEvent | TouchEvent) => {
    if (!progressRef.current) return;

    const progressBar = progressRef.current;
    const rect = progressBar.getBoundingClientRect();

    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    let percentage = ((clientX - rect.left) / rect.width) * 100;

    percentage = Math.max(0, Math.min(100, percentage)); // Clamp between 0 and 100

    onVolumeChange(isMute ? 0 : percentage);
  };

  const handleMouseDown = (event: React.MouseEvent | React.TouchEvent) => {
    if (isMute) return;

    handleMouseMove(event.nativeEvent);

    const moveEvent =
      "touches" in event.nativeEvent ? "touchmove" : "mousemove";
    const upEvent = "touches" in event.nativeEvent ? "touchend" : "mouseup";

    document.addEventListener(moveEvent, handleMouseMove);
    document.addEventListener(upEvent, () => {
      document.removeEventListener(moveEvent, handleMouseMove);
      document.removeEventListener(upEvent, handleMouseMove);
    });
  };

  return (
    <div
      ref={progressRef}
      className={`relative w-40 h-4 bg-gray-200 rounded-md ${className}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      <div
        className="absolute top-0 left-0 h-full bg-blue-500 rounded-md"
        style={{ width: `${volume}%` }}
      ></div>
    </div>
  );
}
