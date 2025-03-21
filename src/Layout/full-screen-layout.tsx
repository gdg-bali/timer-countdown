import React, { useState, useRef } from "react";
// import { NotebookPen } from "lucide-react";
import { Plus } from "lucide-react";
//
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
import { addTimer } from "@/utils/timer-local-storage";
import FullScreenToggleButton from "@/components/full-screen-toggle-button";
import { ModeToggle } from "@/components/theme-mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";

interface FullScreenLayoutProps {
  children: React.ReactNode;
}
interface FullScreenElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

const FullScreenLayout: React.FC<FullScreenLayoutProps> = ({ children }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const fullScreenRef = useRef<HTMLDivElement>(null);

  const enterFullScreen = () => {
    if (fullScreenRef.current) {
      const element: FullScreenElement = fullScreenRef.current;

      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(); // Safari
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen(); // IE11
      }
      setIsFullScreen(true);
    }
  };

  const exitFullScreen = () => {
    if (document.fullscreenElement) {
      const doc = document as Document & {
        webkitExitFullscreen?: () => void;
        msExitFullscreen?: () => void;
      };

      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen(); // Safari
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen(); // IE11
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

  // #region Timer Logic

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

  // #endregion Timer Logic

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div
        ref={fullScreenRef}
        className={`w-full h-screen flex flex-col transition-colors duration-300 ${
          isFullScreen ? "" : ""
        }`}
      >
        <main>
          <div>{children}</div>
          <div className="fixed bottom-2 right-2 flex gap-2 z-49">
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
        </main>
      </div>
    </ThemeProvider>
  );
};

export default FullScreenLayout;
