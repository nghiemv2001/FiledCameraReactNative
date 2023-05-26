import React, { useEffect, useState,useContext } from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import img_image from '../../../assets/image2.png'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker';
import shareVarible from '../../../AppContext'
import image_iconmage from '../../../assets/iconmap.jpg'
import * as Location from 'expo-location';
import { AddressContext } from './../../component/AddressContext';
const MAPGG = ({ navigation }) => {
  const { currentAddress, currentLatitude, currentLongitude, setCoordinates, setAddress } = useContext(AddressContext);
  const [noidung, SetNoiDung] = useState();
  const [coordinate, setCoordinate] = useState({
    latitude: 10.033948,
    longitude: 105.779659,
  });
  const handleMapPress = (e) => {
    const { coordinate } = e.nativeEvent;
    setCoordinate(coordinate);
    getAddress(coordinate);

  };

  const getAddress = async (coordinate) => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const roundedLatitude = Number(coordinate.latitude.toFixed(6));
      const roundedLongitude = Number(coordinate.longitude.toFixed(6));
      if (status === 'granted') {
        const location = await Location.reverseGeocodeAsync({
          latitude: roundedLatitude,
          longitude: roundedLongitude,
        });
        if (location.length > 0) {
          const { district, subregion, region, country, city, street, streetNumber } = location[0];
          let address = '';
          if (streetNumber) {
            address += streetNumber + ', ';
          }
          if (street) {
            address += street + ', ';
          }
          if (district) {
            address += district + ', ';
          }
          if (subregion) {  
            address += subregion + ', ';
          }
          if (region) {
            address += region + ', ';
          }
          if (country) {
            address += country + ', ';
          }
          if (city) {
            address += city + ', ';
          }
          // Xóa dấu phẩy cuối cùng
          address = address.replace(/,\s*$/, '');
          setAddress(address);
          setCoordinates(roundedLatitude, roundedLongitude);   
        }
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
  }, [currentAddress]);

  return (
    <View>
      <KeyboardAwareScrollView style={{ height: "100%", width: "100%" }}>
        <ScrollView>
          <TouchableOpacity
            onPress={() => navigation.navigate('TrangChuNguoiDung')}
            style={{ height: 70, width: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 70 }}>
            <Ionicons name="chevron-back-sharp" size={35} />
          </TouchableOpacity>
          <View style={{ height: 500, width: '100%' }}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                ...coordinate,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation={true}
              showsMyLocationButton={true}
              onPress={handleMapPress}
            >
              <Marker coordinate={coordinate} title="Địa điểm" />
            </MapView>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: "100%", height: 50 }}>
            <Image style={{ height: 40, width: 40, marginLeft: 35 }} source={image_iconmage} />
            <Text style={{ fontSize: 22, width: "100%" }}>{currentAddress}</Text>
          </View>
          <TouchableOpacity style={{ height: 30, width: 150, justifyContent: 'center', alignItems: 'center', marginLeft: 250, marginTop: 30 }}
            onPress={() => {
              navigation.navigate('PhanAnh')
              setAddress(currentAddress);
            }}
          >
            <Text>Chạm vào để chọn</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default MAPGG;