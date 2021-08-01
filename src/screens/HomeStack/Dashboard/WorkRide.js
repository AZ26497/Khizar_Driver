import React, { Component, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import WorkRideListItem from '../../../component/WorkRideCard';
import {getScheduledRideList} from '../../../service/Api'
import Loader from '../../../service/Loader'

const WorkRide = ({navigation}) => {
  const [rideList, setRideList] = useState([{"_id": "610635fbed9a1428e62afa2f", "driver": {"__v": 0, "_id": "60e760a1acff369e20a78548", "area": 2, "assignedPassenger": 1, "capacity_occupied": 9, "cell": "03349081615", "confirmOTP": null, "createdAt": "2021-07-08T20:31:29.454Z", "deviceToken": "epXFlgzHTIWMiwPF4Hg0Rm:APA91bE331ENlisalQotkaneLdT2lE7TsJWiW1p1xp4RC1cYV74nuLHRWnZ6s5BHadifzZ6w7rVa6lsLTt8h_faLG-AVYLhOIJxmXvIiiJ0MYMyfXddy1e8jsg1OGm8dgj_0eT_w1aM_", "email": "salmanbukhari37@gmail.com", "fullname": "Salman Bukhari", "image": [Array], "lat": "59.441211", "long": "78.511412", "otpTries": 2, "password": "$2b$10$FO/rO8LLzcLK7AgwjIhrnepxcITmiJYC/7ZsSxfBqXha103YyVOuq", "status": true, "thumbImage": [Array], "updatedAt": "2021-08-01T14:32:28.803Z", "vehicle_capacity": 14, "vehicle_model": "Cultus VXL", "vehicle_no": "LEB-4124"}, "dropLocation": "Islamabad International Airport, New Islamabad Airport Road, Islamabad, Pakistan", "droplat": "33.5563738", "droplong": "72.8340429", "passenger": {"__v": 0, "_id": "60efc82b45caec54a441c669", "cell": "123", "confirmOTP": null, "countrycode": "+92", "createdAt": "2021-06-09T12:35:57.535Z", "designation": "BO", "deviceToken": "d7VvtS_PSsGCR2BZBpHDS6:APA91bEJ-E_mnoFpoO3L2coX0C-no14dXkJeDAtaPftR22lh3zYB2xY6_rfIMEuHLisDKHF-ekVgWZGeY671oK2-YWybcRHLnIJD3bnlmw8d-FzPmqunRhmopu5dvGAn3zeVrb3m1PKO", "fullname": "Anum bhati", "isConfirmed": true, "job_area": "cabin", "lat": "33.669409", "location": "G-8, Islamabad, Pakistan", "location_code": 2, "location_tmp": "G-8, Islamabad, Pakistan", "long": "72.997193", "otpTries": 4, "password": "$2b$10$hY2S5G/nhvMfutkk3xfOle3kEQMhHjr63sisOBLIywFZtL6Fs/2ne", "phone": "+923350520050", "pick_from": null, "staff_no": "1234", "status": true, "token": null, "type": "passenger", "updatedAt": "2021-07-31T10:37:33.960Z"}, "pickLocation": "G-8, Islamabad, Pakistan", "picklat": "33.669409", "picklong": "72.997193", "rideStatus": "notStarted"}, {"_id": "610635fbed9a1428e62afa2f", "driver": {"__v": 0, "_id": "60e760a1acff369e20a78548", "area": 2, "assignedPassenger": 1, "capacity_occupied": 9, "cell": "03349081615", "confirmOTP": null, "createdAt": "2021-07-08T20:31:29.454Z", "deviceToken": "epXFlgzHTIWMiwPF4Hg0Rm:APA91bE331ENlisalQotkaneLdT2lE7TsJWiW1p1xp4RC1cYV74nuLHRWnZ6s5BHadifzZ6w7rVa6lsLTt8h_faLG-AVYLhOIJxmXvIiiJ0MYMyfXddy1e8jsg1OGm8dgj_0eT_w1aM_", "email": "salmanbukhari37@gmail.com", "fullname": "Salman Bukhari", "image": [Array], "lat": "59.441211", "long": "78.511412", "otpTries": 2, "password": "$2b$10$FO/rO8LLzcLK7AgwjIhrnepxcITmiJYC/7ZsSxfBqXha103YyVOuq", "status": true, "thumbImage": [Array], "updatedAt": "2021-08-01T14:32:28.803Z", "vehicle_capacity": 14, "vehicle_model": "Cultus VXL", "vehicle_no": "LEB-4124"}, "dropLocation": "Islamabad International Airport, New Islamabad Airport Road, Islamabad, Pakistan", "droplat": "33.5563738", "droplong": "72.8340429", "passenger": {"__v": 0, "_id": "60efc82b45caec54a441c669", "cell": "123", "confirmOTP": null, "countrycode": "+92", "createdAt": "2021-06-09T12:35:57.535Z", "designation": "BO", "deviceToken": "d7VvtS_PSsGCR2BZBpHDS6:APA91bEJ-E_mnoFpoO3L2coX0C-no14dXkJeDAtaPftR22lh3zYB2xY6_rfIMEuHLisDKHF-ekVgWZGeY671oK2-YWybcRHLnIJD3bnlmw8d-FzPmqunRhmopu5dvGAn3zeVrb3m1PKO", "fullname": "Anum bhati", "isConfirmed": true, "job_area": "cabin", "lat": "33.669409", "location": "G-8, Islamabad, Pakistan", "location_code": 2, "location_tmp": "G-8, Islamabad, Pakistan", "long": "72.997193", "otpTries": 4, "password": "$2b$10$hY2S5G/nhvMfutkk3xfOle3kEQMhHjr63sisOBLIywFZtL6Fs/2ne", "phone": "+923350520050", "pick_from": null, "staff_no": "1234", "status": true, "token": null, "type": "passenger", "updatedAt": "2021-07-31T10:37:33.960Z"}, "pickLocation": "G-8, Islamabad, Pakistan", "picklat": "33.669409", "picklong": "72.997193", "rideStatus": "notStarted"}])
  const [loading, setLoading] = useState(false)
 
  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      // setLoading(true)
      getList()
    });
    return willFocusSubscription;
  }, [navigation]);
  const getList = () => {
    getScheduledRideList().then((response) => {
      setLoading(false)

      if (response.status === 1) {
        console.log('Ride Data', response.data)
        // setRideList({"_id": "610635fbed9a1428e62afa2f", "driver": {"__v": 0, "_id": "60e760a1acff369e20a78548", "area": 2, "assignedPassenger": 1, "capacity_occupied": 9, "cell": "03349081615", "confirmOTP": null, "createdAt": "2021-07-08T20:31:29.454Z", "deviceToken": "epXFlgzHTIWMiwPF4Hg0Rm:APA91bE331ENlisalQotkaneLdT2lE7TsJWiW1p1xp4RC1cYV74nuLHRWnZ6s5BHadifzZ6w7rVa6lsLTt8h_faLG-AVYLhOIJxmXvIiiJ0MYMyfXddy1e8jsg1OGm8dgj_0eT_w1aM_", "email": "salmanbukhari37@gmail.com", "fullname": "Salman Bukhari", "image": [Array], "lat": "59.441211", "long": "78.511412", "otpTries": 2, "password": "$2b$10$FO/rO8LLzcLK7AgwjIhrnepxcITmiJYC/7ZsSxfBqXha103YyVOuq", "status": true, "thumbImage": [Array], "updatedAt": "2021-08-01T14:32:28.803Z", "vehicle_capacity": 14, "vehicle_model": "Cultus VXL", "vehicle_no": "LEB-4124"}, "dropLocation": "Islamabad International Airport, New Islamabad Airport Road, Islamabad, Pakistan", "droplat": "33.5563738", "droplong": "72.8340429", "passenger": {"__v": 0, "_id": "60efc82b45caec54a441c669", "cell": "123", "confirmOTP": null, "countrycode": "+92", "createdAt": "2021-06-09T12:35:57.535Z", "designation": "BO", "deviceToken": "d7VvtS_PSsGCR2BZBpHDS6:APA91bEJ-E_mnoFpoO3L2coX0C-no14dXkJeDAtaPftR22lh3zYB2xY6_rfIMEuHLisDKHF-ekVgWZGeY671oK2-YWybcRHLnIJD3bnlmw8d-FzPmqunRhmopu5dvGAn3zeVrb3m1PKO", "fullname": "Anum bhati", "isConfirmed": true, "job_area": "cabin", "lat": "33.669409", "location": "G-8, Islamabad, Pakistan", "location_code": 2, "location_tmp": "G-8, Islamabad, Pakistan", "long": "72.997193", "otpTries": 4, "password": "$2b$10$hY2S5G/nhvMfutkk3xfOle3kEQMhHjr63sisOBLIywFZtL6Fs/2ne", "phone": "+923350520050", "pick_from": null, "staff_no": "1234", "status": true, "token": null, "type": "passenger", "updatedAt": "2021-07-31T10:37:33.960Z"}, "pickLocation": "G-8, Islamabad, Pakistan", "picklat": "33.669409", "picklong": "72.997193", "rideStatus": "notStarted"}, {"_id": "610635fbed9a1428e62afa2f", "driver": {"__v": 0, "_id": "60e760a1acff369e20a78548", "area": 2, "assignedPassenger": 1, "capacity_occupied": 9, "cell": "03349081615", "confirmOTP": null, "createdAt": "2021-07-08T20:31:29.454Z", "deviceToken": "epXFlgzHTIWMiwPF4Hg0Rm:APA91bE331ENlisalQotkaneLdT2lE7TsJWiW1p1xp4RC1cYV74nuLHRWnZ6s5BHadifzZ6w7rVa6lsLTt8h_faLG-AVYLhOIJxmXvIiiJ0MYMyfXddy1e8jsg1OGm8dgj_0eT_w1aM_", "email": "salmanbukhari37@gmail.com", "fullname": "Salman Bukhari", "image": [Array], "lat": "59.441211", "long": "78.511412", "otpTries": 2, "password": "$2b$10$FO/rO8LLzcLK7AgwjIhrnepxcITmiJYC/7ZsSxfBqXha103YyVOuq", "status": true, "thumbImage": [Array], "updatedAt": "2021-08-01T14:32:28.803Z", "vehicle_capacity": 14, "vehicle_model": "Cultus VXL", "vehicle_no": "LEB-4124"}, "dropLocation": "Islamabad International Airport, New Islamabad Airport Road, Islamabad, Pakistan", "droplat": "33.5563738", "droplong": "72.8340429", "passenger": {"__v": 0, "_id": "60efc82b45caec54a441c669", "cell": "123", "confirmOTP": null, "countrycode": "+92", "createdAt": "2021-06-09T12:35:57.535Z", "designation": "BO", "deviceToken": "d7VvtS_PSsGCR2BZBpHDS6:APA91bEJ-E_mnoFpoO3L2coX0C-no14dXkJeDAtaPftR22lh3zYB2xY6_rfIMEuHLisDKHF-ekVgWZGeY671oK2-YWybcRHLnIJD3bnlmw8d-FzPmqunRhmopu5dvGAn3zeVrb3m1PKO", "fullname": "Anum bhati", "isConfirmed": true, "job_area": "cabin", "lat": "33.669409", "location": "G-8, Islamabad, Pakistan", "location_code": 2, "location_tmp": "G-8, Islamabad, Pakistan", "long": "72.997193", "otpTries": 4, "password": "$2b$10$hY2S5G/nhvMfutkk3xfOle3kEQMhHjr63sisOBLIywFZtL6Fs/2ne", "phone": "+923350520050", "pick_from": null, "staff_no": "1234", "status": true, "token": null, "type": "passenger", "updatedAt": "2021-07-31T10:37:33.960Z"}, "pickLocation": "G-8, Islamabad, Pakistan", "picklat": "33.669409", "picklong": "72.997193", "rideStatus": "notStarted"})
        console.log('List After Call' , rideList)
      }
      else {
        alert(response.status)
      }
    }).catch((error) => {
      alert(error)
    })
  }
  const renderItem = ({ item }) => (
    <WorkRideListItem rideDetails={item} action={() => navigation.navigate('MapDetail', { rideDetails: item })}/>  );
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
        <View style={{ flex: 1, marginLeft: 10, marginRight: 10, marginTop: (Platform.OS === 'ios' ? 50 : 60), marginBottom: 20, alignItems: 'center', justifyContent: 'center' }}>
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

export default WorkRide;