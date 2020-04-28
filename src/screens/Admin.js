import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  BackHandler,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Icon} from 'react-native-elements';
import {Input} from '../components';
import {Block} from 'galio-framework';
import {nowTheme} from '../constants';
import Fire from '../Fire';
import Modal from 'react-native-modal';
import {Calendar} from 'react-native-calendars';
import AddTasks from '../components/tasksClass';
import DisplayUser from '../components/DisplayUser';
import Toast from 'react-native-simple-toast';
import firestore from '@react-native-firebase/firestore';
import RootCard from '../components/RootCard';
import LocationCard from '../components/LocationCard';
var PushNotification = require('react-native-push-notification');
//using database
const db = firestore();

//for design purpose
const {width, height} = Dimensions.get('screen');
var count = 0;

const handleUser = (uid, setTasks, setSelectedUserInfo, title, DlNo) => {
  console.log(uid);
  Fire.shared
    .getUserTask(uid)
    .then(tasks => {
      if (tasks) setTasks(tasks.taskList);
      else setTasks([]);
      setSelectedUserInfo({name: title, DlNo, uid, userActivity: []});
      Fire.shared
        .getUserActivity(uid)
        .then(data => {
          var arr = [];
          Object.keys(data).forEach(item => {
            let it = data[item];
            let date = new Date(Number(item));
            it.time = date.toLocaleString();
            arr.push(it);
          });
          setSelectedUserInfo({name: title, DlNo, uid, userActivity: arr});
          console.log('activity setted sucessfully:-', arr);
        })
        .catch(err => console.log(err));
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
          toPass.setSearchTerm('');
          toPass.setdata([]);
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
  const [model, setmodel] = useState(false);
  const [dates, setDates] = useState({date: todayDate, showDate: 'Today'});
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setdata] = useState([]);
  const [update, setupdate] = useState(false);
  const [DATA, setDATA] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedUserInfo, setSelectedUserInfo] = useState({
    name: '',
    DlNo: '',
    uid: '',
    userActivity: [],
  });
  const [showTasks, setShowTasks] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [allOk, setAllOk] = useState(true);
  const [statusModel, setStatusModel] = useState(false);
  const [uidReported, setUidReported] = useState([]);
  //listning real time update
  if (update) {
    console.log('updating');
    Fire.shared.getUserTask(selectedUserInfo.uid).then(data => {
      console.log('updated data:-', data);
      setTasks(data.taskList);
    });
    setupdate(false);
  }

  useEffect(() => {
    PushNotification.cancelAllLocalNotifications();
    BackHandler.addEventListener('hardwareBackPress', () => {
      count++;
      console.log(count);
      if (count > 1) {
        count = 0;
        console.log('removing listener');
        BackHandler.removeEventListener('hardwareBackPress', () => {});
        BackHandler.exitApp();
      } else Toast.show('Tap again for exit', Toast.SHORT);
      return true;
    });
    //fetching user
    Fire.shared
      .getAllUserNames()
      .then(userNames => {
        let dat = userNames.map((user, index) => ({
          title: user.credentials.name,
          id: index,
          uid: user.credentials.uid,
          DlNo: user.credentials.drivingLicenceNo,
        }));
        setDATA(dat);
        //fetching security status
        Fire.shared
          .uidReportedDanger()
          .then(uids => {
            if (uids.length) {
              setAllOk(false);
              // console.log('uid fetched :- ', uids);
              setUidReported(
                dat.filter(user => (uids.includes(user.uid) ? true : false)),
              );
            }
          })
          .catch(() => console.log('unable to fetch uid reported danger '));
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.Header}>
          <View style={styles.navigation}>
            <View style={{flexDirection: 'row'}}>
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
            {allOk ? (
              <Image
                source={require('../assets/imgs/tick.png')}
                style={styles.statusIcon}
              />
            ) : (
              <>
                <TouchableOpacity onPress={() => setStatusModel(true)}>
                  <Image
                    source={require('../assets/imgs/danger.png')}
                    style={styles.statusIcon}
                  />
                </TouchableOpacity>
                <Modal
                  isVisible={statusModel}
                  onBackButtonPress={() => setStatusModel(!statusModel)}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        padding: 20,
                      }}>
                      <Text
                        style={{
                          fontSize: 21,
                          textAlign: 'center',
                          marginBottom: 20,
                        }}>
                        User that have reported{' '}
                      </Text>
                      {uidReported.map((user, index) => (
                        <RootCard
                          key={index}
                          heading={`Name:- ${user.title} DlNo:-${user.DlNo}`}
                        />
                      ))}
                    </View>
                  </View>
                </Modal>
              </>
            )}
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
                  setSearchTerm,
                  setdata,
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

        {selectedUserInfo.name ? (
          <>
            {showTasks || showLocation ? (
              <>
                {showTasks ? (
                  <>
                    <TouchableOpacity
                      onPress={() => setShowTasks(false)}
                      style={{marginLeft: 20, marginTop: -25}}>
                      <Image
                        source={require('../assets/imgs/back.png')}
                        style={styles.back}
                      />
                    </TouchableOpacity>
                    <ScrollView style={{height: 400}}>
                      <DisplayUser date={dates.date} tasks={tasks} />
                    </ScrollView>
                    <AddTasks
                      userInfo={selectedUserInfo}
                      date={dates.date}
                      oldtasks={tasks}
                      setupdate={setupdate}
                    />
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      onPress={() => setShowLocation(false)}
                      style={{marginLeft: 20, marginTop: -25}}>
                      <Image
                        source={require('../assets/imgs/back.png')}
                        style={styles.back}
                      />
                    </TouchableOpacity>
                    <View style={styles.locationContainer}>
                      {selectedUserInfo.userActivity.map(activity => (
                        <TouchableOpacity
                          onPress={() => {
                            Linking.openURL(
                              `https://www.google.com/maps/place/${
                                activity.geo.lat
                              },${activity.geo.long}`,
                            );
                          }}>
                          <LocationCard
                            time={activity.time}
                            details={`Lat: ${activity.geo.lat}\nLong: ${
                              activity.geo.long
                            }`}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </>
                )}
              </>
            ) : (
              <View style={{marginTop: 20}}>
                <TouchableOpacity onPress={() => setShowTasks(true)}>
                  <RootCard heading="See User Tasks" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowLocation(true)}>
                  <RootCard heading="See User Locations" />
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : (
          <></>
        )}

        <Modal isVisible={model} onBackButtonPress={() => setmodel(!model)}>
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
    width: width,
    paddingLeft: 20,
    paddingRight: 35,
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
  back: {
    height: 35,
    width: 35,
  },
  locationContainer: {
    margin: 20,
  },
  statusIcon: {
    height: 30,
    width: 30,
  },
});
export default Admin;
