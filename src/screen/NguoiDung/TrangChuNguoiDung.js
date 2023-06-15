import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import img_cusc from '../../../assets/Cusc.png'
import img_phananh from '../../../assets/phananh.png'
import img_tintuc from '../../../assets/tintuc.png'
import img_thongbao from '../../../assets/thongbao.jpg'
import img_logout from '../../../assets/logout.png'
import * as Location from 'expo-location';
import { AddressContext } from './../../component/AddressContext';
const TrangChuNguoiDung = ({ navigation }) => {
  const { currentAddress, currentLatitude, currentLongitude, setCoordinates, setAddress } = useContext(AddressContext);
  const [currentLocation, setCurrentLocation] = useState(null);
  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setCurrentLocation({ latitude, longitude });
        getAddress(latitude, longitude);
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getAddress = async (latitude, longitude) => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (location.length > 0) {
          const { streetNumber, street, subregion, region, country } = location[0];
          const address = `${streetNumber}, ${street}, ${subregion}, ${region}, ${country}`;
          setAddress(address);
          setCoordinates(latitude, longitude);
        }
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <View style={{ flex: 1, width: "100%", height: '100%' }}>
      <View style={{ height: "21%", width: "100%" }}>
        <Text style={{ fontSize: 35, fontWeight: 'bold', fontStyle: 'italic', marginTop: 20, marginLeft: 12 }}>PHẢN ẢNH</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: -5, marginLeft: 80 }}>HIỆN TRƯỜNG</Text>
        {/* <Image style={{ borderRadius: 100, height: 100, width: 100, marginLeft: 270, marginTop: -70 }} source={img_cusc} /> */}
      </View>
      <View style={{ height: "90%", width: "90%", borderTopLeftRadius: 50, borderTopRightRadius: 50, borderWidth: 1, marginTop: 0, marginLeft: 20, marginTop: -50 }}>
        <View style={{ height: '26%', width: '100%', flexDirection: 'row', justifyContent: 'space-around', marginTop: -30 }}>
          <View style={{ justifyContent: 'space-around', alignItems: "center" }}>
            <TouchableOpacity onPress={() => {
              setAddress(currentAddress)
              navigation.navigate('PhanAnh')
            }}>
              <Image style={{ height: 60, width: 60, borderRadius: 60, marginTop: 50 }} source={img_phananh} />
              <Text style={{ textAlign: 'center' }}>Phản ánh</Text>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center', alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.navigate('TinTuc')}>
              <Image style={{ height: 60, width: 60, borderRadius: 60, marginTop: 50 }} source={img_tintuc} />
              <Text style={{ textAlign: 'center' }}>Tin tức</Text>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center', alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.navigate('ThongBaoNguoiDung')}>
              <Image style={{ height: 60, width: 60, borderRadius: 60, marginTop: 50 }} source={img_thongbao} />
              <Text style={{ textAlign: 'center' }}>Thông báo</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: '26%', width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
        </View>
        <TouchableOpacity style={{justifyContent:'flex-end', width: "100%", alignItems: 'center', height: "45%"}}
          onPress={() => navigation.navigate('DangNhap')}
        ><Text style={{fontSize: 18, fontStyle: 'normal', textDecorationLine: 'underline'}}>Logout</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  )
}

export default TrangChuNguoiDung