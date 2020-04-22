import { NavigationActions, StackActions } from "react-navigation";

import AppNavigator from "../../navigation/routes";
import * as screenNames from "../../navigation/screenNames";
import {
  LOGOUT,
  GO_TO_REGISTER,
  LOGIN_SUCCESS,
  NAVIGATE_BACK,
  GO_TO_PAY,
  GO_TO_COLLECT,
  PAYMENT_SUCCESS,
  GO_TO_HISTORY,
  GO_TO_PROFILE,
  GO_TO_HOME,
  GO_TO_TRANSFER
} from "../actions/actionTypes";

const initialNavState = AppNavigator.router.getStateForAction(
  NavigationActions.navigate({
    routeName: screenNames.LOGIN
  })
);

const ActionForLoggedIn = AppNavigator.router.getActionForPathAndParams(
  `${screenNames.MAINSTACK}/${screenNames.WALLETSTACK}`
);

const ActionForRegisterScreen = AppNavigator.router.getActionForPathAndParams(
  `${screenNames.AUTHSTACK}/${screenNames.REGISTER}`
);

const ActionForPayScreen = AppNavigator.router.getActionForPathAndParams(
  `${screenNames.MAINSTACK}/${screenNames.WALLETSTACK}/${screenNames.PAY}`
);

const ActionForCollectScreen = AppNavigator.router.getActionForPathAndParams(
  `${screenNames.MAINSTACK}/${screenNames.WALLETSTACK}/${screenNames.COLLECT}`
);

const ActionForTransferScreen = AppNavigator.router.getActionForPathAndParams(
  `${screenNames.MAINSTACK}/${screenNames.WALLETSTACK}/${screenNames.TRANSFER}`
);

const ActionForHistoryScreen = AppNavigator.router.getActionForPathAndParams(
  `${screenNames.MAINSTACK}/${screenNames.HISTORY}`
);

const ActionForProfileScreen = AppNavigator.router.getActionForPathAndParams(
  `${screenNames.MAINSTACK}/${screenNames.PROFILE}`
);

const ResetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({
      routeName: `${screenNames.AUTHSTACK}/${screenNames.LOGIN}`
    })
  ]
});

const navigationReducer = (state = initialNavState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return AppNavigator.router.getStateForAction(ActionForLoggedIn);
    case GO_TO_REGISTER:
      return AppNavigator.router.getStateForAction(ActionForRegisterScreen);
    case NAVIGATE_BACK:
      return AppNavigator.router.getStateForAction(NavigationActions.back());
    case GO_TO_PAY:
      return AppNavigator.router.getStateForAction(ActionForPayScreen);
    case GO_TO_COLLECT:
      return AppNavigator.router.getStateForAction(ActionForCollectScreen);
    case GO_TO_TRANSFER:
      return AppNavigator.router.getStateForAction(ActionForTransferScreen);
    case GO_TO_HISTORY:
      return AppNavigator.router.getStateForAction(ActionForHistoryScreen);
    case GO_TO_PROFILE:
      return AppNavigator.router.getStateForAction(ActionForProfileScreen);
    case GO_TO_HOME:
      return AppNavigator.router.getStateForAction(ActionForLoggedIn);
    case LOGOUT:
      return AppNavigator.router.getStateForAction(ResetAction);
    case PAYMENT_SUCCESS:
      return AppNavigator.router.getStateForAction(ActionForLoggedIn);
    default:
      return AppNavigator.router.getStateForAction(action, state) || state;
  }
};

export default navigationReducer;
