import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class DashboardItem extends Component  {
    render(){
  return (
    <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.6} style={{flex:1,height:'100%', alignItems:'center', justifyContent:'center'}} onPress={this.props.navigateTo}>
        <View style={{height:30, width:30,alignItems:'center', justifyContent:'center' ,borderRadius:15, backgroundColor:'#38ef7d', marginBottom:10}}>
        <Ionicons name={this.props.imageName} size={22} color={'white'}/>
        </View>
      <Text style={{color:'black', fontWeight:'bold', fontSize:15}}>{this.props.title}</Text>
      </TouchableOpacity>
    </View>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    height:130,
    width:140,
    borderColor:'#38ef7d',
    borderWidth:2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    borderRadius:10
  },
});