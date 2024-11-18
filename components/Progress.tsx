"use client";

import * as React from "react";
import { useRef } from "react";
import { useAudio } from "../store";

export function ProgressSound({ className }: { className: string }) {
  const progressRef = useRef<HTMLDivElement | null>(null);
  const { isMute, volume, setVolume } = useAudio();

  const handleMouseMove = (event: MouseEvent | TouchEvent) => {
    if (!progressRef.current) return;

    const progressBar = progressRef.current;
    const rect = progressBar.getBoundingClientRect();

    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    let percentage = ((clientX - rect.left) / rect.width) * 100;

    percentage = Math.max(0, Math.min(100, percentage)); // Clamp between 0 and 100

    setVolume(isMute ? 0 : percentage);
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
      className={`relative h-4 w-40 rounded-md bg-gray-200 ${className}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      <div
        className="absolute left-0 top-0 h-full rounded-md bg-blue-500"
        style={{ width: `${volume}%` }}
      ></div>
    </div>
  );
}
