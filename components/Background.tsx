"use client";

import { useRef } from "react";
import { useAudio } from "../store";

export default function Background() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { isMute, volume } = useAudio();

  return (
    <video
      ref={videoRef}
      muted={isMute}
      autoPlay
      loop
      className="absolute left-0 top-0 h-full w-full object-cover"
    >
      <source src="/background.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
