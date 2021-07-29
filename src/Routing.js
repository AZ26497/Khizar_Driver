import React, {useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './screens/AuthStack';
import HomeStack from './screens/HomeStack';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-async-storage/async-storage'
const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    console.log('App Js called')
    SplashScreen.hide();
    requestUserPermission();
    createNotificationListeners();
  
    messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    // Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      getToken();
      console.log('Authorization status:', authStatus);
    }
  }
  async function createNotificationListeners() {
    this.notificationListener = messaging().onMessage(async remoteMessage => {
      console.log("createNotificationListenersLatest", "notificationListener-remoteMessage", JSON.stringify(remoteMessage))
      const { notification, data } = remoteMessage;
      const { title, body, } = notification
      showAlert(title, body);
  })

  this.notificationOpenedListener = messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log("createNotificationListenersLatest", "notificationOpenedListener-remoteMessage", JSON.stringify(remoteMessage))
      const { notification, data } = remoteMessage
      const { title } = notification
  });
  this.quitStateListener = messaging().getInitialNotification().then(async remoteMessage => {
      if (remoteMessage) {
          const { notification, data } = remoteMessage
          const { title } = notification
          console.log('Notification caused app to open from quit state:');
      }
  });
  this.backgroundStateListener = messaging().onNotificationOpenedApp(async remoteMessage => {
      if (remoteMessage) {
          const { notification, data } = remoteMessage
          const { title } = notification
          console.log('Notification caused app to open from backgroundStateListener:');
      }
  });
}
  async function getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('Token from Storage', fcmToken);

    if (!fcmToken) {
        fcmToken = await messaging().getToken();
        console.log('Token from Message', fcmToken);

        if (fcmToken) {
            // user has a device token
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
  }
  
 function showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }
  
 function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
      // App has been launched in the background by iOS, ignore
      return null;
    }
  
    return <App />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="HomeStack" component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
