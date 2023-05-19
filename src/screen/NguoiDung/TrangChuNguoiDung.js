import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import img_cusc from '../../../assets/Cusc.png'
import img_phananh from '../../../assets/phananh.png'
import img_tintuc from '../../../assets/tintuc.png'
import img_thongbao from '../../../assets/thongbao.jpg'
import img_logout from '../../../assets/logout.png'
const TrangChuNguoiDung = ({navigation}) => {
  return (
    <View style={{ flex: 1, width: "100%", height: '100%' }}>
    <View style={{ height: "30%", width: "100%" }}>
      <Text style={{ fontSize: 42, fontWeight: 'bold', fontStyle: 'italic', marginTop: 30, marginLeft: 12 }}>PHẢN ẢNH</Text>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginTop: -5, marginLeft: 80 }}>HIỆN TRƯỜNG</Text>
      <Image style={{ borderRadius: 100, height: 100, width: 100, marginLeft: 270, marginTop: -70 }} source={img_cusc} />
    </View>
    <View style={{ height: "80%", width: "90%", borderTopLeftRadius: 50, borderTopRightRadius: 50, borderWidth: 3, marginTop: 0, marginLeft: 20, marginTop: -50 }}>
      <View style={{ height: '26%', width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: -20 }}>
        <TouchableOpacity onPress={() => navigation.navigate('PhanAnh')}>
          <Image style={{ height: 90, width: 90, borderRadius: 90, marginLeft: 30, marginTop: 50 }} source={img_phananh} />
          <Text style={{ textAlign: 'center', width: 150 }}>Phản ánh</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Image style={{ height: 90, width: 90, borderRadius: 90, marginLeft: 30, marginTop: 50 }} source={img_tintuc} />
          <Text style={{ textAlign: 'center', width: 150 }}>Tin tức</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: '26%', width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity >
          <Image style={{ height: 90, width: 90, borderRadius: 90, marginLeft: 30, marginTop: 50 }} source={img_thongbao} />
          <Text style={{ textAlign: 'center', width: 150 }}>Thông báo</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{  marginTop: 120, width:'20%', marginLeft: 140 }} 
        onPress={() => navigation.navigate('DangNhap')}
      >
        <Image style={{ height: 90, width: 90, borderRadius: 90 }} source={img_logout} />
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default TrangChuNguoiDung