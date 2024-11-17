"use client";

import React, { useState, useRef } from "react";
import { useStickyNotes } from "@/store";
import { Card } from "@/components/ui/card";
import { IoRemove } from "react-icons/io5";

interface DraggableStickyNoteProps {
  containerRef: React.RefObject<HTMLDivElement>;
  id: number;
  content: string;
  key: number;
}

export default function DraggableStickyNote({
  containerRef,
  id,
  content,
}: DraggableStickyNoteProps) {
  const notes = useStickyNotes();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(`Note ${id}`);
  const [noteContent, setNoteContent] = useState(content);

  const NoteRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (!target.closest("[data-draggable]")) return;

    setIsDragging(true);
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && NoteRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const timerRect = NoteRef.current.getBoundingClientRect();

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

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent new lines
      setIsEditing(false);
    }
  };

  return (
    <Card
      ref={NoteRef}
      className={`absolute flex min-h-44 w-80 select-none flex-col border-none bg-slate-950/95 p-2 text-white ${
        isDragging ? "opacity-75" : ""
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
      role="timer"
      aria-label="Draggable Note"
    >
      <div
        className={`flex items-center justify-between border-b-2 border-b-gray-400 px-2 pb-2 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        data-draggable
      >
        {isEditingTitle ? (
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setIsEditingTitle(false)}
            onKeyDown={(e) => handleKeyDown(e, setIsEditingTitle)}
            autoFocus
            className="h-8 w-full resize-none overflow-hidden bg-transparent text-xl text-white outline-none"
          />
        ) : (
          <h2
            className="cursor-default text-xl"
            onClick={() => setIsEditingTitle(true)}
          >
            {title}
          </h2>
        )}
        <span
          onClick={() => notes.removeNote(id)}
          className="h-full cursor-pointer"
        >
          <IoRemove size={32} />
        </span>
      </div>
      <div className="flex-1">
        {isEditingContent ? (
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            onBlur={() => setIsEditingContent(false)}
            autoFocus
            className="h-full w-full resize-none bg-transparent text-white outline-none"
          />
        ) : (
          <p
            className="h-full w-full flex-1 whitespace-pre-wrap break-words"
            onClick={() => setIsEditingContent(true)}
          >
            {noteContent || "Add your note ..."}
          </p>
        )}
      </div>
    </Card>
  );
}
