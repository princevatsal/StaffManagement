import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  DatePickerIOS,
  Text,
} from 'react-native';
import Card from './Card';

const {width, height} = Dimensions.get('screen');

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

//filter today by given Date
const filterTask = (tasklist, finaldate) =>
  tasklist.filter(task => {
    let today = finaldate.toLocaleDateString();
    let date = new Date(task.start._seconds * 1000).toLocaleDateString();
    if (today === date) return true;
  });

const DisplayUser = ({tasks, date}) => {
  //Component States
  [renderData, setRenderData] = useState([]);

  useEffect(() => {
    if (tasks) {
      let filteredTasks = filterTask(tasks, date);
      setRenderData(
        filteredTasks.map(task => {
          let StartTime = formatDate(task.start);
          let EndTime = formatDate(task.end);
          return {time: StartTime + '--' + EndTime, details: task.details};
        }),
      );
    }
    console.log('time:-');
  }, [date, tasks]);

  return (
    <View style={styles.cardContainer}>
      {renderData.length ? (
        renderData.map((task, index) => (
          <Card timing={task.time} details={task.details} key={index} />
        ))
      ) : (
        <Text style={{alignSelf: 'center', fontSize: 18}}>No Tasks Yet</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 30,
  },
  container: {
    padding: 10,
  },
  name: {
    textAlign: 'center',
    fontSize: 20,
    color: 'red',
  },
  textContainer: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center',
  },
});

export default DisplayUser;
