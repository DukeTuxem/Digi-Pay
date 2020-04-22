import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { register } from "../api/firebaseAuthentication";

import AppText from "../components/AppText";
import { NavigateBack } from "../redux/actions/actionCreators";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 50,
    paddingLeft: 50,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(0, 191, 255, 0.5)",
    justifyContent: "space-evenly"
  },
  background: {
    flex: 0.85
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white"
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: "transparent"
  },
  registerButton: {
    backgroundColor: "#00ec56",
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9
    },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10
  },
  title: {
    fontSize: 50
  },
  text: {
    fontSize: 18
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red"
  }
});

class RegisterScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "user@example.com",
      password: "password",
      confirmPassword: "password",
      firstname: "firstname",
      lastname: "lastname"
    };
  }

  render() {
    const {
      registerErrorMessage,
      registerAction,
      navigateBackAction
    } = this.props;
    const {
      email,
      password,
      confirmPassword,
      firstname,
      lastname
    } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar hidden />
        <Image
          style={styles.avatar}
          source={{
            uri:
              "https://img.freepik.com/free-vector/hand-holding-smartphone-scan-qr-code-pay_32996-137.jpg?size=338&ext=jpg"
          }}
        />
        <AppText style={{ fontSize: 50 }}>DigiPay</AppText>
        {registerErrorMessage !== null && (
          <AppText style={styles.errorText}>{registerErrorMessage}</AppText>
        )}
        <View style={styles.background}>
          <ScrollView style={{ width: "100%" }}>
            <View style={styles.inputContainer}>
              <TextInput
                keyboardType="email-address"
                underlineColorAndroid="transparent"
                value={email}
                style={styles.text}
                onChangeText={text => this.setState({ email: text })}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                value={password}
                style={styles.text}
                secureTextEntry
                onChangeText={text => this.setState({ password: text })}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                value={confirmPassword}
                style={styles.text}
                secureTextEntry
                onChangeText={text => this.setState({ confirmPassword: text })}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                value={firstname}
                style={styles.text}
                onChangeText={text => this.setState({ firstname: text })}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                value={lastname}
                style={styles.text}
                onChangeText={text => this.setState({ lastname: text })}
              />
            </View>

            <TouchableOpacity
              style={[styles.buttonContainer, styles.registerButton]}
              title="Register"
              onPress={() =>
                registerAction(
                  email,
                  password,
                  confirmPassword,
                  firstname,
                  lastname
                )
              }
            >
              <AppText style={styles.text}>Register</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonContainer, styles.registerButton]}
              title="Register"
              onPress={() => navigateBackAction()}
            >
              <AppText style={styles.text}>Back</AppText>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

RegisterScreen.propTypes = {
  registerErrorMessage: PropTypes.string,
  registerAction: PropTypes.func.isRequired,
  navigateBackAction: PropTypes.func.isRequired
};

RegisterScreen.defaultProps = {
  registerErrorMessage: null
};

const mapStateToProps = state => ({
  isRegisterPending: state.authReducer.isRegisterPending,
  isRegisterSuccessful: state.authReducer.isRegisterSuccessful,
  registerErrorMessage: state.authReducer.registerErrorMessage
});

const mapDispatchToProps = dispatch => ({
  registerAction: (email, password, confirmPassword, firstname, lastname) =>
    dispatch(register(email, password, confirmPassword, firstname, lastname)),
  navigateBackAction: () => dispatch(NavigateBack())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen);
