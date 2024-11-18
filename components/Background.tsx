"use client";

import { useRef, useEffect } from "react";
import YouTube from "react-youtube";
import { useAudio } from "../store";

export default function Background({
  videoId = "j28oQ3zsGGI",
}: {
  videoId?: string;
}) {
  const playerRef = useRef<YouTube>(null);
  const { isMute, volume } = useAudio();

  // Force play when player is ready
  const onReady = (event: { target: any }) => {
    // Store player reference
    const player = event.target;

    // Ensure video plays
    player.playVideo();

    // Set initial mute state and volume
    if (isMute) {
      player.mute();
    } else {
      player.unMute();
      player.setVolume(volume);
    }
  };

  // Handle mute/volume changes
  useEffect(() => {
    const player = playerRef.current?.getInternalPlayer();
    if (player) {
      if (isMute) {
        player.mute();
      } else {
        player.unMute();
        player.setVolume(volume * 100);
      }
    }
  }, [isMute, volume]);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      // Force autoplay
      autoplay: 1,
      // Enable JS API
      enablejsapi: 1,
      // Hide controls
      controls: 0,
      // Disable keyboard
      disablekb: 1,
      // Disable fullscreen
      fs: 0,
      // Hide video annotations
      iv_load_policy: 3,
      // Enable looping
      playlist: videoId,
      loop: 1,
      // Hide YouTube branding
      modestbranding: 1,
      // Enable inline playback
      playsinline: 1,
      // Hide related videos
      rel: 0,
      // Hide video info
      showinfo: 0,
      cc_load_policy: 3, // This disables captions
    },
  };

  return (
    <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        ref={playerRef}
        className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full min-w-full max-w-none -translate-x-1/2 -translate-y-1/2"
        onPlay={() => {
          console.log("Video started playing");
        }}
        onPause={() => {
          // If video pauses, try to resume
          const player = playerRef.current?.getInternalPlayer();
          if (player) {
            player.playVideo();
          }
        }}
      />
    </div>
  );
}
