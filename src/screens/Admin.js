import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Icon} from 'react-native-elements';
import {Input} from '../components';
import {Block} from 'galio-framework';
import {nowTheme} from '../constants';
import Fire from '../Fire';
import Modal from 'react-native-modal';
import {Calendar} from 'react-native-calendars';

import AddTask from '../components/AddTask';
import DisplayUser from '../components/DisplayUser';
//for design purpose
const {width, height} = Dimensions.get('screen');

const handleUser = (uid, setTasks, setSelectedUserInfo, title, DlNo) => {
  console.log(uid);
  Fire.shared
    .getUserTask(uid)
    .then(tasks => {
      if (tasks) setTasks(tasks.taskList);
      else setTasks([]);
      setSelectedUserInfo({name: title, DlNo, uid});
    })
    .catch(err => alert('unable to fetch user', err));
};

//Search List Component
const Item = ({toPass}) => {
  const title = toPass.title;
  const uid = toPass.uid;
  const setTasks = toPass.setTasks;
  const setSelectedUserInfo = toPass.setSelectedUserInfo;
  const DlNo = toPass.DlNo;
  const Uid = uid;
  return (
    <View style={styles.item}>
      <Text
        style={styles.title}
        onPress={() => {
          setSearchTerm('');
          setdata([]);
          handleUser(Uid, setTasks, setSelectedUserInfo, title, DlNo);
        }}>
        {title}
      </Text>
    </View>
  );
};

//Main Component
const Admin = ({navigation}) => {
  const todayDate = new Date();

  //Component States
  [model, setmodel] = useState(false);
  [dates, setDates] = useState({date: todayDate, showDate: 'Today'});
  [searchTerm, setSearchTerm] = useState('');
  [data, setdata] = useState([]);
  [DATA, setDATA] = useState([]);
  [tasks, setTasks] = useState([]);
  [selectedUserInfo, setSelectedUserInfo] = useState({
    name: '',
    DlNo: '',
    uid: '',
  });
  //fetching user
  Fire.shared
    .getAllUserNames()
    .then(userNames =>
      setDATA(
        userNames.map((user, index) => ({
          title: user.credentials.name,
          id: index,
          uid: user.credentials.uid,
          DlNo: user.credentials.drivingLicenceNo,
        })),
      ),
    )
    .catch(err => console.log(err));
  // useEffect(() => {}, [tasks, DATA, dates]);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.Header}>
          <View style={styles.navigation}>
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
            <Text style={styles.brand}>Tasks</Text>
          </View>
          <Block
            width={width}
            style={{
              marginBottom: 5,
              alignItems: 'center',
              marginTop: 10,
              //   backgroundColor: 'grey',
            }}>
            <Input
              placeholder="Search for Employee"
              value={searchTerm}
              onChangeText={e => {
                setSearchTerm(e);
                let newdata = DATA.filter(item => {
                  if (
                    item.title.toLowerCase().indexOf(e.toLowerCase()) != -1 &&
                    e.length > 0
                  ) {
                    return item.title;
                  }
                });
                setdata(newdata);
              }}
              //   value={userDetails.name}
              //   onChangeText={e => setUserDetails({...userDetails, name: e})}
              style={{...styles.inputs, width: width * 0.8}}
              iconContent={
                <Icon
                  size={16}
                  color="#ADB5BD"
                  name="search"
                  family="NowExtra"
                  style={styles.inputIcons}
                />
              }
            />
          </Block>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <Item
                toPass={{
                  title: item.title,
                  uid: item.uid,
                  setTasks,
                  setdata,
                  setSelectedUserInfo,
                  DlNo: item.DlNo,
                }}
              />
            )}
            keyExtractor={item => item.id}
            style={{
              position: 'absolute',
              top: 120,
              backgroundColor: 'white',
              zIndex: 1,
              width: width,
              paddingLeft: 55,
            }}
          />
          <View style={styles.tabs}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/imgs/bulb2.png')}
                style={styles.iconImg}
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
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  setmodel(!model);
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../assets/imgs/calander2.png')}
                    style={styles.iconImg}
                  />
                  <Text style={{fontSize: 19, color: '#999', marginTop: 4}}>
                    Choose Day
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* <Icon name="" color="#999" size={40} /> */}
        </View>
        {selectedUserInfo.name ? (
          <View style={styles.coolContainer}>
            <Text style={styles.name}>{selectedUserInfo.name}</Text>
            <View style={styles.textContainer}>
              <Text>DL No:-</Text>
              <Text>{selectedUserInfo.DlNo}</Text>
            </View>
          </View>
        ) : (
          <></>
        )}
        <DisplayUser date={dates.date} tasks={tasks} />
        <AddTask />
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
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coolContainer: {
    paddingTop: 5,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  name: {
    textAlign: 'center',
    fontSize: 20,
    color: 'red',
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center',
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  inputs: {
    borderWidth: 2,
    borderColor: '#E3E3E3',
    borderRadius: 30,
  },
  Header: {
    backgroundColor: 'white',
    height: 200,
    width: '100%',
    justifyContent: 'space-between',
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5,

    elevation: 2,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 0.32 * width,
    paddingLeft: 20,
    backgroundColor: 'white',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 25,
    paddingTop: 10,
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
  brand: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    fontFamily: 'sans-serif-light',
    marginTop: 2,
  },
  iconImg: {
    height: 30,
    width: 30,
    marginTop: 3,
    marginLeft: 10,
    marginRight: 11,
    backgroundColor: 'white',
  },
  item: {
    padding: 2,
    width: 0.7 * width,
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#999',
  },
  title: {
    fontSize: 22,
  },
});
export default Admin;
