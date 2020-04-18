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
import Fire from '../Fire';
import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';
import DisplayUser from '../components/DisplayUser';

const {width, height} = Dimensions.get('screen');
fire = Fire.shared;

// Global User Context
import {UserContext} from '../context/userContext';

//Main Component
const Home = ({navigation}) => {
  const todayDate = new Date();

  //defining component states
  [model, setmodel] = useState(false);
  [dates, setDates] = useState({date: todayDate, showDate: 'Today2'});
  [tasks, setTasks] = useState([]);
  //global state
  const {user} = useContext(UserContext);

  useEffect(() => {
    console.log('fetching for:-', user.uid);
    Fire.shared
      .getUserTask(user.uid)
      .then(tasks => {
        if (tasks) setTasks(tasks.taskList);
        else setTasks([]);
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
        {/* <Icon name="" color="#999" size={40} /> */}
        <DisplayUser tasks={tasks} date={dates.date} />
      </View>

      <Modal isVisible={model}>
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
