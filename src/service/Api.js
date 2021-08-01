import axios from "axios";
import {getToken} from '../common/Index'

const BASE_URL = 'http://162.0.236.163:8000' //service URL

export const requestLogin = (data) => {
    return new Promise((resolve, reject) => {
        var qs = require('qs');
        var data1 = qs.stringify(
            data
        );
        axios.post((BASE_URL + '/driver/login'),
            data1, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },

        }).then(response => {
            console.log('API', 'request Login status', response);
            resolve(response.data);
        }).catch(error => {
            console.log('API', 'request Login error', error);
            reject(error);
        });
    });
}

export const verifyResendOTP = (data, callType) => {
    return new Promise((resolve, reject) => {
        var qs = require('qs');
        var data1 = qs.stringify(
            data
        );
        const methodName = (callType === 'verify' ? '/driver/verify-otp' : '/driver/resend-verify-otp')
        axios.post((BASE_URL + methodName),
            data1, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },

        }).then(response => {
            console.log('API', 'verify/Resend OTP status', response);
            resolve(response.data);
        }).catch(error => {
            console.log('API', 'verify/Resend OTP error', error);
            reject(error);
        });
    });
}


export const sendOTPCall = (data) => {
    return new Promise((resolve, reject) => {
        var qs = require('qs');
        var data1 = qs.stringify(
            data
        );
        axios.post((BASE_URL + '/driver/forgot'),
            data1, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).then(response => {
            console.log('API', 'send OTP status', response);
            resolve(response.data);
        }).catch(error => {
            console.log('API', 'send OTP error', error);
            reject(error);
        });
    });
}



export const resetPasswordCall = (data) => {
    return new Promise((resolve, reject) => {
        var qs = require('qs');
        var data1 = qs.stringify(
            data
        );
        axios.post((BASE_URL + '/driver/reset'),
            data1, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).then(response => {
            console.log('API', 'Reset Password status', response);
            resolve(response.data);
        }).catch(error => {
            console.log('API', 'Reset Password error', error);
            reject(error);
        });
    });
}

export const getScheduledRideList = async () => {
    console.log('Get List')
    const AUTH_TOKEN = await getToken()
    const newOne = 'Bearer '+JSON.parse(AUTH_TOKEN)
    console.log("Token of api calling",newOne);
    return new Promise((resolve, reject) => {
        var qs = require('qs');
        axios.get((BASE_URL+ '/driver/schedule-list'), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': newOne,
            },
        }).then(response => {
            // console.log('API', 'Get Scheduled Ride list ', response.data.data);
            resolve(response.data);
        }).catch(error => {
            console.log('API', 'Get Scheduled Ride list error', error);
            reject(error);
        });
    });
}

export const getScheduleRideDetails = async (itemID) => {
    console.log('Get List')
    const AUTH_TOKEN = await getToken()
    const newOne = 'Bearer '+JSON.parse(AUTH_TOKEN)
    console.log("Token of api calling",newOne);
    return new Promise((resolve, reject) => {
        var qs = require('qs');
        axios.get(('http://162.0.236.163:8000/schedule/'+itemID), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': newOne,
            },
        }).then(response => {
            console.log('API', 'SCHEDULED RIDE DETAILS RESPONSE', response);
            resolve(response.data);
        }).catch(error => {
            console.log('API', 'SCHEDULED RIDE DETAILS Error', error);
            reject(error);
        });
    });
}


export const getCompletedRideList = async (itemID,data) => {
    const AUTH_TOKEN = await getToken()
    const newOne = 'Bearer '+JSON.parse(AUTH_TOKEN)
    return new Promise((resolve, reject) => {
        axios.get((BASE_URL+'/driver/completed-list'), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': newOne,
            },
        }).then(response => {
            console.log('API', 'Completed DETAILS RESPONSE', response);
            resolve(response.data);
        }).catch(error => {
            console.log('API', 'Completed RIDE DETAILS Error', error);
            reject(error);
        });
    });
}


export const getStartedRideDetail = async () => {
    const AUTH_TOKEN = await getToken()
    const newOne = 'Bearer '+JSON.parse(AUTH_TOKEN)
    return new Promise((resolve, reject) => {
        axios.get((BASE_URL+'/schedule/started'), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': newOne,
            },
        }).then(response => {
            console.log('API', 'Started RIDE DETAILS RESPONSE', response);
            resolve(response.data);
        }).catch(error => {
            console.log('API', 'Started RIDE DETAILS Error', error);
            reject(error);
        });
    });
}

export const changeRideStatusCall = async (folderID,data) => {
    const AUTH_TOKEN = await getToken()
    const newOne = 'Bearer '+JSON.parse(AUTH_TOKEN)
    console.log('Tooooooken of API' , newOne)
    return new Promise((resolve, reject) => {
        var qs = require('qs');
        var data1 = qs.stringify(
            data
        );
        axios.put((BASE_URL+'/schedule/changeStatus/'+folderID), 
            data1,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': newOne,
                },
            }).then(response => {
                console.log('API', 'Change status response', response);
                resolve(response.data);
            }).catch(error => {
                console.log('API', 'Change status error', error);
                reject(error);
            });
        });
}

export const saveAmountInKhizarWallet = async (folderID,data) => {
    const AUTH_TOKEN = await getToken()
    const newOne = 'Bearer '+JSON.parse(AUTH_TOKEN)
    return new Promise((resolve, reject) => {
        var qs = require('qs');
        var data1 = qs.stringify(
            data
        );
        axios.put((BASE_URL+'/schedule/collectPayment/'+folderID), 
            data1,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': newOne,
            },
        }).then(response => {
            console.log('Get Fare api call response', response.data)
            resolve(response.data);
        }).catch(error => {
            console.log('Get Fare api call Error', error)
            reject(error);
        });
    });
}