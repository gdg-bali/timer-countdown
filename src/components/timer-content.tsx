import React, { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Play } from "lucide-react";
import { Pause } from "lucide-react";

interface Props {
  hours: string;
  minutes: string;
  seconds: string;
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
  const [buttonStatus, setButtonStatus] = useState(true);

  return (
    <div className="flex flex-col w-[50%] mx-auto">
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
      <Progress value={progress} className="h-1 mb-5" />
      <div className="flex justify-center items-center gap-2">
        {buttonStatus ? (
          <Button
            className="border-0 shadow-none"
            onClick={() => {
              funcStart();
              setButtonStatus(false); // Use setButtonStatus properly
            }}
            variant={"outline"}
          >
            <Play />
          </Button>
        ) : (
          <Button
            className="border-0 shadow-none"
            onClick={() => {
              funcPause();
              setButtonStatus(true); // Toggle button status back
            }}
            variant={"outline"}
          >
            <Pause />
          </Button>
        )}
      </div>
    </div>
  );
};

export default TimerContent;
