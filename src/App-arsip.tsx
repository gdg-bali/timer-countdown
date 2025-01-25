import { useState, useRef } from "react";

function App() {
  const intervalRef = useRef(0);
  const countRef = useRef(0);

  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);

  const startTimer = () => {
    console.log("Timer started");
    intervalRef.current = setInterval(() => {
      countRef.current += 1;
      console.log(countRef.current);

      if (countRef.current === 60) {
        countRef.current = 0;
        setSecond(0);

        if (minute === 59) {
          setMinute(0);
          setHour((prev) => prev + 2);
        } else {
          setMinute((prev) => prev + 1);
        }
      }

      setSecond(countRef.current);
    }, 1000);
  };

  const stopTimer = () => {
    console.log("Timer stopped");
    clearInterval(intervalRef.current);
  };

  const intervalCountdownRef = useRef(0);
  const countTotalRef = useRef(120);

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
    <>
      <div>
        <p>
          Timer: {hour}:{minute}:{second}
        </p>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <br />
        <p>
          Countdown: {countdownHour}:{countdownMinute}:{countdownSecond}
        </p>
        <button onClick={startCountdown}>Start</button>
        <button onClick={stopCountdown}>Stop</button>
      </div>
    </>
  );
}

export default App;
