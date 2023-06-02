import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker';
import shareVarible from '../../../AppContext'
import CheckBox from 'expo-checkbox';
import * as Location from 'expo-location';
import { AddressContext } from './../../component/AddressContext';
// Trong component PhanAnh
const PhanAnh = ({ navigation }) => {
  const { currentAddress, currentLatitude, currentLongitude, setCoordinates, setAddress } = useContext(AddressContext);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [Errormgs, setErrormgs] = useState(null)
  const [coordinate, setCoordinate] = useState({
    latitude: 10.033948,
    longitude: 105.779659,
  });
  const [image, setImage] = useState(null);
  const handleMapPress = (e) => {
    const { coordinate } = e.nativeEvent;
    setCoordinate(coordinate);
    setFdata({ ...fdata, latitudeDelta: coordinate.latitude, longitudeDelta: coordinate.longitude })
  };
  const [fdata, setFdata] = useState({
    noidung: "",
    trangthai: 1,
    latitudeDelta: "0.0922",
    longitudeDelta: "0.0421",
    vitri: "",
    hinhanh: "",
    phut : 1,
    gio : 1,
    ngay : 1,
    thang : 1,
    nam : 1
  })
  const TaoPhanAnh = () => {
    const now = new Date();
    fdata.phut = now.getMinutes();
    fdata.gio = now.getHours();
    fdata.ngay = now.getDate();
    fdata.thang = now.getMonth()+ 1;
    fdata.nam = now.getFullYear();
    if (toggleCheckBox == true) {
      fdata.trangthai = 0;
    }
    else if (toggleCheckBox == false) {
      fdata.trangthai = 1
    }
    fdata.latitudeDelta = currentLatitude;
    fdata.longitudeDelta = currentLongitude
    fdata.vitri = currentAddress
    console.log(fdata)
    if (fdata.noidung == "") {
      alert("Nội dụng là bắt buộc!")
      return;
    }
    if (fdata.hinhanh == "") {
      alert("Có lẽ bạn chưa thêm hình ảnh minh họa cho phản ánh này!")
      return;
    }
    else {
      Alert.alert('Xác nhận', 'Kiểm tra lại nội dung của phản ánh! Hãy đảm bảo sự chuẩn xác !'+'\nNội dung: '+`${fdata.noidung}`+'\nVị trí: '+`${fdata.vitri}`, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () =>
            fetch(shareVarible.URLink + '/PhanAnh/create',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(fdata)
              }).then(res => res.json()).then(
                data => {
                  if (data.error) {
                    setErrormgs(data.error);
                    console.log(data.error)
                    alert(data.error);
                  }
                  else {
                    setFdata({ ...fdata, mota: "", hinhanh: "" })
                    alert('Thành công thêm phản ánh');
                    navigation.navigate('TrangChuNguoiDung')
                  }
                }
              )
        },
      ]);
    }
  }
  //take image from libary and image
  //upload image from drive to cloudinary 
  const handleUpload = (image) => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'restaurant')
    data.append("cloud_name", "dmsgfvp0y")
    fetch("https://api.cloudinary.com/v1_1/dmsgfvp0y/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).
      then(data => {
        setImage(data.secure_url)
        setFdata({ ...fdata, hinhanh: data.secure_url })
      }).catch(err => {
        Alert.alert("An Error Occured While Uploading")
        console.log(err)
      })
  }

  //take image from camera
  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      let newfile = {
        uri: result.assets[0].uri,
        type: `test/${result.assets[0].uri.split(".")[1]}`,
        name: `test.${result.assets[0].uri.split(".")[1]}`
      }
      handleUpload(newfile)
      setImage(result.assets[0].uri);
    }
    else {
      setImage(null);
    }
  };

  //take image from libary
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      let newfile = {
        uri: result.assets[0].uri,
        type: `test/${result.assets[0].uri.split(".")[1]}`,
        name: `test.${result.assets[0].uri.split(".")[1]}`
      }

      handleUpload(newfile)
      setImage(result.assets[0].uri);
    }
    else {
      setImage(null);
    }
  };
  useEffect(() => {
  }, []);

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
  const openMap = () => {
    navigation.navigate("MapGG")
    // if (currentLocation) {
    //   const { latitude, longitude } = currentLocation;
    //   const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    //   Linking.openURL(url);
    // }
  };
  //////////////////////////////////
  return (
    <View>
      <KeyboardAwareScrollView style={{ height: "100%", width: "100%" }}>
        <ScrollView>
          <TouchableOpacity
            onPress={() => navigation.navigate('TrangChuNguoiDung')}
            style={{ height: 70, width: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 70 }}>
            <Ionicons name="chevron-back-sharp" size={35} />
          </TouchableOpacity>
          <Text style={{ marginLeft: 40, fontSize: 19, marginTop: -20 }}>
            Nội dung phản ánh kiến nghị(*)
          </Text>
          <TextInput
            onChangeText={(text) => setFdata({ ...fdata, noidung: text })}
            value={fdata.mota}
            multiline={true}
            style={{
              height: 110,
              width: '90%',
              borderWidth: 1,
              borderRadius: 30,
              marginLeft: 20,
              paddingHorizontal: 15,
              paddingTop: 10,
              textAlignVertical: 'top',
              fontSize: 22,
              fontWeight: '500'
            }}
          />
          <View style={{ flexDirection: 'row', marginLeft: 30, marginTop: 10 }}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}

              onValueChange={(newValue) =>
                setToggleCheckBox(newValue)}

            />
            <Text>Phản ánh gấp</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginLeft: 40, marginTop: 10, fontSize: 19 }}>
              Vị Trí (
            </Text>
            <Text style={{ fontSize: 12, marginTop: 15 }}>
              mặc định vị trí hiện tại nếu người dùng không có thay đôi)
            </Text>
          </View>

          <Text style={{ height: 50, width: '90%', borderRadius: 40, marginLeft: 20, borderWidth: 1, textAlignVertical: 'center', paddingLeft: 10 }}>{currentAddress}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
            <TouchableOpacity onPress={getCurrentLocation}>
              <Ionicons name="md-location-outline" size={35} />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, paddingTop: 5, marginLeft: -25 }}>Vị trí hiện tại</Text>
            <TouchableOpacity onPress={openMap}>
              <Ionicons name="map" size={35} />
            </TouchableOpacity>

            <Text style={{ fontSize: 18, paddingTop: 5, marginLeft: -25 }}>Mở bản đồ</Text>
          </View>

          <Text style={{ marginLeft: 40, fontSize: 19, marginBottom: -15, marginTop: 20 }}>
            Đính kèm hình ảnh(*)
          </Text>
          <View style={{ height: 150, width: "100%", marginTop: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            {
              fdata.hinhanh != "" ? <Image style={{ height: 130, width: "55%", borderRadius: 20 }} source={{ uri: image }} />
                : <Text style={{ height: 130, width: "55%", borderWidth: 1, borderRadius: 20 }}></Text>
            }
            <View style={{ marginLeft: 20 }}>
              <TouchableOpacity onPress={pickImage}>
                <Ionicons name="md-image" size={50}></Ionicons>
              </TouchableOpacity>
              <TouchableOpacity onPress={takeImage}>
                <Ionicons name="camera" size={50}></Ionicons>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={{ height: 60, width: 60, borderRadius: 50, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 160, backgroundColor: '#2ABBA7', marginTop: 40 }}>
            <Ionicons
              onPress={TaoPhanAnh}
              name="checkmark-sharp" size={40} />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAwareScrollView>

    </View>
  );
};

export default PhanAnh;