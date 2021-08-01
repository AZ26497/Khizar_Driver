import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import GradientButton from '../../common/GradientButton'
import LinearGradient from 'react-native-linear-gradient';
import { Rating } from 'react-native-ratings';
import { saveAmountInKhizarWallet } from '../../service/Api'
import Loader from '../../service/Loader';

const CollectCash = ({ navigation, route }) => {
    const [ratingModal, setRatingModal] = useState(false);
    const fareAmount = route.params.fareAmount
    const rideDetails = route.params.rideDetails

    const [loading, setLoading] = useState(false)
    const [collectedAmount, setCollectedAmount] = useState("0")
    const [walletAmount, setWalletAmount] = useState("0")


    function ratingCompleted(rating) {
        console.log("Rating is: " + rating)
    }

    useEffect(() => {
        console.log('Fare AMount on SCreen Load', fareAmount)
    }, []);
    const saveFareAmount = () => {
        setLoading(true)
        const folderID = rideDetails._id
        const data = {
            passengerId: rideDetails.passenger._id,
            fareAmount: fareAmount,
            collectAmount: collectedAmount,
            walletAmount: walletAmount
        }
        saveAmountInKhizarWallet(folderID, data).then((response) => {
            setLoading(false)
            if (response.status === 1) {
                setRatingModal(true)
            }
            else {
                alert(response.status)
            }
        }).catch((error) => {
            alert(error)
        })
    }
    return (
        <SafeAreaView style={{
            flex: 1, backgroundColor: '#38ef7d'
        }}>
            <Modal animationType="slide"
                transparent={true}
                visible={ratingModal}>
                <View style={styles.modalOverlay}>
                    <View style={{ backgroundColor: 'white', width: '90%', alignItems: 'center', padding: 20, borderRadius: 20, borderColor: '#38ef7d' }}>
                        <Text style={{ fontSize: 30 }}>Rate User</Text>
                        <Rating
                            style={{ marginBottom: 20 }}
                            startingValue={1}
                            ratingCount={5}
                            showRating={true}
                            imageSize={30}
                            fractions={1}
                            type={'custom'}
                            ratingTextColor={'black'}
                            selectedColor={'#38ef7d'}
                            ratingColor={'#38ef7d'}
                            ratingBackgroundColor='#c8c7c8'
                            starContainerStyle={{ backgroundColor: 'green', width: 30 }}
                            // ratingImage={Icons.crossImg}
                            onFinishRating={ratingCompleted}
                        />

                        <GradientButton height={50} title={'Rate'} width={'90%'} style={{ alignSelf: 'flex-end' }} action={() => setRatingModal(false)} />

                    </View>

                </View>
            </Modal>
            {loading ? <Loader /> : (

                <LinearGradient
                    colors={['#38ef7d', '#11998e']}
                    style={{
                        flex: 1, alignItems: 'center'
                    }}
                >

                    <View style={styles.container}>

                        <View style={{ width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                            <View style={styles.textFieldCont}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold', color: 'white', fontSize: 20, color: 'black' }}>Total Ride Fare</Text>
                                <TextInput
                                    style={[styles.input, { backgroundColor: 'white' }]}
                                    value={String(fareAmount)}
                                    keyboardType="numeric"
                                    onChangeText={(text) => console.log(text)}
                                    editable={false}
                                />
                            </View>
                            <View style={styles.textFieldCont}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold', color: 'white', fontSize: 20, color: 'black' }}>Collected Amount</Text>
                                <TextInput
                                    style={[styles.input, { backgroundColor: 'white' }]}
                                    value={collectedAmount}
                                    keyboardType="numeric"
                                    onSubmitEditing={() => {

                                    }}
                                    onChangeText={(text) => {
                                        console.log('Text After clear field', text)
                                        if (text != '') {
                                            setCollectedAmount(text)
                                            const amount = Number(fareAmount) - Number(text)
                                            console.log('Fare Amount After Subtraction', fareAmount)

                                            console.log('Collected Amount After Subtraction', text)

                                            console.log('Wallet Amount After Subtraction', amount)
                                            setWalletAmount(String(amount))
                                        } else {
                                            setWalletAmount("0")
                                            setCollectedAmount(text)
                                        }
                                    }
                                    }
                                />
                            </View>
                            <View style={[styles.textFieldCont, { marginBottom: 20 }]}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold', color: 'white', fontSize: 20, color: 'black' }}>Add Amount to Khizar Wallet</Text>
                                <TextInput
                                    style={[styles.input, { backgroundColor: 'white' }]}
                                    value={walletAmount}
                                    keyboardType="numeric"
                                    editable={false}
                                />
                            </View>
                            {loading ? <Loader /> : <GradientButton height={50} title={'Add'} width={'90%'} style={{ alignSelf: 'flex-end' }} action={() => saveFareAmount()} />
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
        fontSize: 18
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.4)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default CollectCash;