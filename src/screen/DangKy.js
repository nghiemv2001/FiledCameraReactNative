import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useState, useEffect } from 'react'
import shareVarible from '../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
const DangKy = ({ navigation }) => {
  const [fdata, SetFDaTa] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "3",
    keycode: "0000",
    image: "https://res.cloudinary.com/dmsgfvp0y/image/upload/v1684391380/trangcanhan_inwrjo.png"
  })
  const [fpassword, SetFPassword] = useState({
    confirmpass: ""
  })
  const [errormsg, setErrormsg] = useState(null)
  //Password
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [confirmpasswordVisible, setConfirmPasswordVisible] = useState(false);
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmpasswordVisible);
  };
  ////////
  const FDangKy = () => {
    if (fdata.name == '') {
      alert("Tên người dùng không thể để trống!")
      return;
    }
    if ((!(/\S+@\S+\.\S+/).test(fdata.email) && !(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).test(fdata.email))) {
      alert("Email người dùng chưa đúng định dạng!")
      return;
    }
    if (fdata.phone.length == 0) {
      alert("Số điện thoại không thể để trống!")
      return;
    }
    if (fdata.phone.length < 9 || fdata.phone.length > 11) {
      alert("Số điện thoại nhật vào không hợp lệ!")
    }
    if (fdata.phone.length != 0) {
      for (const item of fdata.phone) {
        if (item != '0' && item != '1' && item != '2' && item != '3' && item != '4' && item != '5' && item != '6' && item != '7' && item != '8' && item != '9') {
          console.log(typeof (fdata.phone))
          alert('Số điện thoại không chứa ký tự!');
          return;
        }
      }
    }
    if (fdata.password.length < 6) {
      alert("Mật khẩu mạnh đảm bảo trên 6 ký tự!")
      return;
    }
    if (!(/^\S+$/).test(fdata.password)) {
      alert("Mật khẩu mạnh đảm bảo không chưa khoảng trăng!")
      return;
    }
    if (!(/^(?=.*[A-Z]).*$/).test(fdata.password)) {
      alert("Mật khẩu mạnh đảm bảo chứa ít nhất 1 ký tự in hoa!")
      return;
    }
    if (!(/^(?=.*[a-z]).*$/).test(fdata.password)) {
      alert("Mật khẩu mạnh đảm bảo chứa ít nhất 1 ký tự thường!")
      return;
    }
    if (!(/^(?=.*[0-9]).*$/).test(fdata.password)) {
      alert("Mật khẩu mạnh đảm bảo chứa ít nhất 1 số!")
      return;
    }
    if (fdata.password != fpassword.confirmpass) {
      alert("Xác nhận mật khẩu chưa chính xác!")
      return;
    }
    Alert.alert('Điều khoản', 'Bạn cần cam kết các điều sau đây!\n\n1. Thông tin cung cấp là hoàn toàn đúng sự thật.\n2. Chịu hoàn toàn trách nhiệm về pháp luật nếu thông tin cung cấp là không chính xác.\n3. Khuyến kích bạn có thể cung cấp thông tin một cách chi tiết nhất.\n\nVui lòng đọc kĩ & chân thành cảm ơn.', [
      {
        text: 'không'
      },
      {
        text: 'Đồng ý', onPress: () => fetch(shareVarible.URLink + '/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(fdata)
        })
          .then(res => res.json()).then(
            data => {
              if (data.error) {
                setErrormsg(data.error);
              }
              else {
                alert('Đăng ký tài khoản thành công');
                navigation.navigate('DangNhap');
              }
            }
          )
      },
    ]);
  }
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Text style={{ height: 120, width: 120, backgroundColor: '#A7F5FF', borderRadius: 120 }} />
      <Text style={{ height: 120, width: 120, backgroundColor: '#B3F6FF', opacity: 0.6, borderRadius: 120, marginTop: -40 }} />
      <Text style={{ height: 80, width: 80, backgroundColor: '#B3F6FF', borderRadius: 120, position: 'absolute', marginTop: 35, marginLeft: 120 }} />
      <Text style={{ height: 50, width: 50, backgroundColor: '#B3F6FF', borderRadius: 120, marginTop: 70, marginLeft: 210, position: 'absolute' }} />
      <Text style={{ fontSize: 36, fontWeight: 'bold', marginLeft: 123, marginTop: -78 }}>PHẢN ẢNH</Text>
      <Text style={{ fontSize: 32, fontWeight: '400', marginLeft: 190 }}>HIỆN TRƯỜNG</Text>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 13, marginRight: 210, marginTop: 20 }}>Tên người dùng</Text>
        <TextInput style={{ height: 40, width: 300, borderWidth: 1, borderRadius: 20, paddingLeft: 10 }}
          onPressIn={() => setErrormsg(null)}
          onChangeText={(text) => SetFDaTa({ ...fdata, name: text })}
        ></TextInput>
        <Text style={{ fontSize: 13, marginRight: 260, marginTop: 10 }}>Email</Text>
        <TextInput style={{ height: 40, width: 300, borderWidth: 1, borderRadius: 20, paddingLeft: 10 }}
          onPressIn={() => setErrormsg(null)}
          onChangeText={(text) => SetFDaTa({ ...fdata, email: text })}
        ></TextInput>
        <Text style={{ fontSize: 13, marginRight: 210, marginTop: 10 }}>Số điện thoại</Text>
        <TextInput style={{ height: 40, width: 300, borderWidth: 1, borderRadius: 20, paddingLeft: 10 }}
          onPressIn={() => setErrormsg(null)}
          onChangeText={(text) => SetFDaTa({ ...fdata, phone: text })}
        ></TextInput>
        <Text style={{ fontSize: 13, marginRight: 240, marginTop: 10 }}>Mật khẩu</Text>
        <View style={{ flexDirection: 'row', height: 40, width: 300, borderWidth: 1, borderRadius: 20, paddingLeft: 10 }}>
          <TextInput style={{ height: 40, width: 250, paddingLeft: 10 }}
            onPressIn={() => setErrormsg(null)}
            secureTextEntry={!passwordVisible}
            onChangeText={(text) => SetFDaTa({ ...fdata, password: text })}
          > </TextInput><TouchableOpacity
            style={{ marginTop: 7 }}
            onPress={togglePasswordVisibility}
          >
            <Ionicons
              name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 13, marginRight: 180, marginTop: 10 }}>Xác nhận mật khẩu</Text>
        <View style={{ flexDirection: 'row', height: 40, width: 300, borderWidth: 1, borderRadius: 20, paddingLeft: 10 }}>
          <TextInput style={{ height: 40, width: 250, paddingLeft: 10 }}
            onPressIn={() => setErrormsg(null)}
            secureTextEntry={!confirmpasswordVisible}
            onChangeText={(text) => SetFPassword({ ...fpassword, confirmpass: text })}
          ></TextInput>
          <TouchableOpacity
            style={{ marginTop: 7 }}
            onPress={toggleConfirmPasswordVisibility}
          >
            <Ionicons
              name={confirmpasswordVisible ? 'eye-outline' : 'eye-off-outline'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('DangNhap')}>
          <Text style={{ marginLeft: 190, marginTop: 5, color: 'red' }}>Đã có tài khoản</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => FDangKy()}>
          <Text style={{ height: 50, width: 250, backgroundColor: '#81F0FF', marginTop: 15, borderRadius: 40, textAlign: 'center', textAlignVertical: 'center', fontSize: 28, fontWeight: 'bold' }}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default DangKy
const styles = StyleSheet.create({
  container: {
    flex: 1, height: '100%', width: '100%',
  },
});