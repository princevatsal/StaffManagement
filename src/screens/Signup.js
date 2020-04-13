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

const {width, height} = Dimensions.get('screen');

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
const createUser = (email, password, confpass) => {
  console.log('creating user', password, confpass);
  if (password != confpass) {
    console.log('pass not match');
    Alert('title', 'Paaswors not match ');
    return null;
  }
};
const Signup = () => {
  [email, setemail] = useState('');
  [password, setpassword] = useState('');
  [confpass, setconfpass] = useState('');
  [name, setname] = useState('');
  [driving, setdriving] = useState('');
  [userCreated, setuserCreated] = useState(false);
  const Fields2 = () => {
    return (
      <>
        <Block>
          <Block width={width * 0.8} style={{marginBottom: 5}}>
            <Input
              placeholder="Name"
              value={name}
              onChange={e => setname(e)}
              style={styles.inputs}
              iconContent={
                <Icon
                  size={16}
                  color="#ADB5BD"
                  name="account-circle"
                  family="NowExtra"
                  style={styles.inputIcons}
                />
              }
            />
          </Block>
          <Block width={width * 0.8}>
            <Input
              placeholder="Driving Licence No"
              value={driving}
              keyboardType={'numeric'}
              onChange={e => setdriving(e)}
              style={styles.inputs}
              iconContent={
                <Icon
                  size={23}
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
              // createUser(email, password, confpass);
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

  const Fields = () => {
    return (
      <>
        <Block>
          <Block width={width * 0.8} style={{marginBottom: 5}}>
            <Input
              placeholder="Email"
              value={email}
              onChange={e => setemail(e)}
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
              value={password}
              secureTextEntry={true}
              onChange={e => setpassword(e)}
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
              value={confpass}
              onChange={e => setconfpass(e)}
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
              // console.log(email);
              // createUser(email, password, confpass);
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
                      {userCreated ? <Fields2 /> : <Fields />}
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

export default Signup;
