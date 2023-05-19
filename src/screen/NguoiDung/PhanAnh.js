import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import img_image from '../../../assets/image2.png'
import Ionicons from 'react-native-vector-icons/Ionicons'
const PhanAnh = ({navigation}) => {
  const [noidung, SetNoiDung] = useState();
  const [coordinate, setCoordinate] = useState({
    latitude: 10.033948,
    longitude: 105.779659,
  });

  const handleMapPress = (e) => {
    const { coordinate } = e.nativeEvent;
    setCoordinate(coordinate);
    alert(coordinate.latitude)
  };

  return (
    <View>
      <KeyboardAwareScrollView style={{ height: "100%", width: "100%" }}>
        <ScrollView>
          <TouchableOpacity 
          onPress={() => navigation.navigate('TrangChuNguoiDung')}
          style={{height: 70, width: 70, justifyContent: 'center', alignItems:'center', borderRadius: 70}}>
            <Ionicons name="chevron-back-sharp" size={35}/>
          </TouchableOpacity>
          <Text style={{ marginLeft: 40,marginTop: -20, fontSize: 19 }}>
            Nội dung
          </Text>
          <View
            style={{
              borderWidth: 1,
              height: 50,
              width: '90%',
              borderRadius: 50,
              marginLeft: 20,
            }}
          >
            <Picker
              selectedValue={noidung}
              onValueChange={(itemValue, itemIndex) => SetNoiDung(itemValue)}
            >
              <Picker.Item
                label="Lấn chiếm lòng lề đường"
                value="Lấn chiếm lòng lề đường"
              />
              <Picker.Item label="Vệ sinh công cộng" value="Vệ sinh công cộng" />
              <Picker.Item label="An toàn thực phẩm" value="An toàn thực phẩm" />
            </Picker>
          </View>
          <Text style={{ marginLeft: 40, marginTop: 10, fontSize: 19 }}>
            Mô tả
          </Text>
          <TextInput
            style={{
              height: 50,
              width: '90%',
              borderWidth: 1,
              borderRadius: 30,
              marginLeft: 20,
              paddingLeft: 15,
            }}
          />
          <Text style={{ marginLeft: 40, marginTop: 10, fontSize: 19 }}>
            Vị Trí
          </Text>
          <Text style={{
            borderWidth: 1,
            height: 50,
            width: '90%',
            borderRadius: 50,
            marginLeft: 20,
            textAlignVertical: 'center',
            paddingLeft: 15
          }}>{coordinate.latitude} : {coordinate.longitude}</Text>
          <View style={{ height: 150, width: '87%', marginLeft: 26, marginTop: 10 }}>
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
              <Marker coordinate={coordinate} title="Test" />
            </MapView>
          </View>
          <View style={{ height: 150, width: "100%", marginTop: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ height: 130, width: "55%", borderWidth: 1, borderRadius: 20 }}></Text>
            <View style={{ marginLeft: 20 }}>
              <TouchableOpacity>
                <Ionicons name="md-image" size={50}></Ionicons>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="camera" size={50}></Ionicons>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={{ height: 60, width: 60, borderRadius: 50, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 160, backgroundColor: '#2ABBA7' }}>
            <Ionicons name="checkmark-sharp" size={40} />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAwareScrollView>

    </View>
  );
};

export default PhanAnh;