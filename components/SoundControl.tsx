"use client";
import { Volume2, VolumeOff } from "lucide-react";
import { ProgressSound } from "./Progress";
import { useAudio } from "@/store";

export default function SoundControl() {
  const { volume, isMute, toggleMute } = useAudio();

  return (
    <div className="flex items-center gap-3">
      {isMute || !volume ? (
        <VolumeOff
          onClick={toggleMute}
          className="cursor-pointer pr-1 hover:opacity-80"
        />
      ) : (
        <Volume2
          onClick={toggleMute}
          className="cursor-pointer pr-1 hover:opacity-80"
        />
      )}
      <ProgressSound className={""} />
    </div>
  );
}
