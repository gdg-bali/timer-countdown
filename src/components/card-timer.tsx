import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import TimerContent from "./timer-content";
import { useEffect, useRef, useState } from "react";
import { Fullscreen, PencilLine, Trash } from "lucide-react";
import { Input } from "./ui/input";
import { buttonVariants } from "@/components/ui/button";
import { deleteTimer, updateTimer } from "@/utils/timer-local-storage";

interface Props {
  countTimer: number;
  id: number;
}

const CardTimer: React.FC<Props> = ({ countTimer, id }) => {
  const intervalCountdownRef = useRef<NodeJS.Timeout>(undefined);
  const countTotalRef = useRef(countTimer);

  const [countdownSecond, setCountdownSecond] = useState<number>(0);
  const [countdownMinute, setCountdownMinute] = useState<number>(0);
  const [countdownHour, setCountdownHour] = useState<number>(0);

  useEffect(() => {
    formatTime();
  }, []);

  const formatTime = () => {
    setCountdownHour(Math.floor(countTotalRef.current / 3600));
    setCountdownMinute(Math.floor((countTotalRef.current % 3600) / 60));
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

  // Edit Timer
  const handleUpdateTimer = () => {
    const newTimer =
      countdownSecond +
      Number(countdownMinute) * 60 +
      Number(countdownHour) * 60 * 60;
    console.log(newTimer);
    updateTimer(id, Number(newTimer));
  };

  // Delete Timer
  const handleDeleteTimer = (index: number) => {
    deleteTimer(index);
  };

  return (
    <>
      <Card className="transition hover:-translate-y-1 border-0 shadow-md hover:shadow-lg z-10">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <p>Timer (1)</p>
            <div>
              {/* Dialog Full Screen */}
              <Dialog>
                <DialogTrigger>
                  <div
                    className={
                      buttonVariants({ variant: "outline" }) +
                      " border-0 shadow-none mx-2"
                    }
                  >
                    <Fullscreen />
                  </div>
                </DialogTrigger>
                <DialogContent className="min-h-screen min-w-screen w-full max-w-[100vw] z-50">
                  <DialogHeader>
                    <DialogTitle>Timer (1)</DialogTitle>
                    <div className="h-full flex-col flex justify-center items-center">
                      {/* form */}
                      <TimerContent
                        fontSize={"20vw"}
                        hours={String(countdownHour).padStart(2, "0")}
                        minutes={String(countdownMinute).padStart(2, "0")}
                        seconds={String(countdownSecond).padStart(2, "0")}
                        progress={(countTotalRef.current / countTimer) * 100}
                        funcStart={startCountdown}
                        funcPause={stopCountdown}
                      />
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              {/* Dialog Edit */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-none">
                    <PencilLine />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Update Timer</DialogTitle>
                  </DialogHeader>
                  <div className="flex text-2xl gap-2 justify-center items-center">
                    <Input
                      onChange={(e) => setCountdownHour(Number(e.target.value))}
                      value={countdownHour}
                      id="name"
                      type="number"
                      placeholder="00"
                    />
                    <span>:</span>
                    <Input
                      onChange={(e) =>
                        setCountdownMinute(Number(e.target.value))
                      }
                      value={countdownMinute}
                      id="name"
                      type="number"
                      placeholder="00"
                    />
                    <span>:</span>
                    <Input
                      onChange={(e) =>
                        setCountdownSecond(Number(e.target.value))
                      }
                      value={countdownSecond}
                      id="name"
                      type="number"
                      placeholder="00"
                    />
                  </div>
                  {/* <div className="flex gap-4 py-2 justify-center items-center">
                    <NotebookPen />
                    <Input id="name" placeholder="Add Timer Name.." />
                  </div> */}
                  <DialogFooter>
                    <Button
                      type="submit"
                      variant={"outline"}
                      className="bg-red-500 text-white dark:text-black"
                      onClick={() => handleDeleteTimer(id)}
                    >
                      <Trash />
                    </Button>
                    <Button type="submit" onClick={handleUpdateTimer}>
                      Save changes
                    </Button>
                    <Button type="submit" variant={"outline"}>
                      Cancel
                    </Button>{" "}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Timer Display */}
          <TimerContent
            fontSize={"30px"}
            hours={String(countdownHour).padStart(2, "0")}
            minutes={String(countdownMinute).padStart(2, "0")}
            seconds={String(countdownSecond).padStart(2, "0")}
            progress={(countTotalRef.current / countTimer) * 100}
            funcStart={startCountdown}
            funcPause={stopCountdown}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default CardTimer;
