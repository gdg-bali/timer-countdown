import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import TimerContent from "./timer-content";
import { useRef, useState } from "react";
import { Fullscreen } from "lucide-react";

interface Props {
  countTimer: number;
}

const CardTimer: React.FC<Props> = ({ countTimer }) => {
  const intervalCountdownRef = useRef(0);
  const countTotalRef = useRef(countTimer);

  const [countdownSecond, setCountdownSecond] = useState(0);
  const [countdownMinute, setCountdownMinute] = useState(0);
  const [countdownHour, setCountdownHour] = useState(0);

  const formatTime = () => {
    setCountdownHour(Math.floor(countTotalRef.current / 3600));
    setCountdownMinute(Math.floor(countTotalRef.current / 60));
    setCountdownSecond(countTotalRef.current % 60);
  };

  const startCountdown = () => {
    // input the countdown time

    formatTime();

    console.log("Countdown started");

    intervalCountdownRef.current = setInterval(() => {
      countTotalRef.current -= 1;
      console.log(countTotalRef.current);

      formatTime();

      if (countTotalRef.current === 0) {
        stopCountdown();
      }
    }, 1000);
  };

  const stopCountdown = () => {
    console.log("Countdown stopped");
    clearInterval(intervalCountdownRef.current);
  };

  return (
    <Card className="transition hover:-translate-y-1 hover:shadow-lg z-[10]">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <p>Timer (1)</p>
          <Button variant={"outline"}>
            {/* Dialog */}
            <Dialog>
              <DialogTrigger>
                <Fullscreen />
              </DialogTrigger>
              <DialogContent className="min-h-screen w-full max-w-[100vw]">
                <DialogHeader>
                  <DialogTitle>Timer (1)</DialogTitle>
                  <div className="h-full flex-col flex justify-center items-center">
                    <TimerContent
                      fontSize={"20vw"}
                      hours={countdownHour}
                      minutes={countdownMinute}
                      seconds={countdownSecond}
                      progress={(countTotalRef.current / countTimer) * 100}
                      funcStart={startCountdown}
                      funcPause={stopCountdown}
                    />
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Timer Display */}
        <TimerContent
          fontSize={"30px"}
          hours={countdownHour}
          minutes={countdownMinute}
          seconds={countdownSecond}
          progress={(countTotalRef.current / countTimer) * 100}
          funcStart={startCountdown}
          funcPause={stopCountdown}
        />
      </CardContent>
    </Card>
  );
};

export default CardTimer;
