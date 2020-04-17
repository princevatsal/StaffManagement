import {Button, Input} from '../components';
import {Images, nowTheme} from '../constants';
import {View, Dimensions, StyleSheet} from 'react-native';
import {Block, Text} from 'galio-framework';
import {useState, useEffect, useContext} from 'react';
import React from 'react';
import {Icon} from 'react-native-elements';
import Fire from '../Fire';
const {width, height} = Dimensions.get('screen');

//globalUser
import {UserContext} from '../context/userContext';

const UserInfo = ({navigation}) => {
  // const globalUser = useContext(UserContext);
  const {
    switchAuthenticated,
    user: {uid},
  } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState({
    name: '',
    driving: '',
  });
  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.headLine}>Please Enter Information Below</Text>
        <Block>
          <Block width={width * 0.8} style={{marginBottom: 5}}>
            <Input
              placeholder="Name"
              value={userDetails.name}
              onChangeText={e => setUserDetails({...userDetails, name: e})}
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
              value={userDetails.driving}
              keyboardType={'numeric'}
              onChangeText={e => setUserDetails({...userDetails, driving: e})}
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
              console.log(userDetails.name, userDetails.driving);
              Fire.shared
                .writeUserData(uid, {
                  credentials: {
                    name: userDetails.name,
                    drivingLicenceNo: userDetails.driving,
                  },
                })
                .then(() => {
                  // Fire.shared.signOutUser().then(() => {
                  //   alert('Sucessfully Registered . Please Login Again');
                  //   unsetGlobalUser();
                  //   console.log('user unset');
                  // });
                  switchAuthenticated();
                  navigation.navigate('Loading');
                })
                .catch(e => alert(e));
            }}>
            <Text
              style={{fontFamily: 'montserrat-bold'}}
              size={14}
              color={nowTheme.COLORS.WHITE}>
              Get Started
            </Text>
          </Button>
        </Block>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40,
  },
  headLine: {
    fontSize: 20,
    fontWeight: '400',
    padding: 10,
    marginBottom: 25,
  },
});
export default UserInfo;
