import { useEffect, useRef, useState } from "react";
import { Text } from "react-native";

interface CounterDisplayProps {
  countDownMinutes: number;
  isRunning: boolean;
  onTimerEnd: () => void;
}

export default function CounterDisplay(props: CounterDisplayProps) {
  const [minutes, setMinutes] = useState(Math.floor(props.countDownMinutes));
  const [seconds, setSeconds] = useState(props.countDownMinutes * 60 % 60);

  const timeInterval = useRef<NodeJS.Timeout | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    startCountDown();
  }, [props.isRunning]);

  useEffect(() => {
    if (seconds >= 0) return;

    if (minutes > 0) {
      setMinutes(prev => prev - 1);
      setSeconds(59);
      return;
    }

    clearInterval(timeInterval.current!);
    timeInterval.current = null;
    props.onTimerEnd();
  }, [seconds]);

  const startCountDown = () => {
    if (timeInterval.current) {
      window.alert('The timer was already started');
      return;
    }

    timeInterval.current = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);
  }

  return (
    <Text>{minutes}:{seconds.toString().padStart(2, '0')}</Text>
  );
}