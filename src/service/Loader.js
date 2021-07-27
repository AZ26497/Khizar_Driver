import React, {Component} from 'react';
import {View, ActivityIndicator,Dimensions} from 'react-native';
const { height, width } = Dimensions.get('window');
export default class Loader extends Component {
  
  render() {
    return (            
      <View
        style={{
           flex: 1,
          // width:width,
          //height:height,
          // position: 'absolute',
          // bottom: 0,
          // backgroundColor: '#00000020',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf:'center',
          
        
        }}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }
}
