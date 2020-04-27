import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  PermissionsAndroid,
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
import Geolocation from 'react-native-geolocation-service';
import AndroidOpenSettings from 'react-native-android-open-settings';

const fire = Fire.shared;
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
const requestLocationPermission = async setLocation => {
  try {
    const grantedLocation = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission Required',
        message: 'Allow Permission for login  ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    // alert('Please Grant Floating Notification Permission ');
    // AndroidOpenSettings.appNotificationSettings();
    // const grantedWave = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.RECEIVE_WAP_PUSH,
    //   {
    //     title: 'Notification Permission Required',
    //     message: 'Allow Permission for login  ',
    //     buttonNeutral: 'Ask Me Later',
    //     buttonNegative: 'Cancel',
    //     buttonPositive: 'OK',
    //   },
    // );
    if (grantedLocation === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
          setLocation({
            timestamp: position.timestamp,
            geo: {
              lat: position.coords.latitude,
              long: position.coords.longitude,
            },
          });
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      console.log('Location permission denied');
    }

    // if (grantedWave === PermissionsAndroid.RESULTS.GRANTED) {
    //   console.log('Wake Up permission Granted');

    // } else {
    //   console.log('Wake Up Permission denied');
    // }
  } catch (err) {
    console.warn(err);
  }
};

const Login = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState({
    timestamp: null,
    geo: null,
  });
  //requesting permission
  useEffect(() => {
    requestLocationPermission(setLocation);
  }, []);

  const signInUser = (email, password) => {
    if (!validateEmail(email)) {
      setIsLoading(false);
      alert('Email is not valid');
      return null;
    }
    if (password.length < 8) {
      setIsLoading(false);
      alert('Password should be atleast 8 digit long');
      return null;
    }
    fire
      .signIn(email, password)
      .then(data => {
        console.log('user signed:-', data);
        Fire.shared
          .updateUserActivity(data.user.uid, location.timestamp, location.geo)
          .then(() => console.log('location updatd'))
          .catch(err => console.log(err));
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        alert(e);
      });
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
                            setIsLoading(true);
                            signInUser(email, password);
                          }}>
                          {isLoading ? (
                            <ActivityIndicator color="white" />
                          ) : (
                            <Text
                              style={{fontFamily: 'montserrat-bold'}}
                              size={14}
                              color={nowTheme.COLORS.WHITE}>
                              {'Sign In'}
                            </Text>
                          )}
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
