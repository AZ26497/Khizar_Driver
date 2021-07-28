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
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polyline, Marker, AnimatedRegion } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapViewDirections from 'react-native-maps-directions';
import RideSummaryAndDetail from '../../component/RideSummaryAndDetail';
import { getScheduleRideDetails } from '../service/Api';
const GOOGLE_MAPS_APIKEY = 'AIzaSyAG8XBFKHqkH3iKweO_y3iC6kYvcwdsKxY';
import SwipeUpDown from 'react-native-swipe-up-down';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 33.738045;
const LONGITUDE = 73.084488;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapDetails = ({ navigation, route }) => {
  const rideDetails = route.params.rideDetails
  const [swipeUp, setSwipeUp] = useState(false)
  const [prevLat, setPrevLat] = useState(0)
  const [prevLng, setPrevLng] = useState(0)
  const [estimatedTime, setEstimatedTime] = useState('')
  const [distanceTravelled, setDistanceTravelled] = useState(0)
  const [routeCoordinates, setRouteCoordinates] = useState([])
  const [region, setRegion] = useState(
    {
      latitude:73.0396641,
      longitude:33.7201055,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }
  )
  const origin = { latitude: 33.7201055, longitude: 73.0396641 };
  const destination = {
    latitude: 33.6967808,
    longitude: 73.0458092
  };
  // const [coordinates, setCoordinates] = useState(new AnimatedRegion(origin));

  const mapRef = useRef()

  useEffect(() => {
    console.log('Ride Details', rideDetails)
    getEstimatedTimeOfArrival();
    // const duration = 500

    // if (coordinates !== destination) {
    //   if (Platform.OS === 'android') {
    //     if (marker) {
    //       marker.animateMarkerToCoordinate(
    //         destination,
    //         duration
    //       );
    //     }
    //   } else {
    //     coordinate.timing({
    //       destination,
    //       duration
    //     }).start();
    //   }
    // }
    // Geolocation.watchPosition(
    //   position => {
    //     const { latitude, longitude } = position.coords;
    //     const newCoordinate = {
    //       latitude,
    //       longitude
    //     };
    //     if (Platform.OS === "android") {
    //       if (this.marker) {
    //         this.marker._component.animateMarkerToCoordinate(
    //           newCoordinate,
    //           500
    //         );
    //       }
    //     } else {
    //       coordinate.timing(newCoordinate).start();
    //     }

    //     setRouteCoordinates(newCoordinate)
    //     setPrevLat(newCoordinate.latitude)
    //     setPrevLng(newCoordinate.longitude)

    //   },
    //   error => console.log(error),
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    // );
  }, []);


  async function getEstimatedTimeOfArrival() {

    // get location of base
    const BaseLocation = rideDetails.driver.location;

    // get locations of targets
    const TargetLocation = rideDetails.pickLocation;

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
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#38ef7d',
      }}>
      <View style={styles.container}>
        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            zIndex: 1,
            elevation: 10,
            padding: 5,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            height: 40,
            width: '90%',
            marginTop: 80,
            backgroundColor: '#ffff',
          }}>
          <Ionicons
            style={{ marginLeft: 10 }}
            name={'ellipse'}
            size={15}
            color={'#38ef7d'}
          />
          <Text style={{ fontSize: 15, marginLeft: 5 }}>
            {'Your driver is arrived'}
          </Text>
        </View>
        <MapView
          ref={mapRef}
          initialRegion={region}
          style={StyleSheet.absoluteFill}
          onRegionChange={region => {
            setRegion({region});
        }}
          >
          {/* <Marker.Animated
            ref={marker => { this.marker = marker }}
            coordinate={coordinate}
          >
            <Image
              source={require('../../assets/images/car_top.png')}
              style={{ width: 50, height: 50 }}
              title={'Islamabad'}
              resizeMode="contain"
            />
          </Marker.Animated> */}
          {/* {(coordinates.length >= 2) && (
            <MapViewDirections
              origin={coordinates[0]}
              destination={coordinates[coordinates.length - 1]}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={6}
              strokeColor="#38ef7d"
              optimizeWaypoints={true}
            // onStart={(params) => {
            //   console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            // }}
            />
          )} */}
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

              mapRef.current.fitToCoordinates(result.coordinates, {
             
              })
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
            <View style={{ height: '100%', width: 400, backgroundColor: '#38ef7d', alignItems: 'center', justifyContent: 'center' }}>
              <MaterialIcons
                style={{ marginLeft: 10, marginBottom: 12 }}
                name={'keyboard-arrow-up'}
                size={30}
              />
            </View>
          } // Pass props component when collapsed
          itemFull={<RideSummaryAndDetail navigation={navigation} rideInfo={rideDetails} />} // Pass props component when show full
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
