import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";
import { Audio } from "expo-av";
const audioStart = require("./assets/start.mp3");
const audioStop = require("./assets/stop.mp3");

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [color, setColor] = useState(colors[0]);
  const [modeTime, setModeTime] = useState(0); //"Pomodoro"|"ShortBreak"|"LongBreak"

  useEffect(() => {
    let interval = null;
    if (isWorking) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 10);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setIsWorking(false);
      playSound(audioStop);
      setTime(modeTime === 0 ? 25 * 60 : modeTime === 1 ? 5 * 60 : 15 * 60);
    }
    return () => clearInterval(interval);
  }, [isWorking, time]);

  console.log(modeTime);

  const handleStartStop = () => {
    if (!isWorking) {
      playSound(audioStart);
    } else {
      playSound(audioStop);
    }
    setIsWorking(!isWorking);
  };

  async function playSound(audio) {
    const { sound } = await Audio.Sound.createAsync(audio);
    await sound.setVolumeAsync(0.2);
    await sound.playAsync();
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[modeTime] }]}
    >
      <View style={{ flex: 1, paddingTop: Platform.OS === "android" && 30 }}>
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          modeTime={modeTime}
          setModeTime={setModeTime}
          setTime={setTime}
        />
        <Timer time={time} />
        <TouchableOpacity style={styles.botonInicio} onPress={handleStartStop}>
          <Text style={styles.botonInicioText}>
            {isWorking ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  text: {
    fontSize: 32,
    textAlign: "center",
    color: "#000000",
    fontWeight: "bold",
    paddingBottom: 20,
  },
  botonInicio: {
    width: "100%",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 10,
  },
  botonInicioText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});
