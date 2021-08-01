import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HistoryListItem from '../../component/HistoryListItem';
import {getCompletedRideList} from '../../service/Api'
import Loader from '../../service/Loader'

const History = ({navigation}) => {
  const [rideList, setRideList] = useState([])
  const [loading, setLoading] = useState('true')
 
  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      setLoading(true)
      getList()
    });
    return willFocusSubscription;
  }, [navigation]);
  const getList = () => {
    getCompletedRideList().then((response) => {
      if (response.status === 1) {
        console.log('Ride Data', response.data)
        setLoading(false)
        setRideList(response.data)
      }
      else {
        setLoading(false)
        alert(response.status)
      }
    }).catch((error) => {
      setLoading(false)
      alert(error)
    })
  }
  const renderItem = ({ item }) => (
    <HistoryListItem rideDetails={item}/>
  );
  return (
    <SafeAreaView style={{
      flex: 1, backgroundColor: '#38ef7d'
    }}>
       {loading ? <Loader /> : (
      <LinearGradient
        // Background Linear Gradient
        colors={['#38ef7d', '#11998e']}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Text style={{ fontWeight: 'bold', color: 'white', height: 30, fontSize: 25, alignSelf: 'center', marginBottom:10, marginTop:10 }}>Completed Rides</Text>
          <View style={{ flex: 1, marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 10 }}>

          {rideList.length == 0 ? <Text style={{ fontSize: 20, color: 'white' }}>Currently No Ride History</Text> :
                <FlatList
                  data={rideList}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                />
              }
          </View>
        </View>
      </LinearGradient>
       )}
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    // marginTop: StatusBar.currentHeight || 20,
  },
});

export default History;