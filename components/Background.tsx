"use client";

import { useEffect, useRef } from "react";
import { useAudio } from "../store";

export default function Background() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { isMute, volume } = useAudio();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMute;
      if (!isMute) {
        videoRef.current.volume = volume / 100;
      }
      console.log("Updated video settings: mute =", isMute, "volume =", volume);
    }
  }, [isMute, volume]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      className="absolute left-0 top-0 h-full w-full object-cover"
    >
      <source src="/background.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
