import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity , SafeAreaView} from 'react-native';
import GradientButton from '../../common/GradientButton'
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Circle, Overlay } from 'react-native-maps';
import { requestLocationPermission } from '../../common/Permissions'
import Geolocation from '@react-native-community/geolocation'
const { width, height } = Dimensions.get('window')
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const initialPositionRegion = {
  latitude: 33.738045, longitude: 73.084488,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
}
const coordinatesArr = [
  {
    latitude: 33.724377,
    longitude: 73.089558,
  },
  {
    latitude: 33.6961,
    longitude: 73.0491,
  },
  {
    latitude: 33.729943,
    longitude: 73.076314,
  },
]
const PersonalRide = ({ navigation }) => {
  const { initialPosition, setInitialPosition } = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  })
  const [myLatitude, setMyLatitude] = useState(31.5204);
    const [myLongitude, setMyLongitude] = useState(74.3587);
  const { coordinates, setCoordinates } = useState([])

  useEffect(async () => {
  //   console.log('Coordinate', coordinates)

  //   await requestLocationPermission().then(() => {
  //     Geolocation.getCurrentPosition((position) => {
        
  //       setMyLatitude(Number(position.coords.latitude))
  //       setMyLongitude(Number(position.coords.longitude))
       
  //     },
      
  //       (error) => alert(JSON.stringify(error.message)),
  //       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
  //  })
  if (Platform.OS === 'android') {
    console.log('serviceSelected', serviceSelected)
    setTimeout(() => {
        requestLocationPermission();
    }, 1000);
}
else{
    getOneTimeLocation();  
}
 
  }, [])
  const getOneTimeLocation = () => {
    console.log('Getting Location ... ')
    Geolocation.getCurrentPosition(
        //Will give you the current location
        (position) => {
          setMyLatitude(Number(position.coords.latitude))
          setMyLongitude(Number(position.coords.longitude))
        },
        (error) => {
            console.log('error ', error)
        },
        {
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 1000
        },
    );
};
  const requestLocationPermission = async () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 50000,
        // fastInterval: 5000,
    })
        .then((data) => {
        })
        .catch((err) => {
        });
    if (Platform.OS === 'ios') {
        getOneTimeLocation();
    } else {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                getOneTimeLocation();
            } else {
                Alert.alert(
                    "Warning",
                    "you can't proceed next without allowing location permission click ok to allow permission",
                    [
                        {
                            text: "Cancel", onPress: () => {
                                navigation.goBack()
                            }
                        },
                        {
                            text: "OK", onPress: () => {
                                navigation.goBack()
                                openAppSettings()
                            }
                        }

                    ]
                );
                console.log('permission Denied')
            }
        } catch (err) {
            console.warn(err);
        }
    }
};


  return (
    <SafeAreaView  style={{
      flex: 1, backgroundColor:'#38ef7d'
  }}>
    <View style={styles.container}>

      <View style={{
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-around',
        zIndex: 1, elevation: 10, padding: 5, borderRadius: 15, width: '90%', marginTop: 100, backgroundColor: '#ffff'
      }}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', padding: 10, }}>
          <Ionicons name={'ellipse'} size={20} color={'#38ef7d'} />
          <View style={{ height: '42%', width: 2, backgroundColor: 'black' }}></View>
          <Ionicons name={'caret-down'} size={20} color={'black'} />

        </View>
        <View style={{ flexDirection: 'column', width: '85%' }}>
          <GooglePlacesAutocomplete
            placeholder='Current Location'
            fetchDetails={true}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log('PickUp', details.geometry.location, details.formatted_address);
            }}
            query={{
              key: 'AIzaSyAG8XBFKHqkH3iKweO_y3iC6kYvcwdsKxY',
              language: 'en',
            }}
            currentLocation={true}
            currentLocationLabel='Islamabad'
          />
          <View style={{ height: 1, width: '95%', backgroundColor: 'gray', marginRight: 5, marginLeft: 5 }}></View>
          <GooglePlacesAutocomplete
            placeholder='Drop off location'
            fetchDetails={true}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log('Drop_Off', details.geometry.location, details.formatted_address);
            }}
            query={{
              key: 'AIzaSyAG8XBFKHqkH3iKweO_y3iC6kYvcwdsKxY',
              language: 'en',
            }}
          />
        </View>

      </View>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: myLatitude,
          longitude: myLongitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
      }}
      >

        <Circle center={{
                    latitude: myLatitude,
                    longitude: myLongitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
          radius={1000} fillColor={'rgba(200,350,200,1.0)'}
          strokeColor={'rgba(255,255,255'}>
        </Circle>
        <MapView.Marker coordinate={{
                    latitude: myLatitude,
                    longitude: myLongitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
        >
          <Image
            source={require('../../../assets/images/marker.png')}
            style={{ width: 50, height: 50 }}
            title={'Islamabad'}
            resizeMode="contain"
          />
        </MapView.Marker>



        {/* {coordinatesArr.map((coordinate, index) =>
          <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate}>
            <Image
              source={require('../../../assets/images/car_top.png')}
              style={{ width: 60, height: 60 }}
              resizeMode="contain"
            />
          </MapView.Marker>
        )} */}


      </MapView>
      <View style={{ bottom: 30, position: 'absolute', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <GradientButton title={'Next'} width={'90%'} height={60} action={() => navigation.navigate('Booking')}></GradientButton>
      </View>

    </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default PersonalRide;