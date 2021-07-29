import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ActivityIndicator } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import LinearGradient from 'react-native-linear-gradient';
import { verifyOTPCall, verifyResendOTP } from '../../service/Api'
import Loader from '../../service/Loader'
import GradientButton from '../../common/GradientButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { saveToken } from '../../common/Index'
import { useSelector } from 'react-redux'
const VerificationCode = ({ navigation, route }) => {
    const [disableResendBtn, setResendBtnDisable] = useState(true)
    const [timerCount, setTimer] = useState(60);
    const { screenName } = route.params
    const [loading, setLoading] = useState(false);
    const [otp, setOTP] = useState('');
    const phoneNumber = 'xxxxxx'//useSelector(state => state.signInReducer.phone)

    useEffect(() => {
        console.log('Phone got from Reducer', phoneNumber)
        timerFunc()
    }, [navigation]);
    const timerFunc = () => {
        setResendBtnDisable(true)
        setTimer(60);
        let interval = setInterval(() => {
            setTimer((lastTimerCount) => {
                lastTimerCount <= 1 && clearInterval(interval);
                return lastTimerCount - 1;
            });
        }, 1000); //each count lasts for a second
        //cleanup the interval on complete

        return () => {
            clearInterval(interval)
        }
    };

    const verifyOTPCode = async(code, type) => {
        setLoading(true)
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        console.log('fcmToken on Verification call', fcmToken)
        if (type == 'resend') {
            timerFunc()
        }
        var data = {}
        if (type == 'verify') {
            var data = {

                phone: '03349081615',
                otp: code,
                deviceToken:fcmToken

            }
        } else {
            data = {

                phone: '03349081615'
            }
        }

        console.log('service call data', data)
        verifyResendOTP(data, type).then(async (response) => {
            if (response.status === 1) {
                setLoading(false)
                if (type == 'verify') {
                    saveToken(response.data.token)
                }
                if (type == 'verify') {
                    if (screenName == 'forget') {
                        navigation.navigate('ResetPassword')
                    } else {
                        navigation.navigate('HomeStack')
                    }
                }
            }
            else {
                alert('Invalid OTP')
                console.log('response error', response.status)
            }

        }).catch((error) => {
            alert('Invalid OTP')
            console.log('error', error)
            setLoading(false)

        })

    }


    return (
        <SafeAreaView style={{
            flex: 1, backgroundColor: '#38ef7d'
        }}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#38ef7d', '#11998e']}
                style={{
                    flex: 1,
                }}
            >
                <View style={styles.container}>
                    <View style={{ alignSelf: 'center', flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>

                        <Text style={{ width: 200, textAlign: 'center', fontSize: 16 }}>A code has been sent to {phoneNumber} via sms</Text>
                        <OTPInputView
                            style={{ width: '60%', height: 130 }}
                            editable={true}
                            pinCount={4}
                            //  clearInputs={true}
                            autoFocusOnLoad
                            keyboardType='number-pad'
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlgihtStyle={styles.underlineStyleHighLighted}
                            placeholderTextColor='black'
                            onCodeFilled={(code => {
                                // navigation.avigate('ResetPassword')
                                // verifyOTPCode(code, 'verify')
                                setOTP(code)
                                // navigation.navigate('Home')
                            })}

                        />
                        {loading == true ?
                            <ActivityIndicator size="large" color="gray" />
                            :
                            <GradientButton height={60} width={'80%'} title={'Send'} margin={5} action={() => verifyOTPCode(otp, 'verify')} />
                        }

                        {timerCount > 0 ? (
                            <Text style={{ fontSize: 15, marginTop: 20 }}>{timerCount}</Text>
                        ) : (null)}
                        <TouchableOpacity
                            style={{ marginTop: 20 }}
                            disabled={timerCount < 1 ? false : true} onPress={() =>
                                verifyOTPCode('', 'resend')
                            }>
                            <Text style={{ fontSize: 15, color: timerCount < 1 ? 'black' : 'gray' }}>Resend OTP</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    underlineStyleBase: {
        width: 50,
        height: 60,
        borderWidth: 1,
        borderBottomWidth: 1,
        color: 'black',
        fontSize: 25,
    },

    underlineStyleHighLighted: {
        borderColor: "white",

    },
});

export default VerificationCode;