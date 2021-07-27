import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import GradientButton from '../../common/GradientButton';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { requestLogin } from '../../service/Api';
import Loader from '../../service/Loader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

//changes
const SignIn = ({ navigation, route }) => {
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [phoneNumErrorMsg, setPhoneNumErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [phoneRegix, setPhoneRegix] = useState('');
  const screenName = route.params;

  showHidePassword = () => {
    console.log('Called on Icon Tap');
    setShowPassword(!showPassword);
  };

  function mobileNumberValidate(text) {
    const reg = /^[0-9]{10}$/; ////^0|08[0-9]{9,}$/;///^[0]?[789]\d{9}$/;
    setPhoneRegix(reg);
    if (reg.test(text) === false) {
      setPhoneNumErrorMsg('Invalid phone number');
      setPhoneNumber(text);
    } else {
      setPhoneNumErrorMsg('');
      setPhoneNumber(text);
    }
  }

  loginApiCall = () => {
    if (screenName == 'reset') {
      navigation.navigate('Home');
    } else {
      setLoading(true);
      let countryCode = '03349081615';
      const data = {
        phone: countryCode,
        password: '12345',
      };
      console.log('API Data', data);

      requestLogin(data)
        .then(response => {
          if (response.status === 1) {
            setLoading(false);
            navigation.navigate('Verification',{screenName:'SignIn'});
          } else {
            setLoading(false);
            alert('Invalid phone number and password');
            console.log('response error', response.status);
          }
        })
        .catch(error => {
          setLoading(false);
          alert('Invalid phone number and password');
          console.log('error', error);
        });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#38ef7d'

      }}>
      <LinearGradient
        colors={['#38ef7d', '#11998e']}
        style={{
          height: '100%',
          alignItems: 'center',
        }}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: '100%', height: '100%', }}
          contentContainerStyle={{ alignItems: 'center' }}

        >

          <Text
            style={{
              marginTop: StatusBar.currentHeight || 40,
              fontWeight: 'bold',
              color: 'white',
              fontSize: 25,
              alignSelf: 'center',
            }}>
            Sign In
          </Text>

          <Image
            source={require('../../../assets/images/signIn.png')}
            style={{ height: 200, width: '80%', marginTop: 20 }}
          />

          <View style={styles.container}>
            <View style={styles.textFieldCont}>
              <Text
                style={{
                  marginBottom: 5,
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: 20,
                }}>
                Phone Number
              </Text>
              <View style={styles.passwordContainer}>
                <Text style={{ marginLeft: 5, borderRadius:5, borderWidth:1, borderColor:'lightgray', width:'10%', textAlign:'center'}}>+92</Text>
                <TextInput
                  style={[styles.input, { width: '88%'}]}
                  value={phoneNumber}
                  keyboardType="numeric"
                  onChangeText={text => mobileNumberValidate(text)}
                />


              </View>
              {phoneNumErrorMsg != '' && (
                <Text style={{ color: 'red', fontSize: 16, textAlign: 'right' }}>
                  {phoneNumErrorMsg}
                </Text>
              )}
            </View>
            <View style={styles.textFieldCont}>
              <Text
                style={{
                  marginBottom: 5,
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: 20,
                }}>
                Password
              </Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, { width: '90%' }]}
                  value={password}
                  keyboardType="numeric"
                  secureTextEntry={showPassword}
                  onChangeText={text => setPassword(text)}
                />
                <Icon
                  name={
                    showPassword == true ? 'eye-off-outline' : 'eye-outline'
                  }
                  color="#000"
                  size={20}
                  style={{ marginRight: 15 }}
                  onPress={() => this.showHidePassword()}
                />
              </View>
              <TouchableOpacity
                style={{ alignSelf: 'flex-end', marginTop: 10 }}
                onPress={() => navigation.navigate('ForgetPassword')}>
                <Text style={{ color: 'red', fontSize: 15, fontWeight: 'bold' }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
            {loading == true ? (
              <Loader />
            ) : (
              <GradientButton
                height={60}
                width={'90%'}
                title={'Sign In'}
                margin={5}
                action={() => loginApiCall()}
              />
            )}
          </View>
        </KeyboardAwareScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 310,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  textFieldCont: {
    // alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '90%',
    margin: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    borderColor: '#000',
    backgroundColor: 'white',
    borderRadius: 15,
    width: '100%',
    height:50,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  inputStyle: {
    flex: 1,
  },
  input: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
    color: '#424242',
    width: '100%',
    borderRadius: 15,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#38ef7d',
    borderRadius: 10,
  },
});

export default SignIn;
