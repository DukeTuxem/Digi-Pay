import { connect } from "react-redux";
import {
  createReactNavigationReduxMiddleware,
  reduxifyNavigator
} from "react-navigation-redux-helpers";

import { YellowBox } from "react-native";

import AppNavigator from "./routes";

YellowBox.ignoreWarnings(["Setting a timer"]);

const navMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
);

const AppNavigation = reduxifyNavigator(AppNavigator, "root");

const mapStateToProps = state => ({
  state: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(AppNavigation);

export { AppWithNavigationState, navMiddleware };
