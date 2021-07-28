import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Test from './Test';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Dashboard from '../HomeStack/Dashboard/Dashboard';
import Wallet from '../bottomTabScreens/Wallet';
import History from '../bottomTabScreens/History';
import WorkRide from './Dashboard/WorkRide';
import CustomAlert from '../../common/CustomAlert';
import MapDetails from './MapDetails'
const bottomTabStack = createMaterialBottomTabNavigator()
const Stack = createStackNavigator()

const bottomStackScreen = () => {
  return (
    <bottomTabStack.Navigator
      barStyle={{ backgroundColor: '#ffff' }}
      shifting={false}
      activeColor='#38ef7d'
      inactiveColor='black'>

      <bottomTabStack.Screen options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={'home-outline'} size={26} color={color} />
        ),
      }} name="Dashboard" component={Dashboard} />

      <bottomTabStack.Screen options={{
        tabBarLabel: 'History',
        title: 'History',
            headerShown: true,
            headerTransparent: true,
            headerTitleStyle: { alignSelf: 'center', color: 'white', marginRight: 10, fontWeight: 'bold', fontSize: 25 },
            headerTintColor: 'white',
            headerBackTitle:'',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={'card-outline'} size={26} color={color} />
        ),
      }} name="History" component={History} />

      <bottomTabStack.Screen options={{
        tabBarLabel: 'Wallet',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={'wallet-outline'} size={26} color={color} />
        ),
      }} name="Wallet" component={Wallet} />

      {/* <bottomTabStack.Screen options={{
        tabBarLabel: 'Menu',
        title: 'Header title',
        tabBarIcon: ({ color, size }) => (
          <ActionButton active={true} style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            width: 70,
            position: 'absolute',
            bottom: 10,
            right: 10,
            height: 70,
            backgroundColor: '#fff',
            borderRadius: 100,
          }}>
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
            <Ionicons name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
            <Ionicons name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
            <Ionicons name="md-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
          // <Ionicons name={'menu-outline'} size={26} color={color} />
        ),
      }} name="Menu" component={Menu} /> */}

    </bottomTabStack.Navigator>

  );
}
export default HomeStack = () => (
    <Stack.Navigator  initialRouteName='Home' screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" children={bottomStackScreen} />
        <Stack.Screen name="CustomAlert" component={CustomAlert} />
        <Stack.Screen name="MapDetail" component={MapDetails} options={{
            title: 'Detail',
            headerShown: true,
            headerTransparent: true,
            headerBackTitle:'',
            headerTitleStyle: { alignSelf: 'center', color: 'black', marginRight: 15, fontWeight: 'bold', fontSize: 25 },

          }} />
        <Stack.Screen name="WorkRide" children={WorkRide} options={{
            title: 'Ride List',
            headerShown: true,
            headerTransparent: true,
            headerTitleStyle: { alignSelf: 'center', color: 'white', marginRight: 10, fontWeight: 'bold', fontSize: 25 },
            headerTintColor: 'white',
            headerBackTitle:''
          }} />
          </Stack.Navigator>
);