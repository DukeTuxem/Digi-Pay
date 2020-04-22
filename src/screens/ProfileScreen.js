import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Animated,
  PanResponder,
  Alert,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import { Permissions, ImagePicker } from "expo";
import * as firebase from "firebase";

import {
  GoToHistory,
  GoToHome,
  Logout,
  SetProfilePictureURI
} from "../redux/actions/actionCreators";
import AppText from "../components/AppText";
import { UploadImage, getUser } from "../api/firebaseDatabase";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  header: {
    backgroundColor: "rgba(0, 191, 255, 0.5)",
    paddingTop: 10,
    paddingBottom: 10
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 90,
    borderWidth: 4,
    borderColor: "white",
    alignSelf: "center"
  },
  bodyContent: {
    alignItems: "center",
    padding: 30
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    alignSelf: "center",
    minWidth: 250,
    borderRadius: 30,
    backgroundColor: "rgba(0, 191, 255, 0.5)"
  },
  profileFont: {
    fontSize: 20
  }
});

const onChooseImagePress = async setProfilePictureURI => {
  const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
  const cameraRollPermission = await Permissions.askAsync(
    Permissions.CAMERA_ROLL
  );

  const result = await ImagePicker.launchCameraAsync();

  if (
    cameraPermission.status === "granted" &&
    cameraRollPermission.status === "granted"
  ) {
    if (!result.cancelled) {
      UploadImage(result.uri, "profile_pic.png")
        .then(uri => {
          setProfilePictureURI(uri);
          Alert.alert(
            "Success",
            "Image uploaded !",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "OK" }
            ],
            { cancelable: false }
          );
        })
        .catch(() => {
          Alert.alert(
            "Error",
            "Image uploaded failed!",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "OK" }
            ],
            { cancelable: false }
          );
        });
    }
  }
};

class ProfileScreen extends Component {
  static navigationOptions = {
    title: "Profile",
    headerTitleStyle: {
      flex: 1,
      textAlign: "center"
    }
  };

  constructor(props) {
    super(props);

    const { goToHomeAction, goToHistoryAction } = this.props;
    const position = new Animated.ValueXY();

    this.gestureDelay = -35;
    this.state = { position };
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
            goToHomeAction();
          });
        } else if (gestureState.dx > 175) {
          Animated.timing(position, {
            toValue: { x: 300, y: 0 },
            duration: 300
          }).start(() => {
            goToHistoryAction();
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

  componentDidMount() {
    const { uid } = firebase.auth().currentUser;
    getUser(uid).then(userSnapshot => {
      this.setState({
        firstname: userSnapshot.val().firstname,
        lastname: userSnapshot.val().lastname,
        email: userSnapshot.val().email
      });
    });
  }

  render() {
    const { position, firstname, lastname, email } = this.state;
    const { uri, setProfilePictureURIAction, logoutAction } = this.props;
    const computed =
      uri || "https://bootdey.com/img/Content/avatar/avatar6.png";
    return (
      <ScrollView style={styles.container}>
        <Animated.View
          style={[position.getLayout(), styles.container]}
          {...this.panResponder.panHandlers}
        >
          <TouchableHighlight
            style={styles.header}
            onPress={() =>
              onChooseImagePress(url => setProfilePictureURIAction(url))
            }
            underlayColor="rgba(0, 191, 255, 0.5)"
          >
            <Image style={styles.avatar} source={{ uri: computed }} />
          </TouchableHighlight>

          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <TouchableOpacity style={styles.buttonContainer}>
                <AppText style={styles.profileFont}>{email}</AppText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <AppText style={styles.profileFont}>{firstname}</AppText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <AppText style={styles.profileFont}>{lastname}</AppText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => logoutAction()}
              >
                <AppText style={styles.profileFont}>Logout</AppText>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    );
  }
}

ProfileScreen.propTypes = {
  uri: PropTypes.string,
  goToHistoryAction: PropTypes.func.isRequired,
  goToHomeAction: PropTypes.func.isRequired,
  setProfilePictureURIAction: PropTypes.func.isRequired,
  logoutAction: PropTypes.func.isRequired
};

ProfileScreen.defaultProps = {
  uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
};

const mapStateToProps = state => ({
  uri: state.authReducer.uri
});

const mapDispatchToProps = dispatch => ({
  goToHistoryAction: () => dispatch(GoToHistory()),
  goToHomeAction: () => dispatch(GoToHome()),
  setProfilePictureURIAction: uri => dispatch(SetProfilePictureURI(uri)),
  logoutAction: () => dispatch(Logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
