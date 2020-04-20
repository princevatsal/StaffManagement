import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import {Block, Text, theme, Button as GaButton} from 'galio-framework';
import {Button} from '../components';
import {Images, nowTheme} from '../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Fire from '../Fire';
import {UserContext} from '../context/userContext';

const {width, height} = Dimensions.get('screen');
const ProfilePricture =
  'https://www.clipartmax.com/png/middle/171-1717870_stockvader-predicted-cron-for-may-user-profile-icon-png.png';

const thumbMeasure = (width - 48 - 32) / 2.5;

const Profile = ({navigation}) => {
  const {user, unsetGlobalUser} = useContext(UserContext);

  [userDetails, setuserDetails] = useState({
    profileurl: ProfilePricture,
    name: user.credentials.name,
    title: user.isAdmin ? 'Admin' : 'Employee',
    about: 'An important part of the company',
  });
  return (
    <Block
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <Block flex={0.6}>
        <ImageBackground
          source={Images.ProfileBackground}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}>
          <Block flex style={styles.profileCard}>
            <TouchableOpacity
              style={{
                margin: 20,
              }}
              onPress={() => {
                console.log('pressed');
                navigation.toggleDrawer();
              }}>
              <Image
                source={require('../assets/imgs/menu2.png')}
                style={{width: 45, height: 45}}
              />
            </TouchableOpacity>
            <Block
              style={{
                position: 'absolute',
                width: width,
                zIndex: 5,
                paddingHorizontal: 20,
              }}>
              <Block middle style={{top: height * 0.15}}>
                <Image source={{uri: ProfilePricture}} style={styles.avatar} />
              </Block>
              <Block style={{top: height * 0.2}}>
                <Block middle>
                  <Text
                    style={{
                      fontFamily: 'montserrat-bold',
                      marginBottom: theme.SIZES.BASE / 2,
                      fontWeight: '900',
                      fontSize: 26,
                    }}
                    color="#ffffff">
                    {userDetails.name}
                  </Text>

                  <Text
                    size={16}
                    color="white"
                    style={{
                      marginTop: 5,
                      fontFamily: 'montserrat-bold',
                      lineHeight: 20,
                      fontWeight: 'bold',
                      fontSize: 18,
                      opacity: 0.8,
                    }}>
                    {userDetails.title}
                  </Text>
                </Block>
                <Block style={styles.info}>
                  {/* <Block row space="around">
                    <Block middle>
                      <Text
                        size={18}
                        color="white"
                        style={{
                          marginBottom: 4,
                          fontFamily: 'montserrat-bold',
                        }}>
                        2K
                      </Text>
                      <Text
                        style={{fontFamily: 'montserrat-regular'}}
                        size={14}
                        color="white">
                        Friends
                      </Text>
                    </Block>

                    <Block middle>
                      <Text
                        color="white"
                        size={18}
                        style={{
                          marginBottom: 4,
                          fontFamily: 'montserrat-bold',
                        }}>
                        26
                      </Text>
                      <Text
                        style={{fontFamily: 'montserrat-regular'}}
                        size={14}
                        color="white">
                        Comments
                      </Text>
                    </Block>

                    <Block middle>
                      <Text
                        color="white"
                        size={18}
                        style={{
                          marginBottom: 4,
                          fontFamily: 'montserrat-bold',
                        }}>
                        48
                      </Text>
                      <Text
                        style={{fontFamily: 'montserrat-regular'}}
                        size={14}
                        color="white">
                        Bookmarks
                      </Text>
                    </Block>
                  </Block> */}
                </Block>
              </Block>
            </Block>

            <Block
              middle
              row
              style={{
                position: 'absolute',
                width: width,
                top: height * 0.6 - 22,
                zIndex: 99,
              }}>
              <TouchableOpacity
                onPress={() => {
                  Fire.shared
                    .signOutUser()
                    .then(() => {
                      console.log('user signed out sucessfully');
                      unsetGlobalUser();
                    })
                    .catch(err => alert(err.message));
                }}>
                <Button
                  style={{
                    width: 114,
                    height: 44,
                    marginHorizontal: 5,
                    elevation: 0,
                  }}
                  textStyle={{fontSize: 16}}
                  round>
                  SignOut
                </Button>
              </TouchableOpacity>
              <GaButton
                round
                onlyIcon
                shadowless
                icon="twitter"
                iconFamily="Font-Awesome"
                iconColor={nowTheme.COLORS.WHITE}
                iconSize={nowTheme.SIZES.BASE * 1.375}
                color={'#888888'}
                style={[styles.social, styles.shadow]}
              />
              <GaButton
                round
                onlyIcon
                shadowless
                icon="facebook"
                iconFamily="Font-Awesome"
                iconColor={nowTheme.COLORS.WHITE}
                iconSize={nowTheme.SIZES.BASE * 1.375}
                color={'#888888'}
                style={[styles.social, styles.shadow]}
              />
            </Block>
          </Block>
        </ImageBackground>
      </Block>
      <Block />
      <Block flex={0.4} style={{padding: theme.SIZES.BASE, marginTop: 90}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block flex style={{marginTop: 20}}>
            <Block middle>
              <Text
                style={{
                  color: '#2c2c2c',
                  fontWeight: 'bold',
                  fontSize: 19,
                  fontFamily: 'montserrat-bold',
                  marginTop: 35,
                  marginBottom: 30,
                  zIndex: 2,
                }}>
                About {user.credentials.name}
              </Text>
              <Text
                size={16}
                muted
                style={{
                  textAlign: 'center',
                  fontFamily: 'montserrat-regular',
                  zIndex: 2,
                  lineHeight: 25,
                  color: '#9A9A9A',
                  paddingHorizontal: 15,
                }}>
                {userDetails.about}
              </Text>
            </Block>
          </Block>
        </ScrollView>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    width,
    height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width,
    height: height * 0.6,
  },

  info: {
    marginTop: 30,
    paddingHorizontal: 10,
    height: height * 0.8,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -80,
  },
  avatar: {
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 50,
    borderWidth: 0,
  },
  nameInfo: {
    marginTop: 35,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
  social: {
    width: nowTheme.SIZES.BASE * 3,
    height: nowTheme.SIZES.BASE * 3,
    borderRadius: nowTheme.SIZES.BASE * 1.5,
    justifyContent: 'center',
    zIndex: 99,
    marginHorizontal: 5,
  },
});

export default Profile;
