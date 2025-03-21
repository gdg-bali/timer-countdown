import { useState, useEffect } from "react";
//
import CardTimer from "@/components/card-timer";
import { getTimers } from "@/utils/timer-local-storage";
import FullScreenLayout from "@/Layout/full-screen-layout";

const Countdown = () => {
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
    <FullScreenLayout>
      <div className="bg-white dark:bg-black transition min-h-screen">
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 px-4 py-5">
          {timers.map((timer, index) => (
            <CardTimer countTimer={timer} key={index} id={index} />
          ))}
        </div>
      </div>
    </FullScreenLayout>
  );
};

export default Countdown;
