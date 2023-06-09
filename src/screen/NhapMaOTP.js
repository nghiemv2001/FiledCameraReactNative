import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import imgpass from './../../assets/imgpass.png'
const NhapMaOPT = ({navigation}) => {
  const [fdata, SetFDaTa] = useState({
    email: "",
    number1 : "", 
    number2 : "",
    number3 : "",
    number4 : "",
  })
  const [errormsg, setErrormsg] = useState(null);
  const XacNhanOTP = ()=>{
    navigation.navigate('MatKhauMoi')
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#D9D9D9" }}>
      <Image style={{ height: 300, width: "100%" }} source={imgpass} />
      <View style={{ marginLeft: 0, marginTop: 90, flexDirection: 'row', justifyContent: 'center' }}>
        <TextInput style={{ height: 70, width: 70, borderWidth: 1, borderRadius: 20, marginTop: 0, textAlign: 'center', textAlignVertical:'center' }}
          onPressIn={() => setErrormsg(null)}
          value={fdata.number1}
          keyboardType='numeric'
          onChangeText={(text) => SetFDaTa({ ...fdata, number1: text })}
        ></TextInput>
        <TextInput style={{ height: 70, width: 70, borderWidth: 1, borderRadius: 20, marginTop: 0, textAlign: 'center', textAlignVertical:'center', marginLeft: 20 }}
          onPressIn={() => setErrormsg(null)}
          value={fdata.email}
          keyboardType='numeric'
          onChangeText={(text) => SetFDaTa({ ...fdata, number2: text })}
        ></TextInput>
        <TextInput style={{ height: 70, width: 70, borderWidth: 1, borderRadius: 20, marginTop: 0, textAlign: 'center', textAlignVertical:'center', marginLeft: 20 }}
          onPressIn={() => setErrormsg(null)}
          value={fdata.email}
          keyboardType='numeric'
          onChangeText={(text) => SetFDaTa({ ...fdata, number3: text })}
        ></TextInput>

        <TextInput style={{ height: 70, width: 70, borderWidth: 1, borderRadius: 20, marginTop: 0, textAlign: 'center', textAlignVertical:'center', marginLeft: 20  }}
          onPressIn={() => setErrormsg(null)}
          value={fdata.email}
          keyboardType='numeric'
          onChangeText={(text) => SetFDaTa({ ...fdata, number4: text })}
        ></TextInput>
        </View>
        <TouchableOpacity
          onPress={() => XacNhanOTP()}
          style={{ backgroundColor: "#D9D9D9" }}>
          <Text style={{ height: 50, width: 160, borderWidth: 2, textAlignVertical: 'center', textAlign: 'center', fontSize: 25, borderRadius: 12, marginTop: 100, marginLeft: 130 }}>XÁC NHẬN</Text>
        </TouchableOpacity>

      

    </View>
  )
}

export default NhapMaOPT