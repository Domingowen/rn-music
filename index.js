/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import TrackPlayer from "react-native-track-player";
import MusicServices from "src/common/musicService";
import { name as appName } from "./app.json";
// console.log(App);
AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => MusicServices);
