import React, { Component, useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  Platform,
  SafeAreaView,
  Linking,
  Alert
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polyline, Marker, AnimatedRegion } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapViewDirections from 'react-native-maps-directions';
import RideSummaryAndDetail from '../../component/RideSummaryAndDetail';
import database from '@react-native-firebase/database';
import { getScheduleRideDetails, changeRideStatusCall } from '../../service/Api';
import SwipeUpDown from 'react-native-swipe-up-down';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import GetLocation from 'react-native-get-location';
import GradientButton from '../../common/GradientButton'
import Loader from '../../service/Loader';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 33.738045;
const LONGITUDE = 73.084488;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const DataBaseRef = database()
const GOOGLE_MAPS_APIKEY = 'AIzaSyAG8XBFKHqkH3iKweO_y3iC6kYvcwdsKxY';

const MapDetails = ({ navigation, route }) => {
  const rideDetails = route.params.rideDetails
  const [swipeUp, setSwipeUp] = useState(false)
  const [loading, setLoading] = useState(false)

  const [prevLat, setPrevLat] = useState(0)
  const [prevLng, setPrevLng] = useState(0)
  const [estimatedTime, setEstimatedTime] = useState('')
  const [distanceDuration, setDistanceDuration] = useState(0)
  const [routeCoordinates, setRouteCoordinates] = useState([])
  const [region, setRegion] = useState(
    {
      latitude: 73.0396641,
      longitude: 33.7201055,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }
  )
  const [s, setS] = useState(33.6844);
  const [statusBtnText, setStatusBtnText] = useState('Arrived');
  const [myLatitude, setMyLatitude] = useState(region.latitude);
  const [myLongitude, setMyLongitude] = useState(region.longitude);
  const [myDirection, setMyDirection] = useState({ latitude: 0.000000, longitude: 0.000000, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
  const [otherDirection, setOtherDirection] = useState(region);
  const origin = { latitude: 33.7201055, longitude: 73.0396641,    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA, };
  const destination = {
    latitude: 33.6967808,
    longitude: 73.0458092,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  // const [coordinates, setCoordinates] = useState(new AnimatedRegion(origin));

  const mapRef = useRef(null)
  const UserTableRef = DataBaseRef.ref('/Ride_tracking').child(rideDetails._id);

  useEffect(() => {
    console.log('Ride Details on Map View', rideDetails)
    getEstimatedTimeOfArrival();
    onLatLongValueChanged()
    GetLocationftn()
    setMyDirection({ ...region, latitude: Number(region.latitude), longitude: Number(region.longitude) })
    setOtherDirection({ ...destination, latitude: Number(destination.latitude), longitude: Number(destination.longitude) })
  }, []);

  const GetLocationftn = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    }).then(async (location) => {
      updateLocationAgainstAppointment(location.latitude, location.longitude)
      setMyDirection({ ...region, latitude: location.latitude, longitude: location.longitude })
    })
  }
  const updateLocationAgainstAppointment = (lat, lng) => {
    // console.log('__)_)', props.route.params?.appointmentDetail.id)
    UserTableRef.set({
      folderID: rideDetails._id,
      passengerId: rideDetails.passenger._id,
      driverLat: parseFloat(lat),
      driverLong: parseFloat(lng)
    })
      .then(() => {
        console.log('Data set.')
      });
  }

  const callRideStatus = () => {
    setLoading(true)
    const folderID = rideDetails._id
    var data = {
      status: statusBtnText.toLowerCase(),
      passengerId: rideDetails.passenger._id,
      pickLocation: rideDetails.pickLocation,
      dropLocation: rideDetails.dropLocation,
      droplat: rideDetails.droplat,
      droplong: rideDetails.droplong,
      picklat: rideDetails.picklat,
      picklong: rideDetails.picklong,
      distanceDuration: distanceDuration
    }
    console.log('Change Ride Status Call Data', data)
    console.log('Change Ride Status Call FolderID', folderID)

    changeRideStatusCall(folderID, data).then((response) => {

      if (response.status === 1) {
        setLoading(false)

        if (statusBtnText.toLowerCase() == 'end') {
          navigation.navigate('CollectCash', { fareAmount: response.data.fareAmount, rideDetails: rideDetails})
        }
        else {
          if (statusBtnText.toLowerCase() == 'arrived') {
            setStatusBtnText('Picked')

          }
          else if (statusBtnText.toLowerCase() == 'picked') {
            setStatusBtnText('End')
          }
        }
      }
      else {
        console.log('response error', response.status)
      }
    }).catch((error) => {
      console.log('error', error)
    })
  }


  const buildInAppNavigation = () => {
    console.log('buildInAppNavigation')
    Alert.alert(
      "Warning",
      'Do you want to redirect to google app for direction',
      [{
        text: "Cancel",
        onPress: () => { },
        style: "cancel",
      },
      {
        text: "OK", onPress: () => {
          seeOnMap()
        }
      }
      ]
    );
  }

  async function getEstimatedTimeOfArrival() {

    // get location of base
    const BaseLocation = rideDetails.pickLocation;

    // get locations of targets
    const TargetLocation = rideDetails.dropLocation;

    // prepare final API call
    let ApiURL = "https://maps.googleapis.com/maps/api/distancematrix/json?";
    let params = `origins=${BaseLocation}&destinations=${TargetLocation}&key=${GOOGLE_MAPS_APIKEY}`;
    let finalApiURL = `${ApiURL}${encodeURI(params)}`;

    console.log("finalApiURL:\n");
    console.log(finalApiURL);

    // get duration/distance from base to each target
    try {
      let response = await fetch(finalApiURL);
      let responseJson = await response.json();
      console.log("responseJson To Get Time and Distance:\n");
      console.log(responseJson.rows[0].elements[0].duration.text);
      setEstimatedTime(responseJson.rows[0].elements[0].duration.text)
      setDistanceDuration(responseJson.rows[0].elements[0].distance.text.split(' ')[0])
    } catch (error) {
      console.error(error);
    }
  }
  const onLatLongValueChanged = () => {

    if (mapRef.current && mapRef.current.animateCamera) {
      mapRef.current.animateCamera({ center: region, pitch: 2, heading: 20, altitude: 200, zoom: 5 }, 1000)
    }
    setOtherDirection({ latitude: Number(region.latitude), longitude: Number(region.longitude), latitudeDelta: 0.0922, longitudeDelta: 0.0421, })

  };

  const seeOnMap = () => {
    const locationStart = `${Number(73.0396641)},${Number(73.0396641)}`
    const scheme = Platform.select({ ios: `maps:${locationStart}?q=`, android: `geo:${locationStart}?q=` });
    const latLng = `${Number(73.0396641)},${Number(73.0396641)}`;
    const label = 'G11 Markaz';
    const url = Platform.select({
      ios: `${scheme}${label}&ll=${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#38ef7d',
      }}>
      <View style={styles.container}>
        <View style={{
          position: 'absolute',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 1,
          padding: 5,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          height: 60,
          width: '90%',
          marginTop: 80,
          // backgroundColor: '#ffff',
        }}>
          <GradientButton height={50} title={'Use GoogleMap'} width={'45%'} style={{ alignSelf: 'flex-end' }} action={() => buildInAppNavigation()} />
          {loading ? <Loader/>:
          <GradientButton height={50} title={statusBtnText} width={'45%'} style={{ alignSelf: 'center' }} action={() => callRideStatus()} />
}
        </View>
        <MapView
          ref={mapRef}
          initialRegion={origin}
          style={StyleSheet.absoluteFill}
          onRegionChange={region => {
            setRegion({ region });
          }}
        >

          <MapView.Marker
            coordinate={{
              latitude: 33.7201055, longitude: 73.0396641
            }}
            title={"title"}
            description={"description"}
          />
          <MapView.Marker
            coordinate={{
              latitude: 33.6967808,
              longitude: 73.0458092
            }}
            title={"title"}
            description={"description"}
          >
            <Image
              source={require('../../../assets/images/car_top.png')}
              style={{ width: 50, height: 50 }}
              title={'Islamabad'}
              resizeMode="contain"
            />
          </MapView.Marker>

          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={6}
            strokeColor="#38ef7d"
            optimizeWaypoints={true}
            timePrecision={"now"}
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}

            onReady={result => {
              console.log('Distance in KM ', result.distance)
              console.log('Duration in Min', result.duration)
              //{ distance: Number, duration: Number, coordinates: [], fare: Object, waypointOrder: [[]] }	Callback that is called when the routing has succesfully finished. Note: distance returned in kilometers and duration in minutes.
              //   if (distance <= 500) {
              //     sendArriveNotification()
              // }
            }}

            onError={(errorMessage) =>
              console.log('Error', errorMessage)
            }
          />
          {/* <MapViewDirections
            strokeWidth={6}
            strokeColor="#38ef7d"
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            optimizeWaypoints={true}
          /> */}
        </MapView>
        <SwipeUpDown
          swipeHeight={60}
          itemMini={
            <View style={{ height: '100%', width: 420, backgroundColor: '#38ef7d', alignItems: 'center', justifyContent: 'center' }}>
              <MaterialIcons
                style={{ marginLeft: 10, marginBottom: 12 }}
                name={'keyboard-arrow-up'}
                size={30}
              />
            </View>
          } // Pass props component when collapsed
          itemFull={<RideSummaryAndDetail navigation={navigation} rideInfo={rideDetails} actionforMap={() => buildInAppNavigation()} actionOnArrived={() => changeRideStatusCall()} statusBtnText={statusBtnText} />} // Pass props component when show full
          disablePressToShow={false} // Press item mini to show full
          style={{ backgroundColor: 'background:rgba(255,255,255, 0.3)', justifyContent: 'center', alignItems: 'center' }} // style for swipe
          animation="easeInEaseOut"
        />
      </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapDetails;
