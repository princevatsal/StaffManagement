import React from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  Block,
  Checkbox,
  Text,
  Button as GaButton,
  theme,
} from 'galio-framework';

import {Button, Input} from '../components';
import {Images, nowTheme} from '../constants';
import Fire from '../Fire';
import {connect} from 'react-redux';
const {width, height} = Dimensions.get('screen');

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
const validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
const createUserr = authDetails => {
  if (!validateEmail(authDetails.email)) {
    alert('Email is not valid');
    return null;
  }
  if (authDetails.password != authDetails.confpass) {
    alert('Password not match ');
    return null;
  }
  if (authDetails.password.length < 8) {
    alert('Password should be atleast 8 digit long');
    return null;
  }
  Fire.shared
    .signUp(authDetailRFs.email, authDetails.password)
    .then(user => console.log(user))
    .catch(e => alert(e));
  console.log('signedIn Sucessfully');
};

const AuthDetails = ({authDetails, setAuthDetails}) => {
  return (
    <>
      <Block>
        <Block width={width * 0.8} style={{marginBottom: 5}}>
          <Input
            placeholder="Email"
            value={authDetails.email}
            onChangeText={e => setAuthDetails({...authDetails, email: e})}
            style={styles.inputs}
            iconContent={
              <Icon
                size={16}
                color="#ADB5BD"
                name="email"
                family="NowExtra"
                style={styles.inputIcons}
              />
            }
          />
        </Block>
        <Block width={width * 0.8} style={{marginBottom: 5}}>
          <Input
            placeholder="Password"
            value={authDetails.password}
            secureTextEntry={true}
            onChangeText={e => setAuthDetails({...authDetails, password: e})}
            style={styles.inputs}
            iconContent={
              <Icon
                size={16}
                color="#ADB5BD"
                name="lock"
                family="NowExtra"
                style={styles.inputIcons}
              />
            }
          />
        </Block>
        <Block width={width * 0.8} style={{marginBottom: 5}}>
          <Input
            placeholder="Confirm Password"
            value={authDetails.confpass}
            onChangeText={e => setAuthDetails({...authDetails, confpass: e})}
            secureTextEntry={true}
            style={styles.inputs}
            iconContent={
              <Icon
                size={16}
                color="#ADB5BD"
                name="lock"
                family="NowExtra"
                style={styles.inputIcons}
              />
            }
          />
        </Block>
      </Block>
      <Block center>
        <Button
          color="primary"
          round
          style={styles.createButton}
          onPress={() => {
            createUserr(authDetails);
          }}>
          <Text
            style={{fontFamily: 'montserrat-bold'}}
            size={14}
            color={nowTheme.COLORS.WHITE}>
            Get Started
          </Text>
        </Button>
      </Block>
    </>
  );
};
const Signup = () => {
  [authDetails, setAuthDetails] = useState({
    email: '',
    password: '',
    confpassword: '',
  });

  return (
    <DismissKeyboard>
      <Block flex middle>
        <ImageBackground
          source={Images.RegisterBackground}
          style={styles.imageBackgroundContainer}
          imageStyle={styles.imageBackground}>
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex space="evenly">
                <Block flex={0.4} middle style={styles.socialConnect}>
                  <Block flex={0.5} middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center',
                      }}
                      color="#333"
                      size={24}>
                      Register
                    </Text>
                  </Block>

                  <Block
                    flex={0.5}
                    row
                    middle
                    space="between"
                    style={{marginBottom: 18}}>
                    <GaButton
                      round
                      onlyIcon
                      shadowless
                      icon="home"
                      iconFamily="Font-Awesome"
                      iconColor={theme.COLORS.WHITE}
                      iconSize={theme.SIZES.BASE * 1.625}
                      color={nowTheme.COLORS.TWITTER}
                      style={[styles.social, styles.shadow]}
                    />

                    <GaButton
                      round
                      onlyIcon
                      shadowless
                      icon="sign-in"
                      iconFamily="Font-Awesome"
                      iconColor={theme.COLORS.WHITE}
                      iconSize={theme.SIZES.BASE * 1.625}
                      color={nowTheme.COLORS.DRIBBBLE}
                      style={[styles.social, styles.shadow]}
                    />
                    <GaButton
                      round
                      onlyIcon
                      shadowless
                      icon="lock"
                      iconFamily="Font-Awesome"
                      iconColor={theme.COLORS.WHITE}
                      iconSize={theme.SIZES.BASE * 1.625}
                      color={nowTheme.COLORS.FACEBOOK}
                      style={[styles.social, styles.shadow]}
                    />
                  </Block>
                </Block>
                <Block flex={0.1} middle>
                  <Text
                    style={{
                      fontFamily: 'montserrat-regular',
                      textAlign: 'center',
                    }}
                    muted
                    size={16}>
                    or be classical
                  </Text>
                </Block>
                <Block flex={1} middle space="between">
                  <Block center flex={0.9}>
                    <Block flex space="between">
                      <AuthDetails
                        authDetails={authDetails}
                        setAuthDetails={setAuthDetails}
                      />
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  imageBackground: {
    width: width,
    height: height,
  },
  registerContainer: {
    marginTop: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden',
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI,
});

export default connect(
  mapStateToProps,
  {signupUser},
)(Signup);
