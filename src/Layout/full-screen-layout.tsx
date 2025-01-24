/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from "react";
import FullScreenToggleButton from "@/components/full-screen-toggle-button";
import { ModeToggle } from "@/components/mode-toggle";

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

  return (
    <div
      ref={fullScreenRef}
      className={`w-full h-screen flex flex-col transition-colors duration-300 ${
        isFullScreen ? "" : ""
      }`}
    >
      <div className="mb-4">{children}</div>

      <div className="fixed bottom-2 left-2 flex gap-2">
        <ModeToggle />
        <FullScreenToggleButton
          isFullScreen={isFullScreen}
          onToggle={toggleFullScreen}
        />
      </div>
    </div>
  );
};

export default FullScreenLayout;
