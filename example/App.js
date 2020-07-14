// import React, { Component } from "react";
// import { Alert, Linking, Platform, StyleSheet, Text, View } from "react-native";
// import { createSwitchNavigator, createAppContainer } from "react-navigation";

// import InitialScreen from "./InitialScreen.js";
// import PlayerScreen from "./PlayerScreen.js";

// const App = createSwitchNavigator({
//   initial: { screen: InitialScreen },
//   player: { screen: PlayerScreen },
// });

// const AppContainer = createAppContainer(App);

// export default AppContainer;

import React, { Component } from "react";
import { Alert, Linking, Platform, StyleSheet, Text, View } from "react-native";
import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";

import QueueScreen from "./screens/queueScreen";
import PlayerScreen from "./screens/playerScreen";
import HomePage from "./screens/homePage";
import LoginPage from "./screens/loginPage";

const CodeNavigaor = createSwitchNavigator({
  player: { screen: QueueScreen },
});

const LoginNavigator = createSwitchNavigator({
  initial: { screen: LoginPage },
  player: { screen: PlayerScreen },
});

const App = createStackNavigator(
  {
    routeHomePage: HomePage,
    routeLoginPage: LoginNavigator,
    routeQueuePage: CodeNavigaor,
  },
  {
    initialRouteName: "routeHomePage",
  }
);

const AppContainer = createAppContainer(App);

export default AppContainer;
