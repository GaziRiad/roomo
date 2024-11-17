"use client";

import React, { useRef } from "react";
import DraggableTimer from "./DraggableTimer";
import { useTimer, useTodoList } from "@/store";
import DraggableTodoList from "./DraggableTodoList";

export default function DraggableContainer() {
  const containerRef = useRef<HTMLDivElement>(null);

  const timer = useTimer((state) => state.timer);
  const todoList = useTodoList((state) => state.todoList);
  return (
    <div
      ref={containerRef}
      className="relative h-full w-full flex-grow overflow-hidden rounded-lg"
      aria-label="Timer Container"
    >
      {timer && <DraggableTimer containerRef={containerRef} />}
      {todoList && <DraggableTodoList containerRef={containerRef} />}
      {/* {todoList && <DraggableTodoList containerRef={containerRef} />} */}
    </div>
  );
}
