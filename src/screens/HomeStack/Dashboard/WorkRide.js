import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Platform, SafeAreaView, ActivityIndicator, Modal } from 'react-native';
import WorkRideListItem from '../../../component/WorkRideCard'
import LinearGradient from 'react-native-linear-gradient';
import { getScheduledRideList, deleteScheduledRideCall } from '../../../service/Api'
import Loader from '../../../service/Loader'
import { Rating, AirbnbRating } from 'react-native-ratings';


const WorkRide = ({ navigation }) => {
  const [rideList, setRideList] = useState([{ "_id": "60f01748d6a124137c07d85c", "driver": { "__v": 0, "_id": "60e760a1acff369e20a78548", "area": "2", "assignedPassenger": 1, "capacity_occupied": 0, "cell": "03349081615", "confirmOTP": null, "createdAt": "2021-07-08T20:31:29.454Z", "email": "salmanbukhari37@gmail.com", "fullname": "Salman Bukhari", "image": [Array], "lat": "59.441211", "long": "78.511412", "otpTries": 2, "password": "$2b$10$FO/rO8LLzcLK7AgwjIhrnepxcITmiJYC/7ZsSxfBqXha103YyVOuq", "status": true, "thumbImage": [Array], "updatedAt": "2021-07-25T11:39:21.346Z", "vehicle_capacity": "4", "vehicle_model": "Cultus VXL", "vehicle_no": "LEB-4124" }, "dropLocation": "Islamabad International Airport, New Islamabad Airport Road, Islamabad, Pakistan", "droplat": "33.5563738", "droplong": "72.8340429", "passenger": { "__v": 0, "_id": "60efc82b45caec54a441c669", "cell": "123", "confirmOTP": null, "countrycode": "+92", "createdAt": "2021-06-09T12:35:57.535Z", "designation": "Accounts Manager", "fullname": "Anum bhati", "isConfirmed": true, "job_area": "3", "lat": "33.669409", "location": "G-11, Islamabad, Pakistan", "location_code": null, "location_tmp": "G-11, Islamabad, Pakistan", "long": "72.997193", "otpTries": 4, "password": "$2b$10$hY2S5G/nhvMfutkk3xfOle3kEQMhHjr63sisOBLIywFZtL6Fs/2ne", "phone": "+923350520050", "pick_from": null, "staff_no": "1234", "status": true, "token": null, "type": "passenger", "updatedAt": "2021-07-16T15:51:04.436Z" }, "pickDateTime": "2021-07-20T19:00:00.000Z", "pickLocation": "G-11, Islamabad, Pakistan", "picklat": "33.669409", "picklong": "72.997193", "rideStatus": "notStarted" }])
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)

  const isFocused = navigation.isFocused();
  useEffect(() => {
    console.log('Screen Focused', isFocused)
    const willFocusSubscription = navigation.addListener('focus', async () => {
      // const rideChangesSaved = await AsyncStorage.getItem('RideChangesSaved')
      // if (JSON.parse(rideChangesSaved)) {
      getScheduleRide()
      // }
    });
    return willFocusSubscription;
  }, [navigation]);

  const getScheduleRide = () => {
    getScheduledRideList().then((response) => {

      if (response.status === 1) {
        console.log('Ride Data from service', response.data)
        // setRideList(response.data)
      }
      else {
        console.log('response error', response.status)
      }
    }).catch((error) => {
      console.log('error', error)
    })
  }


  const renderItem = ({ item }) => (
    <WorkRideListItem action={() => console.log('Item Selected')} />
  );


  return (

    <SafeAreaView style={{
      flex: 1, backgroundColor: '#38ef7d'
    }}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#38ef7d', '#11998e']}
        style={{ flex: 1 }}
      >

        <View style={styles.container}>
          {/* <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(false)
            }}
          >
            <Rating
  showRating
  onFinishRating={this.ratingCompleted}
  style={{ paddingVertical: 10 }}
/>

          </Modal> */}

          {/* <View style={{marginTop:20}}>
          <WorkRideListItem action={()=>setModalVisible(true)}/>
          </View> */}

          <View style={{ flex: 1, marginLeft: 10, marginRight: 10,arginTop: (Platform.OS === 'ios' ? 50 : 60), marginBottom: 10 }}>
            {rideList.length == 0 ? <Text style={{ fontSize: 20, color: 'white' }}>Currently No Scheduled Rides</Text> :
              <FlatList
                data={rideList}
                renderItem={(item) =>
                  <WorkRideListItem />
                }
              />
            }
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default WorkRide;