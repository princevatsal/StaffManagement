import React, {useEffect, useState, useContext} from 'react';
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
import Fire from '../Fire';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Modal from 'react-native-modal';
import Card from '../components/Card';
fire = Fire.shared;

// Global User Context
import {UserContext} from '../context/userContext';

//Formatting Date
const formatDate = firestoreDate => {
  console.log(firestoreDate);
  var jsDate = new Date(firestoreDate._seconds * 1000);
  var time = jsDate.toLocaleTimeString({}, {hour12: false});
  time = tConv24(time);
  console.log(time);
  return time;
};

//formatting 12 hours
function tConv24(time24) {
  var ts = time24;
  var H = +ts.substr(0, 2);
  var h = H % 12 || 12;
  h = h < 10 ? '0' + h : h; // leading 0 at the left for 1 digit hours
  var ampm = H < 12 ? ' AM' : ' PM';
  ts = h + ts.substr(2, 3) + ampm;
  return ts;
}

//filter today tasks only
const filterTask = (tasklist, finaldate) =>
  tasklist.filter(task => {
    let today = finaldate.toLocaleDateString();
    let date = new Date(task.start._seconds * 1000).toLocaleDateString();
    if (today === date) return true;
  });

const Home = ({navigation}) => {
  const todayDate = new Date();
  [model, setmodel] = useState(false);
  [renderData, setRenderData] = useState([]);
  [dates, setDates] = useState({date: todayDate, showDate: 'Today'});
  const {user} = useContext(UserContext);

  useEffect(() => {
    // fire.signOutUser();
    let tasks = user.tasks;
    let filteredTasks = filterTask(tasks, dates.date);
    setRenderData(
      filteredTasks.map(task => {
        let StartTime = formatDate(task.start);
        let EndTime = formatDate(task.end);
        return {time: StartTime + '--' + EndTime, details: task.details};
      }),
    );
    console.log('time:-');
  }, [user, dates.date]);

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
              {dates.showDate}
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

          <TouchableOpacity
            onPress={() => {
              setmodel(!model);
            }}>
            <View style={{flexDirection: 'row'}}>
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
              <Text style={{fontSize: 19, color: '#999', marginTop: 4}}>
                Choose Day
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <Icon name="" color="#999" size={40} /> */}
      </View>
      <View style={styles.cardContainer}>
        {renderData.map(task => (
          <Card timing={task.time} details={task.details} />
        ))}
      </View>

      <Modal isVisible={model}>
        <View style={{flex: 1}}>
          <Calendar
            onDayPress={day => {
              console.log('selected day', day);
              let selectedDate = new Date(day.dateString);
              setDates({
                date: selectedDate,
                showDate: selectedDate.toLocaleDateString(),
              });
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
});

export default Home;
