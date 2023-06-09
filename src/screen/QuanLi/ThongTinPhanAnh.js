import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker';
import shareVarible from '../../../AppContext'
import CheckBox from 'expo-checkbox';
import { AddressContext } from './../../component/AddressContext';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { cos } from 'react-native-reanimated';
import moment from 'moment';
// Trong component PhanAnh
const ThongTinPhanAnh = ({ navigation, route }) => {
  const LayThongTin = (type) => {
    if (route.params.item) {
      switch (type) {
        case "id":
          return route.params.item._id
        case "noidung":
          return route.params.item.noidung
        case "trangthai":
          return route.params.item.trangthai
        case "hinhanh":
          return route.params.item.hinhanh
        case "vitri":
          return route.params.item.vitri
        case "latitudeDelta":
          return route.params.item.latitudeDelta
        case "longitudeDelta":
          return route.params.item.longitudeDelta
        case "phut":
          return route.params.item.phut
        case "gio":
          return route.params.item.gio
        case "ngay":
          return route.params.item.ngay
        case "thang":
          return route.params.item.thang
        case "nam":
          return route.params.item.nam
        case "thoigianxuli":
          return route.params.item.thoigianxuli
      }
    }
    return ""
  }
  const [fdata, setFdata] = useState({
    id: LayThongTin("id"),
    noidung: LayThongTin("noidung"),
    trangthai: LayThongTin("trangthai"),
    hinhanh: LayThongTin("hinhanh"),
    vitri: LayThongTin("vitri"),
    latitudeDelta: LayThongTin("latitudeDelta"),
    longitudeDelta: LayThongTin("longitudeDelta"),
    phut: LayThongTin("phut"),
    gio: LayThongTin("gio"),
    ngay: LayThongTin('ngay'),
    thang: LayThongTin("thang"),
    nam: LayThongTin("nam"),
    thoigianxuli: LayThongTin("thoigianxuli"),
  })
  console.log(fdata)
  const [fthongbao, setThongBao] = useState({
    noidung: "",
    trangthai: 0,
    userID: "",
    phut: "",
    gio: "",
    ngay: "",
    thang: "",
    nam: "",
    noidungphananh: "",
    hinhanh: "",
    vitri: "",
    thoigian: ""
  })
  const { currentAddress, currentLatitude, currentLongitude, setCoordinates, setAddress,currentUserRole,currentUserId} = useContext(AddressContext);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [Errormgs, setErrormgs] = useState(null)
  const [coordinate, setCoordinate] = useState({
    latitude: parseFloat(fdata.latitudeDelta),
    longitude: parseFloat(fdata.longitudeDelta),
  });

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
          setCoordinates(fdata.latitudeDelta, fdata.longitudeDelta);
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
  };

  //function XuLIPhanAnh
  const XacNhanPhanAnh = () => {
    Alert.alert('Xác nhận', 'Xử Lí Phản Ánh ?', [
      {
        text: 'Cancel',
      },
      { text: 'OK', onPress: () => XuLiPhanAnh() },
    ]);
  }
  const XuLiPhanAnh = () => {
    fdata.trangthai = 2;
    ///xoamotphananh
    fetch(shareVarible.URLink + '/PhanAnh/delete/' + `${fdata.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
      })
      .catch(error => {
        console.error('Error', error);
      }
      )
    //Themphananhdangxuli
    fetch(shareVarible.URLink + '/PhanAnhDangXuLi/create',
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
        }
      )
     //Tạo một thông báo 
     const now = new Date();
     fthongbao.noidung = "Phản ảnh " + `${fdata.noidung}` + " đã được cán bộ xử lí vào thời gian: " + `${fdata.gio}` + "giờ " + `${fdata.phut}` + 'phút ' + `${fdata.ngay}` + "/" + `${fdata.thang}` + "/" + `${fdata.nam}`;
     fthongbao.userID = currentUserId;
     fthongbao.trangthai = 0;
     fthongbao.phut = now.getMinutes();
     fthongbao.gio = now.getHours();
     fthongbao.ngay = now.getDate();
     fthongbao.thang = now.getMonth() + 1;
     fthongbao.nam = now.getFullYear();
     fthongbao.noidungphananh = fdata.noidung
     fthongbao.hinhanh = fdata.hinhanh
     fthongbao.vitri = currentAddress
     fthongbao.thoigian = `${fdata.gio}` + "giờ" + `${fdata.phut}` + 'phút' + `${fdata.ngay}` + "/" + `${fdata.thang}` + "/" + `${fdata.nam}`
     fetch(shareVarible.URLink + '/ThongBao/create',
     {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(fthongbao)
     }).then(res => res.json()).then(
       data => {
         if (data.error) {
           setErrormgs(data.error);
           console.log(data.error)
           alert(data.error);
         }
         else {
          Alert.alert('Thông báo', 'Thành công !')
          if(currentUserRole == 1){
            navigation.navigate('TrangChuAdmin')
          }
          else{
            navigation.navigate('QuanLi')
          }
        }
       }
     )
  
    }
  //
  const XacNhanHoanThanhPhanAnh = () => {
    Alert.alert('Xác nhận', 'Xử lí phản ảnh kết thúc!', [
      {
        text : 'Cancel'
      },
      {text: 'OK', onPress: () => PhanhAnhHoanThanh()},
    ]);
  }
  const PhanhAnhHoanThanh = ()=>{
     const now = moment(); 
    const targetDate = moment({
      year: fdata.nam,
      month: fdata.thang - 1, 
      hours: fdata.gio,
      minutes: fdata.phut,
    });
    const duration = moment.duration(now.diff(targetDate));
    const timeDiffInHours = duration.asHours();
    const timeDiffInDays = duration.asDays();
    const totalDays = Math.floor(timeDiffInDays);
    const remainingHours = Math.floor(timeDiffInHours % 24); 
    fdata.thoigianxuli = totalDays.toString() + " ngày " + remainingHours.toString() + " giờ";
    fdata.trangthai = 3;
    ///xoamotphananh
    fetch(shareVarible.URLink + '/PhanAnhDangXuLi/delete/' + `${fdata.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
      })
      .catch(error => {
        console.error('Error', error);
      }
      )
    //Themphananhdahoanthanh
    fetch(shareVarible.URLink + '/PhanAnhHoanThanh/create',
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
        }
      )
      //Tạo một thông báo 
      const now1 = new Date();
     fthongbao.noidung = "Phản ảnh " + `${fdata.noidung}` + " đã được cán bộ xử lí hoàn thành vào thời gian: " + `${fdata.gio}` + "giờ " + `${fdata.phut}` + 'phút ' + `${fdata.ngay}` + "/" + `${fdata.thang}` + "/" + `${fdata.nam}`;
     fthongbao.userID = currentUserId;
     fthongbao.trangthai = 0;
     fthongbao.phut = now1.getMinutes();
     fthongbao.gio = now1.getHours();
     fthongbao.ngay = now1.getDate();
     fthongbao.thang = now1.getMonth() + 1;
     fthongbao.nam = now1.getFullYear();
     fthongbao.noidungphananh = fdata.noidung
     fthongbao.hinhanh = fdata.hinhanh
     fthongbao.vitri = currentAddress
     fthongbao.thoigian = `${fdata.gio}` + "giờ" + `${fdata.phut}` + 'phút' + `${fdata.ngay}` + "/" + `${fdata.thang}` + "/" + `${fdata.nam}`
     fetch(shareVarible.URLink + '/ThongBao/create',
     {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(fthongbao)
     }).then(res => res.json()).then(
       data => {
         if (data.error) {
           setErrormgs(data.error);
           console.log(data.error)
           alert(data.error);
         }
         else {
          Alert.alert('Thông báo', 'Thành công !')
          if(currentUserRole == 1){
            navigation.navigate('TrangChuAdmin')
          }
          else{
            navigation.navigate('QuanLi')
          }
          
        }
       }
     )
    console.log(fthongbao)
  }
  //
  const XacNhanXoaPhanAnh = () => {
    Alert.alert('Xác nhận', 'Xóa phản ảnh này!', [
      {
        text : 'Cancel'
      },
      {text: 'OK', onPress: () => XoaPhanhAnh()},
    ]);
  }

  const XoaPhanhAnh =()=>{
    fetch(shareVarible.URLink + '/PhanAnhHoanThanh/delete/' + `${fdata.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
            Alert.alert('Thông báo', 'Thành công !')
            if(currentUserRole == 1){
              navigation.navigate('TrangChuAdmin')
            }
            else{
              navigation.navigate('QuanLi')
            }
      })
      .catch(error => {
        console.error('Error', error);
      }
      )
  }
  return (
    <View style={{ backgroundColor: "#B0EDF5" }}>
      <KeyboardAwareScrollView style={{ height: "100%", width: "100%" }}>
        <ScrollView>
          {
            (currentUserRole == 1) ? 
            <TouchableOpacity
            onPress={() => navigation.navigate('TrangChuAdmin')}
            style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 70, borderWidth: 1, marginTop: 20, marginLeft: 5 }}>
            <Ionicons name="chevron-back-sharp" size={35} />
          </TouchableOpacity>
            :
            <TouchableOpacity
            onPress={() => navigation.navigate('QuanLi')}
            style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 70, borderWidth: 1, marginTop: 20, marginLeft: 5 }}>
            <Ionicons name="chevron-back-sharp" size={35} />
          </TouchableOpacity>
          }
          <View style={{ flexDirection: 'row', marginTop: 10, paddingLeft: 10 }}>
            <Text style={{ fontSize: 25, fontWeight: '500' }}>Phản ánh: </Text>
            <Text style={{ fontSize: 25, fontWeight: '500', flexShrink: 1 }} numberOfLines={1} ellipsizeMode="tail">{fdata.noidung}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5, paddingLeft: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: '500' }}>Vị trí: </Text>
            <Text style={{ fontSize: 18, fontWeight: '500', flexShrink: 1 }} numberOfLines={1} ellipsizeMode="tail">{fdata.vitri}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5, paddingLeft: 10 }}>
            {
              (fdata.trangthai == 3)
                ? <Text style={{ fontSize: 18, fontWeight: '500', flexShrink: 1 }} ellipsizeMode="tail">Thời gian xử lí: {fdata.thoigianxuli}</Text>
                :
                <Text style={{ fontSize: 18, fontWeight: '500', flexShrink: 1 }} ellipsizeMode="tail">Thời gian: {fdata.gio}h{fdata.phut}' - {fdata.ngay}/{fdata.thang}/{fdata.nam}</Text>
            }
          </View>
          <Text style={{ marginTop: 10, paddingLeft: 10 }}>bản đồ</Text>
          <View style={{ height: 190, width: 390, marginLeft: 10 }}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                ...coordinate,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation={true}
              showsMyLocationButton={true}
            >
              <Marker coordinate={coordinate} title="Địa điểm" />
            </MapView>
          </View>
          <Text style={{ marginTop: 10, paddingLeft: 10 }}>ảnh minh họa</Text>
          <Image style={{ height: '60%', width: '90%', borderRadius: 30, marginBottom: 0, borderWidth: 1, height: 190, width: 390, marginLeft: 10 }} source={{ uri: fdata.hinhanh }} />
          {
            (fdata.trangthai === 1 || fdata.trangthai === 0) ?
              <TouchableOpacity
                onPress={() => XacNhanPhanAnh()}
                style={{ justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 10 }}>
                <Text style={{ height: 50, width: 300, textAlign: 'center', fontSize: 22, backgroundColor: 'white', textAlignVertical: 'center', borderRadius: 12, fontWeight: '500' }}>XỬ LÍ</Text>
              </TouchableOpacity>
              : (fdata.trangthai === 2) ?
                <TouchableOpacity
                  onPress={() => XacNhanHoanThanhPhanAnh()}
                  style={{ justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 10 }}>
                  <Text style={{ height: 50, width: 300, textAlign: 'center', fontSize: 22, backgroundColor: 'white', textAlignVertical: 'center', borderRadius: 12, fontWeight: '500' }}>HOÀN THÀNH</Text>
                </TouchableOpacity>
                : (fdata.trangthai === 3) ?
                <TouchableOpacity
                  onPress={() => XacNhanXoaPhanAnh()}
                  style={{ justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 10 }}>
                  <Text style={{ height: 50, width: 300, textAlign: 'center', fontSize: 22, backgroundColor: 'white', textAlignVertical: 'center', borderRadius: 12, fontWeight: '500' }}>XÓA</Text>
                </TouchableOpacity>
                : null
          }

        </ScrollView>
      </KeyboardAwareScrollView>

    </View>
  );
};

export default ThongTinPhanAnh;