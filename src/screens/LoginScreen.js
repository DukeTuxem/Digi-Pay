import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { login } from "../api/firebaseAuthentication";
import { goToRegister } from "../redux/actions/actionCreators";

import AppText from "../components/AppText";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingRight: 50,
    paddingLeft: 50,
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  notRegisterStyle: {
    backgroundColor: "#db0867",
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19
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
  loginButton: {
    backgroundColor: "#00ec56",
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    elevation: 19
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

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "admin@example.com",
      password: "password"
    };
  }

  render() {
    const { email, password } = this.state;
    const { loginErrorMessage, loginAction, goToRegisterAction } = this.props;

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
        {loginErrorMessage !== null && (
          <AppText style={styles.errorText}>{loginErrorMessage}</AppText>
        )}
        <View style={[styles.background]}>
          <View style={styles.inputContainer}>
            <TextInput
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              style={styles.text}
              value={email}
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
          <TouchableOpacity
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => loginAction(email, password)}
          >
            <AppText style={styles.text}>Login</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            // style={[styles.buttonContainer, styles.notRegisterStyle]}
            style={[styles.buttonContainer, styles.text]}
            onPress={() => goToRegisterAction()}
          >
            <AppText style={{ fontSize: 18, textDecorationLine: "underline" }}>
              Not registered yet ?
            </AppText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

LoginScreen.propTypes = {
  loginErrorMessage: PropTypes.string,
  loginAction: PropTypes.func.isRequired,
  goToRegisterAction: PropTypes.func.isRequired
};

LoginScreen.defaultProps = {
  loginErrorMessage: null
};

const mapStateToProps = state => ({
  isLoginPending: state.authReducer.isLoginPending,
  isLoginSuccessful: state.authReducer.isLoginSuccessful,
  loginErrorMessage: state.authReducer.loginErrorMessage
});

const mapDispatchToProps = dispatch => ({
  loginAction: (email, password) => dispatch(login(email, password)),
  goToRegisterAction: () => dispatch(goToRegister())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
