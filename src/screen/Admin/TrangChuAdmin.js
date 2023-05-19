import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import img_cusc from '../../../assets/Cusc.png'
import img_list1 from '../../../assets/list1.jpg'
import img_list2 from '../../../assets/list2.jpg'
import img_list3 from '../../../assets/list3.jpg'
import img_danhsachtaikhoan from '../../../assets/danhsachtaikhoan.png'
import img_logout from '../../../assets/logout.png'
const TrangChuAdmin = ({navigation}) => {
  return (
    <View style={{ flex: 1, width: "100%", height: '100%' }}>
      <View style={{ height: "30%", width: "100%" }}>
        <Text style={{ fontSize: 42, fontWeight: 'bold', fontStyle: 'italic', marginTop: 30, marginLeft: 12 }}>PHẢN ẢNH</Text>
        <Text style={{ fontSize: 28, fontWeight: 'bold', marginTop: -5, marginLeft: 80 }}>HIỆN TRƯỜNG</Text>
        <Image style={{ borderRadius: 100, height: 100, width: 100, marginLeft: 270, marginTop: -70 }} source={img_cusc} />
      </View>
      <View style={{ height: "80%", width: "90%", borderTopLeftRadius: 50, borderTopRightRadius: 50, borderWidth: 3, marginTop: 0, marginLeft: 20, marginTop: -50 }}>
        <View style={{ height: '26%', width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: -20 }}>
          <TouchableOpacity>
            <Image style={{ height: 90, width: 90, borderRadius: 90, marginLeft: 30, marginTop: 50 }} source={img_list1} />
            <Text style={{ textAlign: 'center', width: 150 }}>Chưa xử lí</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Image style={{ height: 90, width: 90, borderRadius: 90, marginLeft: 30, marginTop: 50 }} source={img_list2} />
            <Text style={{ textAlign: 'center', width: 150 }}>Đang xử lí</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: '26%', width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity >
            <Image style={{ height: 90, width: 90, borderRadius: 90, marginLeft: 30, marginTop: 50 }} source={img_list3} />
            <Text style={{ textAlign: 'center', width: 150 }}>Đã xử lí</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Image style={{ height: 90, width: 90, borderRadius: 90, marginLeft: 30, marginTop: 50 }} source={img_danhsachtaikhoan} />
            <Text style={{ textAlign: 'center', width: 150 }}>Danh sách tài khoản</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{  marginTop: 120, width:'20%', marginLeft: 120 }}
          onPress={() => navigation.navigate('DangNhap')}
        >
          <Image style={{ height: 90, width: 90, borderRadius: 90 }} source={img_logout} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TrangChuAdmin