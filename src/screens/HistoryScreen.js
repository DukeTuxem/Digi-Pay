import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Animated, PanResponder, StyleSheet, View } from "react-native";

import { GoToProfile, GoToHome } from "../redux/actions/actionCreators";
import { getHistory } from "../api/firebaseDatabase";
import HistEntry from "../components/HistEntry";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#fff"
  }
});

class HistoryScreen extends React.Component {
  static navigationOptions = {
    title: "Paiment History",
    headerTitleStyle: {
      flex: 1,
      textAlign: "center"
    }
  };

  constructor(props) {
    super(props);

    this.gestureDelay = -35;
    const position = new Animated.ValueXY();
    this.state = {
      position,
      scrollEnabled: true,
      transactions: null,
      ready: false
    };

    const { goToHomeAction, goToProfileAction } = this.props;

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderMove: (evt, gestureState) => {
        const { scrollEnabled } = this.state;
        if (gestureState.dx < -35) {
          const newX = gestureState.dx - this.gestureDelay;
          if (scrollEnabled) this.setState({ scrollEnabled: false });
          position.setValue({ x: newX, y: 0 });
        } else if (gestureState.dx > 35) {
          const newX = gestureState.dx + this.gestureDelay;
          if (scrollEnabled) this.setState({ scrollEnabled: false });
          position.setValue({ x: newX, y: 0 });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -175) {
          Animated.timing(position, {
            toValue: { x: -300, y: 0 },
            duration: 150
          }).start(() => {
            goToProfileAction();
          });
        } else if (gestureState.dx > 175) {
          Animated.timing(position, {
            toValue: { x: 300, y: 0 },
            duration: 300
          }).start(() => {
            goToHomeAction();
          });
        } else {
          Animated.timing(position, {
            toValue: { x: 0, y: 0 },
            duration: 300
          }).start(this.setState({ scrollEnabled: true }));
        }
      }
    });
  }

  componentDidMount() {
    getHistory().then(userTransactions => {
      const obj = userTransactions.val();
      let reorder = null;

      if (obj !== null && Object.keys(obj).length !== 0) {
        reorder = Object.values(obj).reverse();
        reorder = Object.assign(reorder);
      }

      this.setState({
        transactions: reorder,
        ready: true
      });
    });
  }

  render() {
    const { position, scrollEnabled, transactions, ready } = this.state;

    if (!ready || transactions === undefined || transactions === null)
      return <View />;
    return (
      <Animated.ScrollView
        style={[position.getLayout(), styles.container]}
        {...this.panResponder.panHandlers}
        scrollEnabled={scrollEnabled}
      >
        {Object.values(transactions).map(value => {
          const key = Object.values(value);
          return (
            <HistEntry
              key={key}
              target={value.target}
              amount={value.amount}
              date={value.date}
              type={value.transactionType}
            />
          );
        })}
      </Animated.ScrollView>
    );
  }
}

HistoryScreen.propTypes = {
  goToHomeAction: PropTypes.func.isRequired,
  goToProfileAction: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  goToHomeAction: () => dispatch(GoToHome()),
  goToProfileAction: () => dispatch(GoToProfile())
});

export default connect(
  null,
  mapDispatchToProps
)(HistoryScreen);
