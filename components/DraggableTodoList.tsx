"use client";

import React, { useState, useRef } from "react";
import { Card } from "@/components/ui/card";

interface DraggableTimerProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function DraggableTodoList({
  containerRef,
}: DraggableTimerProps) {
  const [position, setPosition] = useState({ x: 680, y: 120 });
  const [isDragging, setIsDragging] = useState(false);
  const timerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && timerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const timerRect = timerRef.current.getBoundingClientRect();

        const newX = Math.max(
          0,
          Math.min(e.clientX - startX, containerRect.width - timerRect.width),
        );
        const newY = Math.max(
          0,
          Math.min(e.clientY - startY, containerRect.height - timerRect.height),
        );

        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <Card
      ref={timerRef}
      className={`absolute h-40 w-64 cursor-move select-none p-2 text-center ${isDragging ? "opacity-75" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
      role="timer"
      aria-label="Draggable Todo List"
    >
      <div className="text-lg font-bold">Im a movable todo list</div>
    </Card>
  );
}
