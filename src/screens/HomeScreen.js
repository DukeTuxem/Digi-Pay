import React from "react";
import PropTypes from "prop-types";
import { Animated, PanResponder, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import * as firebase from "firebase";

import AppText from "../components/AppText";
import MoneyButton from "../components/MoneyButton";
import {
  GoToCollect,
  GoToHistory,
  GoToTransfer,
  GoToPay,
  GoToProfile,
  SetWalletAmount
} from "../redux/actions/actionCreators";

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "rgba(0, 191, 255, 0.5)"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 25,
    marginRight: 25,
    marginTop: 25,
    marginBottom: 25,
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  balance: {
    flex: 0.33,
    alignItems: "center",
    justifyContent: "space-around"
    // backgroundColor: "#fff"
  },
  legendText: {
    flexDirection: "row",
    marginRight: 25,
    marginLeft: 25,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  rowLayout: {
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 0.7,
    justifyContent: "space-between",
    backgroundColor: "#00dc5d"
    // backgroundColor: "rgba(0, 191, 255, 0.8)"
  }
});

class HomeScreen extends React.Component {
  // Screen Header
  static navigationOptions = {
    title: "DigiPay",
    headerTitleStyle: {
      flex: 1,
      textAlign: "center"
    }
  };

  constructor(props) {
    super(props);
    const {
      goToProfileAction,
      goToHistoryAction,
      setWalletAmountAction
    } = this.props;

    this.gestureDelay = -35;
    const position = new Animated.ValueXY();
    this.state = { position };

    const userUid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`/users/${userUid}`)
      .on("child_changed", childrenSnapshot => {
        if (childrenSnapshot.val()) {
          setWalletAmountAction(childrenSnapshot.val());
        }
      });

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx < -35) {
          const newX = gestureState.dx - this.gestureDelay;
          position.setValue({ x: newX, y: 0 });
        } else if (gestureState.dx > 35) {
          const newX = gestureState.dx + this.gestureDelay;
          position.setValue({ x: newX, y: 0 });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -175) {
          Animated.timing(position, {
            toValue: { x: -300, y: 0 },
            duration: 150
          }).start(() => {
            goToHistoryAction();
          });
        } else if (gestureState.dx > 175) {
          Animated.timing(position, {
            toValue: { x: 300, y: 0 },
            duration: 300
          }).start(() => {
            goToProfileAction();
          });
        } else {
          Animated.timing(position, {
            toValue: { x: 0, y: 0 },
            duration: 300
          }).start();
        }
      }
    });
  }

  render() {
    const { position } = this.state;
    const {
      goToPayAction,
      goToCollectAction,
      goToTransferAction,
      walletAmount
    } = this.props;
    return (
      <Animated.View
        style={[position.getLayout(), styles.page]}
        {...this.panResponder.panHandlers}
      >
        <Animated.ScrollView
          style={[position.getLayout(), styles.container]}
          {...this.panResponder.panHandlers}
        >
          <View style={styles.balance}>
            <AppText>Current Balance:</AppText>
            <AppText>
              {"€ "}
              {walletAmount}
            </AppText>
          </View>

          <View style={{ alignItems: "center" }}>
            <AppText style={{ fontSize: 20 }}>
              Send money to another user:
            </AppText>
            <View style={styles.legendText}>
              <MoneyButton
                type="transfer"
                actionToTrigger={() => goToTransferAction()}
              />
            </View>
          </View>

          <View>
            <AppText style={{ fontSize: 20, marginLeft: 25 }}>
              Transaction with a nearby person:
            </AppText>
            <View style={styles.rowLayout}>
              <MoneyButton type="pay" actionToTrigger={() => goToPayAction()} />
              <MoneyButton
                type="collect"
                actionToTrigger={() => goToCollectAction()}
              />
            </View>
          </View>
        </Animated.ScrollView>
      </Animated.View>
    );
  }
}

HomeScreen.propTypes = {
  walletAmount: PropTypes.number.isRequired,
  goToHistoryAction: PropTypes.func.isRequired,
  goToProfileAction: PropTypes.func.isRequired,
  goToTransferAction: PropTypes.func.isRequired,
  goToPayAction: PropTypes.func.isRequired,
  goToCollectAction: PropTypes.func.isRequired,
  setWalletAmountAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  walletAmount: state.paymentReducer.walletAmount
});

const mapDispatchToProps = dispatch => ({
  goToHistoryAction: () => dispatch(GoToHistory()),
  goToProfileAction: () => dispatch(GoToProfile()),
  goToTransferAction: () => dispatch(GoToTransfer()),
  goToPayAction: () => dispatch(GoToPay()),
  goToCollectAction: () => dispatch(GoToCollect()),
  setWalletAmountAction: walletAmount => dispatch(SetWalletAmount(walletAmount))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
