import React from "react";
import { View, StyleSheet, TextInput, Button } from "react-native";

import { connect } from "react-redux";

import PropTypes from "prop-types";

import {
  PaymentPending,
  PaymentSuccess
} from "../redux/actions/actionCreators";

import {
  getUser,
  getOwnUser,
  seekUserMail,
  createPayment
} from "../api/firebaseDatabase";

import AppText from "../components/AppText";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "rgba(0, 191, 255, 0.5)"
  },
  inputContainer: {
    marginTop: 15,
    marginLeft: 25,
    marginRight: 25,
    height: 50
  },
  emailField: {
    flex: 1,
    fontSize: 20,
    fontFamily: "openSansSemiBold",
    borderBottomWidth: 2,
    borderBottomColor: "#000"
  },
  errorMessage: {
    textAlign: "center",
    fontSize: 20,
    color: "red"
  }
});

class Transfer extends React.Component {
  static navigationOptions = {
    title: "Send money to contact",
    headerTitleStyle: {
      flex: 1,
      paddingRight: 25,
      textAlign: "center"
      // backgroundColor: "#0f0"
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      emailInput: null,
      emailErrorMessage: null,
      contactUID: null,
      moneyAmount: 0,
      amountErrorMessage: null
    };
  }

  retrieveUidFromMail = () => {
    const { emailInput } = this.state;

    if (emailInput === null) {
      this.setState({ emailErrorMessage: "Please enter the contact mail." });
      return;
    }
    if (emailInput === getOwnUser().email) {
      this.setState({
        emailErrorMessage: "Please specify another user than you."
      });
      return;
    }

    seekUserMail(emailInput).then(result => {
      this.setState({ contactUID: result.uid });
      const { contactUID } = this.state;

      if (contactUID === null) {
        this.setState({
          emailErrorMessage: "User not found! Please try again."
        });
        return;
      }
      this.setState({ emailErrorMessage: null });
    });
  };

  transferMoney = () => {
    const {
      paymentPendingAction,
      paymentSuccessAction,
      isPaymentPending
    } = this.props;
    const { moneyAmount, contactUID } = this.state;

    if (!isPaymentPending) {
      paymentPendingAction(true);

      if (Number.isNaN(moneyAmount)) {
        this.setState({
          amountErrorMessage: "Please enter only positive digits."
        });
        paymentPendingAction(false);
        return;
      }
      if (moneyAmount === 0 || moneyAmount < 0) {
        this.setState({
          amountErrorMessage: "Please enter a positive amount."
        });
        paymentPendingAction(false);
        return;
      }

      getUser(contactUID).then(receiverSnapshot => {
        getUser(getOwnUser().uid).then(payerSnap => {
          if (payerSnap.val().walletAmount - moneyAmount > 0.0) {
            this.setState({
              amountErrorMessage: null
            });
            createPayment(moneyAmount, receiverSnapshot, contactUID);
            paymentPendingAction(false);
            paymentSuccessAction(true);
          } else {
            this.setState({
              amountErrorMessage: "Your balance is insufficient."
            });
            paymentPendingAction(false);
          }
          paymentPendingAction(false);
        });
      });
    }
  };

  render() {
    const { emailErrorMessage, contactUID, amountErrorMessage } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            textAlign="center"
            style={styles.emailField}
            placeholder="Contact Email"
            placeholderTextColor="#888"
            onChangeText={emailInput => this.setState({ emailInput })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Button
            style={styles.emailField}
            onPress={this.retrieveUidFromMail}
            title="Find user"
            color="#00dc5d"
          />
        </View>
        {emailErrorMessage && (
          <View>
            <AppText style={styles.errorMessage}>{emailErrorMessage}</AppText>
          </View>
        )}
        {contactUID && (
          <View>
            <AppText style={{ fontSize: 20 }}>
              Set the amount of money you want to transfer:
            </AppText>
            <View style={styles.inputContainer}>
              <TextInput
                textAlign="center"
                keyboardType="numeric"
                style={styles.emailField}
                onChangeText={moneyAmount =>
                  this.setState({ moneyAmount: Number(moneyAmount) })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Button
                style={styles.emailField}
                onPress={this.transferMoney}
                title="Transfer"
                color="#00dc5d"
              />
              {amountErrorMessage && (
                <View>
                  <AppText style={styles.errorMessage}>
                    {amountErrorMessage}
                  </AppText>
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    );
  }
}

Transfer.propTypes = {
  isPaymentPending: PropTypes.bool.isRequired,
  paymentPendingAction: PropTypes.func.isRequired,
  paymentSuccessAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isPaymentPending: state.paymentReducer.isPaymentPending
});

const mapDispatchToProps = dispatch => ({
  paymentPendingAction: isPaymentPending =>
    dispatch(PaymentPending(isPaymentPending)),
  paymentSuccessAction: isPaymentSuccessful =>
    dispatch(PaymentSuccess(isPaymentSuccessful))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transfer);
