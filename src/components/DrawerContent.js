import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {UserContext} from '../context/userContext';
import Fire from '../Fire';

const DrawerContent = props => {
  const {user, unsetGlobalUser} = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  console.log('user:-', user);
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  2;
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  useEffect(() => {
    if (user.isAdmin) setIsAdmin(true);
  }, [user]);
  return (
    <View style={styles.drawerContent}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSections}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={{
                  uri:
                    'https://www.clipartmax.com/png/middle/171-1717870_stockvader-predicted-cron-for-may-user-profile-icon-png.png',
                }}
                size={50}
              />
              <View style={{marginLeft: 15}}>
                <Title style={styles.title}>{user.credentials.name}</Title>
                <Caption style={styles.caption}>
                  DL {user.credentials.drivingLicenceNo}
                </Caption>
              </View>
            </View>
            {/* 
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  80
                </Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  0
                </Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View> */}
          </View>

          <Drawer.Section style={styles.drawerSection}>
            {!isAdmin ? (
              <DrawerItem
                icon={(color, size) => (
                  <Icon name="home-outline" color={color} size={size} />
                )}
                label="Home"
                onPress={() =>
                  props.navigation.navigate('App', {screen: 'Home'})
                }
              />
            ) : (
              <DrawerItem
                icon={(color, size) => (
                  <Icon name="settings-outline" color={color} size={size} />
                )}
                label="Admin"
                onPress={() => props.navigation.navigate('Admin')}
              />
            )}
            <DrawerItem
              icon={(color, size) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => props.navigation.navigate('Profile')}
            />
            {/* <DrawerItem
              icon={(color, size) => (
                <Icon name="bookmark-outline" color={color} size={size} />
              )}
              label="Bookmarks"
              onPress={() => props.navigation.navigate('Bookmarks')}
            />
            <DrawerItem
              icon={(color, size) => (
                <Icon name="settings-outline" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => props.navigation.navigate('Settings')}
            /> */}
            <DrawerItem
              icon={(color, size) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Support"
              onPress={() => props.navigation.navigate('Support')}
            />
          </Drawer.Section>

          <Drawer.Section title="Preferences">
            <TouchableRipple onPress={() => toggleTheme()}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.drawerSection}>
        <DrawerItem
          icon={(color, size) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            Fire.shared
              .signOutUser()
              .then(() => {
                console.log('user signed out sucessfully');
                unsetGlobalUser();
              })
              .catch(err => alert(err.message));
          }}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSections: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginTop: 15,
    borderColor: '#F4F4F4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerContent;
