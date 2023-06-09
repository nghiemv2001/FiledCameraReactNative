import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import imgpass from './../../assets/imgpass.png'
const QuenMatKhau = ({navigation}) => {
    const [fdata, SetFDaTa] = useState({
        email: "",
    })
    const [errormsg, setErrormsg] = useState(null);

    return (
        <View style={{ flex: 1, backgroundColor: "#D9D9D9" }}>
            <Image style={{ height: 300, width: "100%" }} source={imgpass} />
            <View style={{ marginLeft: 30, marginTop: 40 }}>
                <Text style={{ fontSize: 16, marginRight: 260, width: 220, marginTop: 50, marginLeft: 10 }}>Nhập địa chỉ email đã đăng ký</Text>
                <TextInput style={{ height: 50, width: 350, borderWidth: 1, borderRadius: 20, marginTop: 0, paddingLeft: 10 }}
                    onPressIn={() => setErrormsg(null)}
                    value={fdata.email}
                    onChangeText={(text) => SetFDaTa({ ...fdata, email: text })}
                ></TextInput>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('NhapMaOTP', {data: fdata})}
                style={{ backgroundColor: "#D9D9D9" }}>
                    <Text style={{ height: 50, width: 160, borderWidth: 2, textAlignVertical: 'center', textAlign: 'center', fontSize: 25, borderRadius: 12, marginTop: 100, marginLeft: 100 }}>XÁC NHẬN</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default QuenMatKhau