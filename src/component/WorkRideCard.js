import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import Moment from 'moment';
import { Avatar, Badge } from 'react-native-elements';
import GradientButton from '../common/GradientButton'
import { getTime, getDate } from '../common/Index';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class WorkRideCard extends Component {
  render() {
    return (
      <TouchableOpacity style={{marginBottom:10}} onPress={this.props.action}>
        <View style={styles.container}>
          {this.props.displayCustomerInfo ?

            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
              <Avatar
                rounded
                size={80}
                source={{
                  uri: 'https://abdulrahman.fleeti.com/save_file/uploads/provider/user/5bf637c8_60262ff8dbde39.10627959.jpg',
                }}
              />
              <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'green', width: 100 }}>
                <GradientButton height={40} title={'Call'} width={'100%'} style={{ alignSelf: 'flex-end' }} />
                <Text style={[styles.text, { marginTop: 20 }]}>2.5 KM</Text>
              </View>
            </View> 
            :
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
              <Avatar
                rounded
                size={60}
                source={{
                  uri: 'https://abdulrahman.fleeti.com/save_file/uploads/provider/user/5bf637c8_60262ff8dbde39.10627959.jpg',
                }}
              />
                <Text style={[styles.text, { marginTop: 20 }]}>2.5 KM</Text>
            </View>
          }
        <View style={{marginBottom:10}}>
          <Text style={[styles.text,{color:'black'}]}>Customer</Text>
          <View style={styles.detalView}>
            <Text style={styles.text}>Pickup</Text>
            <Text>Allama Iqbal Town Lahore</Text>
          </View>
          <View style={styles.detalView}>
            <Text style={styles.text}>Drop Off</Text>
            <Text>Allama Iqbal International Airport, Lahore</Text>
          </View>
        </View>
      </View>
      </TouchableOpacity >

    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
    flexDirection: 'column',
    borderRadius: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    elevation: 2,
  },
  text: {
    fontSize: 18,
    color: 'grey',
    fontWeight: 'bold'
  },
  detalView: {
    marginTop: 10
  }
});
