import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./Physics";
import React, { useEffect, useState } from "react";

export default function App() {
  const [running, setRunning] = useState(false);
  useEffect(() => {
    setRunning(true);
  }, []);
  return (
    <View style={styles.container}>
      <GameEngine
        systems={[Physics]}
        entities={entities()}
        running={running}
        style={styles.gameContainer}
      >
        {<StatusBar style="auto" hidden={true} />}
      </GameEngine>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6a994e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
