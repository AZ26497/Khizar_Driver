import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image , Linking, Platform} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import GradientButton from '../common/GradientButton'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'


export default class RideSummaryAndDetail extends Component {
  render() {
    const dialCall = (number) => {
      let phoneNumber = '';
      if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
      else {phoneNumber = `telprompt:${number}`; }
      Linking.openURL(phoneNumber);
   };
    return (
      <View style={styles.container}>
        {/* Profile Picture */}
        <View style={{
          height: 100, width: 100, borderRadius: 50, backgroundColor: 'white',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          left: 0,
          right: 0,
          top: -40,
          bottom: 0
        }}>
          <Image
            source={require('../../assets/images/Avatar.png')}
            style={{ width: '90%', height: '60%' }}
          />
          <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 15 }}>Driver</Text>
       
        </View>
        <MaterialIcons
            style={{position:'absolute'}}
            name={'keyboard-arrow-down'}
          
            size={30}/>
        {/* Car detail */}
       

        <View style={{ alignSelf: 'flex-end' , marginTop:30}}>

          <Text style={{ backgroundColor: '#f5f5f5', borderRadius: 15, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>AH-234</Text>
          <Text>Suzuki WagenR</Text>

        </View>

        {/* Ride Summary */}


        <View style={{width: '90%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',  borderRadius: 20, position: 'absolute', bottom: 20}}>
          <View style={{ flexDirection: 'row', height: 70,width:'100%', margin:10}}>
          <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', marginLeft:5 , marginRight:5}}>
              <Text style={{textAlign:'left', fontSize:12}}>4:35</Text>
              <Text style={{textAlign:'left', fontSize:12}}>7:00</Text>

            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
              <Ionicons name={'ellipse'} size={12} color={'#38ef7d'} />
              <View style={{ height: '55%', width: 2, backgroundColor: 'black' }}></View>
              <Ionicons name={'caret-down'} size={13} color={'black'} />
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', marginLeft:5 }}>
              <Text style={{textAlign:'left'}}>405 Johar Town Lahore</Text>
              <Text style={{textAlign:'left'}}>Lahore Airport</Text>

            </View>
          </View>
          {/* <Text style={{fontWeight:'bold', alignSelf:'flex-start', margin:10, fontSize:20}}>Summary</Text> */}

          <View style={{flexDirection:'column', justifyContent:'space-between', alignItems:'center', width:'100%', marginBottom:10, padding:10,borderColor:'#f5f5f5', borderWidth:1, borderRadius:20, backgroundColor:'#ffff', margin:10}}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' , width:'100%', marginBottom:5}}>
              <Text style={{textAlign:'left', fontWeight:'bold', color:'black'}}>Date:</Text>
              <Text style={{textAlign:'left'}}>10 April 2020</Text>

            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', width:'100%', marginBottom:5 }}>
            <Text style={{textAlign:'left', fontWeight:'bold', color:'black'}}>ETA:</Text>
              <Text style={{textAlign:'left'}}>11:30pm</Text>

            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', width:'100%' , marginBottom:5}}>
            <Text style={{textAlign:'left', fontWeight:'bold', color:'black'}}>Distance:</Text>
              <Text style={{textAlign:'left'}}>20km</Text>

            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', width:'100%', marginBottom:5 }}>
            <Text style={{textAlign:'left', fontWeight:'bold', color:'black'}}>Cost:</Text>
              <Text style={{textAlign:'left'}}>500Rs</Text>

            </View>
          </View>
          <View style={{ height: '20%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom:10}}>

            <GradientButton title={"Contact Driver"} width={'75%'} height={50} action={() => dialCall(4444)}></GradientButton>
            <View style={{ borderRadius: 10, height: 40, width: 40, backgroundColor: '#ffff', elevation: 10, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end', alignSelf:'center' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomAlert',{alertMsg:"This ride can't be cancelled", titleButton:'Call Support'})}>
              <Feather name='x' size={25} color={'black'} ></Feather>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 0,
    backgroundColor: 'white',
    height:Platform.OS=='ios'?'60%':'50%',
    width: '100%',
    position: 'absolute',
    borderTopRightRadius: 30.0,
    borderTopLeftRadius: 20.0,
    borderTopColor: 'yellow',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 10,
    height:'50%',
  },
});