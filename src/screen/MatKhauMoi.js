import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import imgpass from './../../assets/imgpass.png'
import shareVarible from '../../AppContext'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const MatKhauMoi = ({ navigation, route }) => {
  const [fdata, SetFDaTa] = useState({
    email: "",
    newPassword: ""
  })
  const [errormsg, setErrormsg] = useState(null);
  const UpdatePasss = async () => {
    fdata.email = route.params.data
    if (fdata.newPassword.length < 6) {
      alert("Mật khẩu mạnh đảm bảo trên 6 ký tự!")
      return;
    }
    if (!(/^\S+$/).test(fdata.newPassword)) {
      alert("Mật khẩu mạnh đảm bảo không chưa khoảng trăng!")
      return;
    }
    else {
      try {
        const response = await fetch(shareVarible.URLink + '/user/updatePassword', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fdata),
        });
        const data = await response.json();
        if (response.ok) {
          alert('Thay đổi mật khẩu thành công!')
          navigation.navigate('DangNhap')
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    }

  }
  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <Image style={{ height: 300, width: "100%" }} source={imgpass} />
      <View style={{ marginLeft: 30, marginTop: 40 }}>
        <Text style={{ fontSize: 16, marginRight: 260, width: 220, marginTop: 50, marginLeft: 10 }}>Mật khẩu mới</Text>
        <TextInput style={{ height: 50, width: 350, borderWidth: 1, borderRadius: 20, marginTop: 0, paddingLeft: 10 }}
          onPressIn={() => setErrormsg(null)}
          value={fdata.newPassword}
          onChangeText={(text) => SetFDaTa({ ...fdata, newPassword: text })}
        ></TextInput>
        <TouchableOpacity
          onPress={() => UpdatePasss()}
          style={{ backgroundColor: "white" }}>
          <Text style={{ height: 50, width: 160, borderWidth: 2, textAlignVertical: 'center', textAlign: 'center', fontSize: 25, borderRadius: 12, marginTop: 100, marginLeft: 100 }}>XÁC NHẬN</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default MatKhauMoi