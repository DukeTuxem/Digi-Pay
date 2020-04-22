import React from "react";
import { StyleSheet, View, Platform, ViewPropTypes, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import AppText from "./AppText";

class HistEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      cardStyle,
      logoStyle,
      amountStyle,
      targetStyle,
      textStyle,
      target,
      type,
      date,
      amount
    } = this.props;

    return (
      <View style={cardStyle}>
        <View style={logoStyle}>
          <Ionicons
            name={Platform.OS === "ios" ? "ios-card" : "md-card"}
            size={55}
          />
        </View>

        <View style={targetStyle}>
          <AppText style={textStyle}>{target}</AppText>
          <AppText style={textStyle}>{date}</AppText>
        </View>

        <View style={amountStyle}>
          {type === "debit" && (
            <AppText style={textStyle}>
              -€
              {amount}
            </AppText>
          )}
          {type === "credit" && (
            <AppText style={textStyle}>
              +€
              {amount}
            </AppText>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: 100,
    // borderWidth: 0.5,
    flexDirection: "row"
  },
  logo: {
    flex: 0.165,
    flexDirection: "column",
    justifyContent: "center"
  },
  target: {
    flex: 0.75,
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 15
  },
  amount: {
    flex: 0.33,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  text: {
    fontSize: 18
  }
});

HistEntry.propTypes = {
  target: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  cardStyle: ViewPropTypes.style,
  logoStyle: ViewPropTypes.style,
  targetStyle: ViewPropTypes.style,
  amountStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style
};

HistEntry.defaultProps = {
  cardStyle: styles.card,
  logoStyle: styles.logo,
  targetStyle: styles.target,
  amountStyle: styles.amount,
  textStyle: styles.text
};
export default HistEntry;
