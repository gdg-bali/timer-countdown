import CardTimer from "@/components/card-timer";
import { ThemeProvider } from "@/components/theme-provider";
import FullScreenLayout from "@/Layout/full-screen-layout";

import { useState, useEffect } from "react";
import { getTimers } from "@/utils/timertemp";

const App = () => {
  // State for timers
  const [timers, setTimers] = useState<number[]>([]);

  // Load timers on mount
  useEffect(() => {
    setTimers(getTimers());
  }, []);

  // Listen for real-time updates
  useEffect(() => {
    const handleStorageUpdate = () => {
      setTimers(getTimers());
    };

    window.addEventListener("storageUpdated", handleStorageUpdate);
    return () => {
      window.removeEventListener("storageUpdated", handleStorageUpdate);
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <FullScreenLayout>
        <div className="bg-white dark:bg-black transition min-h-screen">
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 p-2">
            {timers.map((timer, index) => (
              <CardTimer countTimer={timer} key={index} id={index} />
            ))}
          </div>
        </div>
      </FullScreenLayout>
    </ThemeProvider>
  );
};

export default App;
