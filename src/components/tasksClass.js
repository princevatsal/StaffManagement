import React, {useState, Component} from 'react';
import {
  View,
  Button,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  BackHandler,
  TextInput,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Button as GButton} from 'galio-framework';
import {nowTheme} from '../constants';
import Modal from 'react-native-modal';
import {Icon} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import Fire from '../Fire';

const initialState = {
  showModel: false,
  showStart: false,
  showEnd: false,
  aboutTask: '',
  dateDetails: {
    start: {
      time: new Date(),
      text: 'Start Time',
    },
    end: {
      time: new Date(),
      text: 'End Time',
    },
  },
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  addTask = () => {
    let aboutTask = this.state.aboutTask;
    let start = this.state.dateDetails.start;
    let end = this.state.dateDetails.end;
    let user = this.props.userInfo;
    let date = this.props.date;
    let oldtasks = this.props.oldtasks;
    if (start.text == 'Start Time' || end.text == 'End Time') {
      alert('Please Fill Time');
      return null;
    }
    if (aboutTask == '') {
      alert('Please Fill Task Details');
      return null;
    }
    console.log(
      'submitting with :-',
      user.name,
      user.uid,
      date.toLocaleDateString(),
      start.time,
      end.time,
      aboutTask,
    );
    console.log('timestamp:-', firestore.Timestamp.fromDate(start.time));
    const newTask = {
      start: firestore.Timestamp.fromDate(start.time),
      end: firestore.Timestamp.fromDate(end.time),
      details: aboutTask,
    };
    console.log('newtask:-', newTask);
    oldtasks.push(newTask);
    this.setState(initialState);
    Fire.shared
      .writeToTasks(user.uid, oldtasks)
      .then(() => {
        console.log('user updated sucessfully');
        this.props.setupdate(true);
      })
      .catch(err => alert(err));
  };
  onConfirmStart = (e, val) => {
    let localtime = new Date(e);
    localtime.setDate(this.props.date.getDate());
    localtime.setMonth(this.props.date.getMonth());
    localtime.setFullYear(this.props.date.getFullYear());
    console.log('Seee it : ', localtime);
    this.setState({
      dateDetails: {
        ...this.state.dateDetails,
        start: {
          time: localtime,
          text: localtime.toLocaleTimeString(),
        },
      },
    });
    this.setState({showStart: false});
  };
  onCancelStart = () => {
    this.setState({showStart: false});
  };
  onConfirmEnd = (e, val) => {
    console.log('timeee', e, val);
    let localtime = new Date(e);
    localtime.setDate(this.props.date.getDate());
    localtime.setMonth(this.props.date.getMonth());
    localtime.setFullYear(this.props.date.getFullYear());
    console.log('START end : ', localtime.toLocaleTimeString());
    this.setState({
      dateDetails: {
        ...this.state.dateDetails,
        end: {
          time: localtime,
          text: localtime.toLocaleTimeString(),
        },
      },
    });
    this.setState({showEnd: false});
  };
  onCancelEnd = res => {
    console.log(res);
    this.setState({showEnd: false});
  };

  render() {
    return (
      <View style={styles.container}>
        {!!this.props.userInfo.uid && (
          <TouchableOpacity>
            <GButton
              onPress={() => {
                this.setState({showModel: true});
                console.log('clicked');
              }}
              round
              size="small"
              color="#e74c3c">
              <Text style={styles.btnText}>Add New Task</Text>
            </GButton>
          </TouchableOpacity>
        )}
        <Modal isVisible={this.state.showModel} style={styles.model}>
          <View style={styles.viewContainer}>
            <View style={{flexDirection: 'row'}}>
              <View style={[styles.textContainer, {marginRight: 35}]}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({showStart: true});
                  }}>
                  <Icon size={20} name="access-time" color="#28c7fa" />
                  <Text style={styles.txt}>
                    {this.state.dateDetails.start.text}
                  </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={this.state.showStart}
                  mode="time"
                  value={this.state.dateDetails.start.time}
                  onConfirm={this.onConfirmStart}
                  onCancel={this.onCancelStart}
                />
              </View>
              <View style={styles.textContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({showEnd: true});
                  }}>
                  <Icon name="access-time" size={20} color="#28c7fa" />
                  <Text style={styles.txt}>
                    {this.state.dateDetails.end.text}
                  </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={this.state.showEnd}
                  mode="time"
                  value={this.state.dateDetails.end.time}
                  onConfirm={this.onConfirmEnd}
                  onCancel={this.onCancelEnd}
                />
              </View>
            </View>

            <TextInput
              placeholder="Enter Task Details"
              style={styles.details}
              placeholderTextColor="#9999"
              textAlign="center"
              value={this.state.aboutTask}
              onChangeText={e => this.setState({aboutTask: e})}
            />
            <View style={styles.bottom}>
              <TouchableOpacity
                onPress={() => {
                  console.log('close model');
                  this.setState({showModel: false});
                }}>
                <Text style={styles.cancel}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.line} />
              <TouchableOpacity onPress={this.addTask}>
                <Text style={styles.add}>Add Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
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
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    borderWidth: 2,
    borderColor: '#9999',
    margin: 0,
    color: '#999',
    borderRadius: 50,
    padding: 5,
    width: '80%',
    marginTop: 20,
    marginBottom: 10,
  },
  model: {},
  Button: {
    backgroundColor: 'grey',
  },
  viewContainer: {
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  txt: {
    fontSize: 16,
    marginLeft: 10,
  },
  cancel: {
    fontSize: 17,
    color: '#f85959',
  },
  line: {
    backgroundColor: '#999',
    width: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  add: {
    fontSize: 17,
    color: '#28c7fa',
  },
  textContainer: {
    flexDirection: 'row',
  },
  textIcon: {
    marginRight: 20,
  },
});
export default App;
