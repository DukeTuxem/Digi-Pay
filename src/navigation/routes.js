import React from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";

import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import * as screenNames from "./screenNames";

import Pay from "../containers/Pay";
import Collect from "../containers/Collect";
import Transfer from "../containers/Transfer";

import Register from "../screens/RegisterScreen";
import Home from "../screens/HomeScreen";
import History from "../screens/HistoryScreen";
import Profile from "../screens/ProfileScreen";
import Login from "../screens/LoginScreen";

import TabBarIcon from "../components/TabBarIcon";

const TabBarIconCallback = ({ focused, iosIcon, androidIcon }) => (
  <TabBarIcon
    focused={focused}
    name={Platform.OS === "ios" ? iosIcon : androidIcon}
  />
);

TabBarIconCallback.propTypes = {
  focused: PropTypes.bool.isRequired,
  iosIcon: PropTypes.string.isRequired,
  androidIcon: PropTypes.string.isRequired
};

const HistoryStack = createStackNavigator({
  [screenNames.HISTORY]: History
});

HistoryStack.navigationOptions = {
  tabBarLabel: "History",
  tabBarIcon: ({ focused }) =>
    TabBarIconCallback({
      focused,
      iosIcon: "ios-paper",
      androidIcon: "md-paper"
    })
};

const ProfileStack = createStackNavigator({
  [screenNames.PROFILE]: Profile
});

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) =>
    TabBarIconCallback({
      focused,
      iosIcon: "ios-person",
      androidIcon: "md-person"
    })
};

const WalletStack = {
  screen: createStackNavigator({
    [screenNames.HOME]: { screen: Home },
    [screenNames.PAY]: { screen: Pay },
    [screenNames.COLLECT]: { screen: Collect },
    [screenNames.TRANSFER]: { screen: Transfer }
  })
};

WalletStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) =>
    TabBarIconCallback({
      focused,
      iosIcon: "ios-home",
      androidIcon: "md-home"
    })
};

const AppNavigator = createStackNavigator(
  {
    [screenNames.AUTHSTACK]: {
      screen: createStackNavigator(
        {
          [screenNames.LOGIN]: { screen: Login },
          [screenNames.REGISTER]: { screen: Register }
        },
        {
          navigationOptions: { header: null }
        }
      )
    },
    [screenNames.MAINSTACK]: {
      screen: createBottomTabNavigator(
        {
          [screenNames.HISTORY]: HistoryStack,
          [screenNames.PROFILE]: ProfileStack,
          [screenNames.WALLETSTACK]: WalletStack
        },
        {
          order: [
            screenNames.WALLETSTACK,
            screenNames.HISTORY,
            screenNames.PROFILE
          ]
        }
      )
    }
  },
  { navigationOptions: { header: null } }
);

export default AppNavigator;
