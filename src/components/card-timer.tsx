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
import { useRef, useState } from "react";
import { Fullscreen, NotebookPen, PencilLine, Plus, Trash } from "lucide-react";
import { Input } from "./ui/input";

interface Props {
  countTimer: number;
}

const CardTimer: React.FC<Props> = ({ countTimer }) => {
  const intervalCountdownRef = useRef(0);
  const countTotalRef = useRef(countTimer);

  const [countdownSecond, setCountdownSecond] = useState("00");
  const [countdownMinute, setCountdownMinute] = useState("00");
  const [countdownHour, setCountdownHour] = useState("00");

  const formatTime = () => {
    setCountdownHour(
      String(Math.floor(countTotalRef.current / 3600)).padStart(2, "0")
    );
    setCountdownMinute(
      String(Math.floor((countTotalRef.current % 3600) / 60)).padStart(2, "0")
    );
    setCountdownSecond(String(countTotalRef.current % 60).padStart(2, "0"));
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
    <>
      <Card className="transition hover:-translate-y-1 shadow-sm hover:shadow-lg z-[10]">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <p>Timer (1)</p>
            <div>
              {/* zoom */}
              <Button className="border-0 shadow-none" variant={"outline"}>
                {/* Dialog */}
                <Dialog>
                  <DialogTrigger>
                    <Fullscreen />
                  </DialogTrigger>
                  <DialogContent className="min-h-screen w-full max-w-[100vw]">
                    <DialogHeader>
                      <DialogTitle>Timer (1)</DialogTitle>
                      <div className="h-full flex-col flex justify-center items-center">
                        {/* form */}
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
              {/* edit */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-none">
                    <PencilLine />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Timer</DialogTitle>
                  </DialogHeader>
                  <div className="flex text-2xl gap-2 justify-center items-center">
                    <Input id="name" type="number" placeholder="00" />
                    <span>:</span>
                    <Input id="name" type="number" placeholder="00" />
                    <span>:</span>
                    <Input id="name" type="number" placeholder="00" />
                  </div>
                  <div className="flex gap-4 py-2 justify-center items-center">
                    <NotebookPen />
                    <Input id="name" placeholder="Add Timer Name.." />
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      variant={"outline"}
                      className="bg-red-500 text-white dark:text-black"
                    >
                      <Trash />
                    </Button>
                    <Button type="submit">Save changes</Button>
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
            hours={countdownHour}
            minutes={countdownMinute}
            seconds={countdownSecond}
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
