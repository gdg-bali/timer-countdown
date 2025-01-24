import React from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Play } from "lucide-react";
import { Pause } from "lucide-react";

interface Props {
  hours: number;
  minutes: number;
  seconds: number;
  fontSize: string;
  progress: number;
  funcStart: () => void;
  funcPause: () => void;
}

const TimerContent: React.FC<Props> = ({
  hours,
  minutes,
  seconds,
  fontSize,
  progress,
  funcStart,
  funcPause,
}) => {
  return (
    <>
      <div
        className="flex justify-center items-center gap-2 mb-6"
        style={{ fontSize: `${fontSize}` }}
      >
        <h6>{hours}</h6>
        <span>:</span>
        <h6>{minutes}</h6>
        <span>:</span>
        <h6>{seconds}</h6>
      </div>
      <Progress value={progress} className="h-2 mb-5" />
      <div className="flex justify-center items-center gap-2">
        <Button onClick={funcStart} variant={"outline"}>
          <Play />
        </Button>
        <Button onClick={funcPause} variant={"outline"}>
          <Pause />
        </Button>
      </div>
    </>
  );
};

export default TimerContent;
