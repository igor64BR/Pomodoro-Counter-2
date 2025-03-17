import { Button, View } from "react-native";
import CounterDisplay from "@/app/components/CounterDisplay";
import { useState } from "react";

export default function Index() {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CounterDisplay
        countDownMinutes={1}
        onTimerEnd={() => {
          window.alert("Timer ended");
        }}
        isRunning={isRunning}
      />
      <Button title={'Toggle Run'} onPress={() => setIsRunning(!isRunning)}/>
    </View>
  );
}
