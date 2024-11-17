import { useEffect, useRef } from "react";

interface BackgroundProps {
  isMute: boolean;
  volume: number;
}

export default function Background({ isMute, volume }: BackgroundProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMute ? 0 : volume / 100; // Set volume (0 to 1)
    }
  }, [isMute, volume]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted={isMute}
      className="absolute top-0 left-0 h-full w-full object-cover"
    >
      <source src="/background.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
