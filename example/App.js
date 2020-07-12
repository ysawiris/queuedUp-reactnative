import React, { Component } from "react";
import { Alert, Linking, Platform, StyleSheet, Text, View } from "react-native";
import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";

import InitialScreen from "./InitialScreen.js";
import PlayerScreen from "./screens/playerScreen.js";
import HomePage from "./screens/homePage";
import LoginPage from "./screens/loginPage";

const LoginNavigator = createSwitchNavigator({
  initial: { screen: LoginPage },
  player: { screen: PlayerScreen },
});

// const LoginNavigator = createSwitchNavigator({
//   initial: { screen: InitialScreen },
//   player: { screen: PlayerScreen },
// });

const App = createStackNavigator(
  {
    routeHomePage: HomePage,
    routeLoginPage: LoginNavigator,
  },
  {
    initialRouteName: "routeHomePage",
  }
);

const AppContainer = createAppContainer(App);

export default AppContainer;
