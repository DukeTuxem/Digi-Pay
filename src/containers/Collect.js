import React from "react";
import { View, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode";
import * as firebase from "firebase";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 191, 255, 0.5)"
  }
});

class Collect extends React.Component {
  static navigationOptions = {
    title: "Get scanned to receive money",
    headerTitleStyle: {
      flex: 1,
      paddingRight: 25,
      textAlign: "center"
      // backgroundColor: "#0f0"
    }
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <QRCode
          value={firebase.auth().currentUser.uid}
          size={350}
          bgColor="purple"
          fgColor="white"
        />
      </View>
    );
  }
}

export default Collect;
