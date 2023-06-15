import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet,Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useState, useEffect } from 'react'
import img_dangnhap from '../../assets/dangnhap.png'
import shareVarible from '../../AppContext'
const DangNHap = ({ navigation}) => {
  const [fdata, SetFDaTa] = useState({
    email: "",
    password: ""
  })
  const [errormsg, setErrormsg] = useState(null);

  const FDangNhap = () => {
    fetch(shareVarible.URLink + '/signin',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fdata)
      }).then(res => res.json()).then(
        data => {
          if (data.error) {
            setErrormsg(data.error);
            Alert.alert("Thông báo","Có lẽ email hoặc mật khẩu chưa chính xác!");
          }
          else {
            SetFDaTa({ ...fdata, email: "" , password:""})
            Alert.alert("Thông báo",'Đăng nhập hệ thống thành công');
            navigation.navigate('TrangCaNhan', { data: fdata });
          }
        }
      )

  }
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Text style={{ height: 120, width: 120, backgroundColor: '#A7F5FF', borderRadius: 120 }} />
      <Text style={{ height: 120, width: 120, backgroundColor: '#B3F6FF', opacity: 0.6, borderRadius: 120, marginTop: -40 }} />
      <Text style={{ height: 80, width: 80, backgroundColor: '#B3F6FF', borderRadius: 120, position: 'absolute', marginTop: 35, marginLeft: 120 }} />
      <Text style={{ height: 50, width: 50, backgroundColor: '#B3F6FF', borderRadius: 120, marginTop: 70, marginLeft: 210, position: 'absolute' }} />
      <Text style={{ fontSize: 36, fontWeight: 'bold', marginLeft: 123, marginTop: -78 }}>PHẢN ẢNH</Text>
      <Text style={{ fontSize: 32, fontWeight: '400', marginLeft: 190 }}>HIỆN TRƯỜNG</Text>
      <Image style={{ height: 245, width: '100%' }} source={img_dangnhap}></Image>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 13, marginRight: 260, marginTop : 10 }}>Email</Text>
        <TextInput style={{ height: 40, width: 300, borderWidth: 1, borderRadius: 20, marginTop: 0, paddingLeft: 10 }}
          onPressIn={() => setErrormsg(null)}
          value={fdata.email}
          onChangeText={(text) => SetFDaTa({ ...fdata, email: text })}
        ></TextInput>
        <Text style={{ fontSize: 13, marginRight: 240, marginTop: 10 }}>Mật khẩu</Text>
        <TextInput style={{ height: 40, width: 300, borderWidth: 1, borderRadius: 20, marginTop: 0, paddingLeft: 10 }}
          onPressIn={() => setErrormsg(null)}
          secureTextEntry
          value={fdata.password}
          onChangeText={(text) => SetFDaTa({ ...fdata, password: text })}
        ></TextInput>
        <View style={{ flexDirection: 'row', }}>
          <TouchableOpacity onPress={() => navigation.navigate('DangKy')}>
            <Text style={{ marginRight: 60, color: 'red' }}>Đăng ký tài khoản</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('QuenMatKhau')}>
            <Text style={{ color: 'red' }}>Quên mật khẩu</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => FDangNhap()}>
          <Text style={{ height: 50, width: 250, backgroundColor: '#81F0FF', marginTop: 15, borderRadius: 40, textAlign: 'center', textAlignVertical: 'center', fontSize: 28, fontWeight: 'bold' }}>ĐĂNG NHẬP</Text>

        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default DangNHap
const styles = StyleSheet.create({
  container: {
    flex: 1, height: '100%', width: '100%',
  },
});