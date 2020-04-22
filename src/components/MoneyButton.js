import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import AppText from "./AppText";

const send = require("../../assets/images/sendMoney.png");
const recv = require("../../assets/images/receiveMoney.png");

const styles = StyleSheet.create({
  buttons: {
    width: 133,
    height: 133,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#00dc5d"
  },
  money: {
    width: 75,
    height: 75
  },
  text: {
    fontSize: 30
  }
});

class MoneyButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { type, actionToTrigger } = this.props;

    if (type === "transfer") {
      return (
        <TouchableOpacity
          style={[styles.buttons, { borderRadius: 10, borderWidth: 0.7 }]}
          onPress={() => actionToTrigger()}
        >
          <Image style={styles.money} source={send} />
          <AppText style={styles.text}> Transfer </AppText>
        </TouchableOpacity>
      );
    }
    if (type === "pay") {
      return (
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => actionToTrigger()}
        >
          <Image style={styles.money} source={send} />
          <AppText style={styles.text}> Pay </AppText>
        </TouchableOpacity>
      );
    }
    if (type === "collect") {
      return (
        <View>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => actionToTrigger()}
          >
            <Image style={styles.money} source={recv} />
            <AppText style={styles.text}> Collect </AppText>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View>
        <AppText>Wrong prop type</AppText>
      </View>
    );
  }
}

MoneyButton.propTypes = {
  type: PropTypes.string.isRequired,
  actionToTrigger: PropTypes.func.isRequired
};

export default MoneyButton;
