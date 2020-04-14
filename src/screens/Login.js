import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  Block,
  Checkbox,
  Text,
  Button as GaButton,
  theme,
} from 'galio-framework';
import {Button, Input} from '../components';
import {Images, nowTheme} from '../constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Fire from '../Fire';
fire = Fire.shared;
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
signInUser = (email, password) => {
  console.log('signing ', email, password);
  if (!validateEmail(email)) {
    alert('Email is not valid');
    return null;
  }
  if (password.length < 8) {
    alert('Password should be atleast 8 digit long');
    return null;
  }
  fire
    .signIn(email, password)
    .then(() => console.log('login sucess'))
    .catch(e => {
      alert(e);
    });
};
const Login = ({navigation}) => {
  [email, setEmail] = useState('');
  [password, setPassword] = useState('');
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
                      Sign In
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
                    Enter UserName and Password
                  </Text>
                </Block>
                <Block flex={1} middle space="between">
                  <Block center flex={0.9}>
                    <Block flex space="between">
                      <Block>
                        <Block width={width * 0.8} style={{marginBottom: 5}}>
                          <Input
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChangeText={e => setEmail(e)}
                            style={styles.inputs}
                            iconContent={
                              <Icon
                                size={23}
                                color="#00aced"
                                name="account-circle"
                                family="NowExtra"
                                style={styles.inputIcons}
                              />
                              // <Text>Icon</Text>
                            }
                          />
                        </Block>
                        <Block width={width * 0.8} style={{marginBottom: 5}}>
                          <Input
                            placeholder="Password"
                            secureTextEntry={true}
                            name="password"
                            onChangeText={e => setPassword(e)}
                            value={password}
                            style={styles.inputs}
                            iconContent={
                              <Icon size={23} name="lock" color="#00aced" />
                            }
                          />
                        </Block>
                      </Block>
                      <Text
                        onPress={() => {
                          console.log('clicked');
                          navigation.push('Signup');
                        }}
                        center
                        style={{
                          color: '#00aced',
                          fontWeight: 'bold',
                          fontSize: 16,
                          textDecorationLine: 'underline',
                        }}>
                        Don't have a account SignUp
                      </Text>
                      <Block center>
                        <Button
                          color="primary"
                          round
                          style={styles.createButton}
                          onPress={() => {
                            signInUser(email, password);
                          }}>
                          <Text
                            style={{fontFamily: 'montserrat-bold'}}
                            size={14}
                            color={nowTheme.COLORS.WHITE}>
                            Sign In
                          </Text>
                        </Button>
                      </Block>
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

export default Login;
