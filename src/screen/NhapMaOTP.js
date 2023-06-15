import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useEffect, useContext, useRef } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import imgpass from './../../assets/imgpass.png'
const NhapMaOPT = ({ navigation, route }) => {
  const [fdata, SetFDaTa] = useState({
    email: "",
    number1: "",
    number2: "",
    number3: "",
    number4: "",
  })
  const number1Ref = useRef(null);
  const number2Ref = useRef(null);
  const number3Ref = useRef(null);
  const number4Ref = useRef(null);
  const [errormsg, setErrormsg] = useState(null);
  const XacNhanOTP = () => {
    const s = fdata.number1 + fdata.number2 + fdata.number3 + fdata.number4;
    if (s != route.params.data.otpCode) {
      console.log(route.params.data.otpCode)
      SetFDaTa({...fdata,number1: "",number2: "",number3: "",number4: "",})
      Alert.alert("Thông báo",'Mã OTP không chính xác !')
    }

    else {
      SetFDaTa({...fdata,number1: "",number2: "",number3: "",number4: "",})
      fdata.email = route.params.fdata.email
      navigation.navigate('MatKhauMoi', {data : fdata.email})
4
    }
    // navigation.navigate('MatKhauMoi')
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Image style={{ height: 300, width: "100%" }} source={imgpass} />
      <View style={{ marginLeft: 0, marginTop: 90, flexDirection: 'row', justifyContent: 'center' }}>
        <TextInput
          style={{ height: 70, width: 70, borderWidth: 1, borderRadius: 20, marginTop: 0, textAlign: 'center', textAlignVertical: 'center' }}
          onPressIn={() => setErrormsg(null)}
          value={fdata.number1}
          maxLength={1}
          ref={number1Ref}
          keyboardType='numeric'
          onChangeText={(text) => {
            SetFDaTa({ ...fdata, number1: text });
            if (text !== '') {
              number2Ref.current.focus();
            }
          }}
        ></TextInput>
        <TextInput
          style={{ height: 70, width: 70, borderWidth: 1, borderRadius: 20, marginTop: 0, textAlign: 'center', textAlignVertical: 'center', marginLeft: 20 }}
          onPressIn={() => setErrormsg(null)}
          ref={number2Ref}
          value={fdata.number2}
          maxLength={1}
          keyboardType='numeric'
          onChangeText={(text) => {
            SetFDaTa({ ...fdata, number2: text });
            if (text !== '') {
              number3Ref.current.focus();
            }
          }}
        ></TextInput>
        <TextInput style={{ height: 70, width: 70, borderWidth: 1, borderRadius: 20, marginTop: 0, textAlign: 'center', textAlignVertical: 'center', marginLeft: 20 }}
          onPressIn={() => setErrormsg(null)}
          value={fdata.number3}
          maxLength={1}
          ref={number3Ref}
          keyboardType='numeric'
          onChangeText={(text) => {
            SetFDaTa({ ...fdata, number3: text });
            if (text !== '') {
              number4Ref.current.focus();
            }
          }}
        ></TextInput>

        <TextInput style={{ height: 70, width: 70, borderWidth: 1, borderRadius: 20, marginTop: 0, textAlign: 'center', textAlignVertical: 'center', marginLeft: 20 }}
          onPressIn={() => setErrormsg(null)}
          value={fdata.number4}
          ref={number4Ref}
          keyboardType='numeric'
          maxLength={1}
          onChangeText={(text) => {
            fdata.number4 = text
            SetFDaTa({ ...fdata, number4: text });
            if (text !== '') {
              XacNhanOTP();
            }
          }}
        ></TextInput>
      </View>
      <TouchableOpacity
        onPress={() => XacNhanOTP()}
        style={{ backgroundColor: "white" }}>
        <Text style={{ height: 50, width: 160, borderWidth: 2, textAlignVertical: 'center', textAlign: 'center', fontSize: 25, borderRadius: 12, marginTop: 100, marginLeft: 130 }}>XÁC NHẬN</Text>
      </TouchableOpacity>



    </View>
  )
}

export default NhapMaOPT