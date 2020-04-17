import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {Icon} from 'react-native-elements';
import {Input} from '../components';
import {Block} from 'galio-framework';
import {nowTheme} from '../constants';
const {width, height} = Dimensions.get('screen');
function Item({title}) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Priyansh vatsal',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Ayush kashyap',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Sarthak Gupta',
  },
];
const Admin = ({navigation}) => {
  [searchTerm, setSearchTerm] = useState('');
  [data, setdata] = useState([]);
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
            renderItem={({item}) => <Item title={item.title} />}
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
                  style={styles.iconImg}
                />
              </TouchableOpacity>
              <Text style={{fontSize: 19, color: '#999', marginTop: 4}}>
                Choose Day
              </Text>
            </View>
          </View>
          {/* <Icon name="" color="#999" size={40} /> */}
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
