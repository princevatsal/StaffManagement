import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  BackHandler,
  ScrollView,
  DeviceEventEmitter,
} from 'react-native';
import Fire from '../Fire';
import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';
import DisplayUser from '../components/DisplayUser';
import Toast from 'react-native-simple-toast';
var PushNotification = require('react-native-push-notification');
const {width, height} = Dimensions.get('screen');

// Global User Context
import {UserContext} from '../context/userContext';
var count = 0;

//Yes Notification Hnalder
const YesNotification = navigation => {
  console.log('Yes came open the app');
  navigation.navigate('SecurityStatus');
};

//filter today by given Date
const filterTask = (tasklist, finaldate) =>
  tasklist.filter(task => {
    let today = finaldate.toLocaleDateString();
    let date = new Date(task.start._seconds * 1000).toLocaleDateString();
    if (today === date) return true;
  });

//applying Notification
applyNotifications = taskss => {
  const filteredTaskss = filterTask(taskss, new Date());
  var datess = [];
  var now = new Date();
  filteredTaskss.forEach(task => {
    let temp_start = new Date(task.start._seconds * 1000);
    let temp_end = new Date(task.end._seconds * 1000);
    let flag = true;
    let hrs = 1;
    while (flag) {
      let date = temp_start.getTime() + hrs * 1000 * 60 * 60;
      hrs++;
      if (date < temp_end) {
        if (date > now) datess.push(new Date(date));
      } else flag = false;
    }
  });
  setNotifications(datess);
};

setNotifications = dates => {
  //creating notification
  PushNotification.cancelAllLocalNotifications();
  dates.forEach((date, index) => {
    console.log('Setting notification :-', date.toLocaleString());
    PushNotification.localNotificationSchedule({
      /* iOS and Android properties */
      id: index,
      title: 'Security Status', // (optional)
      message: 'Is there any Problem with Security', // (required)
      actions: '["Yes"]',
      date: date, // provided date
    });
  });
};

//Main Component
const Home = ({navigation}) => {
  //push notofications
  PushNotification.configure({
    onRegister: function(token) {
      console.log('TOKEN:', token);
    },
    onNotification: function(notification) {
      console.log('NOTIFICATION:', notification);
      if (notification.action == 'Yes') YesNotification(navigation);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: false,
    requestPermissions: true,
  });

  //
  const todayDate = new Date();

  //defining component states
  const [model, setmodel] = useState(false);
  const [dates, setDates] = useState({date: todayDate, showDate: 'Today'});
  const [tasks, setTasks] = useState([]);
  //global state
  const {user} = useContext(UserContext);

  useEffect(() => {
    console.log('fetching for:-', user.uid);
    Fire.shared
      .getUserTask(user.uid)
      .then(tasks => {
        if (tasks) {
          setTasks(tasks.taskList);
          applyNotifications(tasks.taskList);
        } else setTasks([]);
      })
      .catch(err => alert('unable to fetch user', err));
  }, []);
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
      </View>
      <ScrollView>
        <DisplayUser date={dates.date} tasks={tasks} />
      </ScrollView>
      <Modal isVisible={model} onBackButtonPress={() => setmodel(!model)}>
        <View style={{flex: 1}}>
          <Calendar
            onDayPress={day => {
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
});
export default Home;
