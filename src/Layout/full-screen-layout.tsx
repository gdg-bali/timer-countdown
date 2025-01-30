/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from "react";
import FullScreenToggleButton from "@/components/full-screen-toggle-button";
import { ModeToggle } from "@/components/mode-toggle";
// import { NotebookPen } from "lucide-react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addTimer } from "@/utils/timertemp";

interface FullScreenLayoutProps {
  children: React.ReactNode;
}

const FullScreenLayout: React.FC<FullScreenLayoutProps> = ({ children }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const fullScreenRef = useRef<HTMLDivElement>(null);

  const enterFullScreen = () => {
    if (fullScreenRef.current) {
      if (fullScreenRef.current.requestFullscreen) {
        fullScreenRef.current.requestFullscreen();
      } else if ((fullScreenRef.current as any).webkitRequestFullscreen) {
        (fullScreenRef.current as any).webkitRequestFullscreen(); // Safari
      } else if ((fullScreenRef.current as any).msRequestFullscreen) {
        (fullScreenRef.current as any).msRequestFullscreen(); // IE11
      }
      setIsFullScreen(true);
    }
  };

  const exitFullScreen = () => {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen(); // Safari
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen(); // IE11
      }
      setIsFullScreen(false);
    }
  };

  const toggleFullScreen = () => {
    if (isFullScreen) {
      exitFullScreen();
    } else {
      enterFullScreen();
    }
  };

  // ----------------------- Logic Timer ---------------------------------

  const [newSeconds, setNewSeconds] = useState<number>(0);
  const [newMinutes, setNewMinutes] = useState<number>(0);
  const [newHours, setNewHours] = useState<number>(0);

  // Add Timer
  const handleAddTimer = () => {
    const newTimer = newSeconds + newMinutes * 60 + newHours * 60 * 60;
    addTimer(newTimer);
    // reset
    setNewSeconds(0);
    setNewMinutes(0);
    setNewHours(0);
  };

  return (
    <div
      ref={fullScreenRef}
      className={`w-full h-screen flex flex-col transition-colors duration-300 ${
        isFullScreen ? "" : ""
      }`}
    >
      <div className="mb-4">{children}</div>

      <div className="fixed bottom-2 right-2 flex gap-2 z-[99]">
        <ModeToggle />

        <FullScreenToggleButton
          isFullScreen={isFullScreen}
          onToggle={toggleFullScreen}
        />
        {/* Button Add Form */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Timer</DialogTitle>
            </DialogHeader>
            <div className="flex text-2xl gap-2 justify-center items-center">
              <Input
                onChange={(e) => setNewHours(Number(e.target.value))}
                value={newHours}
                id="name"
                type="number"
                placeholder="00"
              />
              <span>:</span>
              <Input
                onChange={(e) => setNewMinutes(Number(e.target.value))}
                value={newMinutes}
                id="name"
                type="number"
                placeholder="00"
              />
              <span>:</span>
              <Input
                onChange={(e) => setNewSeconds(Number(e.target.value))}
                value={newSeconds}
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
              <Button onClick={handleAddTimer} type="submit">
                Save changes
              </Button>
              <Button type="submit" variant={"outline"}>
                Cancel
              </Button>{" "}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FullScreenLayout;
