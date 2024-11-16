"use client";

import React, { useRef } from "react";
import DraggableTimer from "./DraggableTimer";

export default function DraggableContainer() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full flex-grow overflow-hidden rounded-lg"
      aria-label="Timer Container"
    >
      <DraggableTimer containerRef={containerRef} />
    </div>
  );
}
