import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput , SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import GradientButton from '../../common/GradientButton'
import LinearGradient from 'react-native-linear-gradient';

const Wallet = () => {
  return (
    <SafeAreaView style={{
      flex: 1, backgroundColor: '#38ef7d'
    }}>
    <LinearGradient
      colors={['#38ef7d', '#11998e']}
      style={{
        flex: 1, alignItems: 'center'
      }}
    >
      <View style={styles.container}>
        <View style={{marginTop:20}}>
          <Text style={{ fontSize: 30, textAlign: 'center' }}>Available Credit</Text>
          <Text style={{ fontSize: 35, fontWeight: 'bold', textAlign: 'center' }}>PKR 0</Text>
        </View>
        <View style={{width:'100%', flexDirection:'column',alignItems:'center'}}>
          <View style={styles.textFieldCont}>
            <Text style={{ marginBottom: 5, fontWeight: 'bold', color: 'white', fontSize: 20, color: 'black' }}>Enter amount you want to add</Text>
            <TextInput
              style={[styles.input, {backgroundColor:'white'}]}
              value={''}
              keyboardType="numeric"
              onChangeText={(text) => console.log(text)}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '90%', marginBottom:10 }}>
            <Icon name={"checkbox-blank-outline"} size={30}></Icon>
            <Text style={{ fontSize: 22, textAlign: 'center' }}>Use Card</Text>
          </View>
          <View style={{ borderRadius: 10, elevation: 8, backgroundColor: '#FFFFFF', width: '90%', justifyContent: 'space-around' }}>
            <Text style={{ fontSize: 25, textAlign: 'left', marginLeft: 10, marginTop: 10 }}>Card</Text>
            <View style={styles.cardDetailView}>
                                <View style={styles.textFieldCont}>
                                    <Text style={{ marginBottom: 5, fontWeight: 'bold', color: 'black', fontSize: 20, marginLeft: 5 }}>Card Number</Text>
                                    <TextInput
                                            style={styles.input}
                                            keyboardType="numeric"
                                            value={'3864276427834682'}
                                    />
                                </View>
                                <View style={styles.textFieldCont}>
                                    <Text style={{ marginBottom: 5, fontWeight: 'bold', color: 'black', fontSize: 20, marginLeft: 5 }}>Card Holder Name</Text>
                                    <TextInput
                                            style={styles.input}
                                            keyboardType="default"
                                            value={'Khizar Fleet'} />
                                </View>
                                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-around' }}>
                                    <View style={[styles.textFieldCont, { width: '47%' }]}>
                                        <Text style={{ marginBottom: 5, fontWeight: 'bold', color: 'black', fontSize: 20, marginLeft: 5 }}>Expiry Date</Text>
                                        <TextInput
                                            style={styles.input}
                                            keyboardType="numeric"
                                            value={'12/20/2022'}
                                        />
                                    </View>
                                    <View style={[styles.textFieldCont, { width: '47%' }]}>
                                        <Text style={{ marginBottom: 5, fontWeight: 'bold', color: 'black', fontSize: 20, marginLeft: 5 }}>CVV</Text>
                                        <TextInput
                                            style={styles.input}
                                            keyboardType="numeric"
                                            value={'0987'}
                                        />
                                    </View>
                                </View>
                            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    height: '100%',
    width: '100%',
    alignItems: 'center'
  },
  textFieldCont: {
    // alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '90%',
    margin: 10,
    borderColor: '#ffff',
  },
  input: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#F2F2F2',
    color: '#424242',
    width: '100%',
    borderRadius: 15,
    fontSize:18
  },
});
export default Wallet;