import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
const {width, height} = Dimensions.get('screen');
import {Icon} from 'react-native-elements';
import Fire from '../fire';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Modal from 'react-native-modal';
fire = Fire.shared;

const Home = ({navigation, user}) => {
  [model, setmodel] = useState(false);

  useEffect(() => {
    // fire.signOutUser();
    console.log('app state ', user);
  });
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: 'white',
          height: '17%',
          width: '100%',
          justifyContent: 'space-between',
          // flexDirection:,
          paddingTop: 20,
          // borderBottomColor: 'black',
          // borderBottomWidth: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 5,

          elevation: 2,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 0.32 * width,
            paddingLeft: 20,
            backgroundColor: 'white',
          }}>
          <TouchableOpacity
            onPress={() => {
              console.log('pressed');
              navigation.toggleDrawer();
            }}>
            <Image
              source={require('../assets/imgs/menu.png')}
              style={{width: 35, height: 35, marginRight: 20}}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              color: 'black',
              fontFamily: 'sans-serif-light',
              marginTop: 2,
            }}>
            Tasks
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'white',
            justifyContent: 'center',
            paddingBottom: 25,
            paddingTop: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../assets/imgs/bulb2.png')}
              style={{
                height: 30,
                width: 30,
                marginLeft: 10,
                marginRight: 11,
                backgroundColor: 'white',
              }}
            />
            <Text style={{fontSize: 19, color: '#999', marginTop: 4}}>
              Today
            </Text>
          </View>
          <View
            style={{
              width: 0.7,
              backgroundColor: '#999',
              marginLeft: 25,
              marginRight: 25,
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                setmodel(!model);
              }}>
              <Image
                source={require('../assets/imgs/calander2.png')}
                style={{
                  height: 28,
                  width: 28,
                  marginTop: 3,
                  marginLeft: 10,
                  marginRight: 11,
                }}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 19, color: '#999', marginTop: 4}}>
              Choose Day
            </Text>
          </View>
        </View>
        {/* <Icon name="" color="#999" size={40} /> */}
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Image
            source={require('../assets/imgs/todo.png')}
            style={styles.cardIcon}
          />
          <View style={styles.cardText}>
            <Text style={styles.cardHeading}>9:00 AM -- 1:00 PM</Text>
            <Text style={styles.cardStr}>
              Your Work is to fill the data on server
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <Image
            source={require('../assets/imgs/todo.png')}
            style={styles.cardIcon}
          />
          <View style={styles.cardText}>
            <Text style={styles.cardHeading}>2:00 PM -- 4:00 PM</Text>
            <Text style={styles.cardStr}>
              Your Work is to VERIFY the data on server
            </Text>
          </View>
        </View>
      </View>

      <Modal isVisible={model}>
        <View style={{flex: 1}}>
          <Calendar
            onDayPress={day => {
              console.log('selected day', day);
              setmodel(!model);
            }}
          />
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    padding: 30,
  },
  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: '#000',
    padding: 15,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    marginBottom: 20,
  },
  cardIcon: {
    height: 60,
    width: 60,
  },
  cardText: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  cardHeading: {
    fontSize: 20,
  },
  cardStr: {
    color: '#999',
    width: 220,
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  {},
)(Home);
