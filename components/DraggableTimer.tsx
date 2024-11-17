"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTimer } from "@/store";
import { Card } from "@/components/ui/card";
import { IoRefreshCircle, IoRemove } from "react-icons/io5";

interface DraggableTimerProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export default function DraggableTimer({ containerRef }: DraggableTimerProps) {
  const timer = useTimer();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<HTMLDivElement>(null);

  // timer countDown
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    // Only allow dragging if the clicked element is within the draggable header
    if (!target.closest("[data-draggable]")) return;

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

  if (!timer) return null;

  return (
    <Card
      ref={timerRef}
      className={`absolute flex h-44 w-80 select-none flex-col justify-between border-none bg-slate-950/95 p-2 text-center text-white ${
        isDragging ? "opacity-75" : ""
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
      role="timer"
      aria-label="Draggable Timer"
    >
      <div
        className="flex cursor-move items-center justify-between border-b-2 border-b-gray-400 px-2 pb-2"
        data-draggable
      >
        <h2 className="text-xl">Timer</h2>
        <span onClick={() => timer.hideTimer()} className="cursor-pointer">
          <IoRemove size={32} />
        </span>
      </div>

      <div className="flex cursor-default items-center justify-between gap-4 p-4">
        <h3 className="flex-1 text-start text-xl font-bold">
          {formatTime(time)}
        </h3>
        <button
          className="border-1 w-24 flex-1 rounded-md border-gray-700 bg-slate-50 p-2 font-bold text-black"
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <span
          onClick={() => setTime(20 * 60)}
          className="flex flex-1 cursor-pointer justify-center"
          title="Refresh"
        >
          <IoRefreshCircle size={40} />
        </span>
      </div>

      <ul className="flex cursor-default justify-between px-2 pb-2">
        <li>
          <p
            className="cursor-pointer hover:opacity-80"
            onClick={() => {
              setTime(25 * 60);
              setIsRunning(false);
            }}
          >
            Pomodoro
          </p>
        </li>
        <li>
          <p
            className="cursor-pointer hover:opacity-80"
            onClick={() => {
              setTime(5 * 60);
              setIsRunning(false);
            }}
          >
            Short break
          </p>
        </li>
        <li>
          <p
            className="cursor-pointer hover:opacity-80"
            onClick={() => {
              setTime(10 * 60);
              setIsRunning(false);
            }}
          >
            Long break
          </p>
        </li>
      </ul>
    </Card>
  );
}
