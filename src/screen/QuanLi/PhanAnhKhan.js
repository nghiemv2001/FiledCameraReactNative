import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import shareVarible from '../../../AppContext'
import { useFocusEffect } from '@react-navigation/native'
import { AddressContext } from '../../component/AddressContext'
const PhanAnhKhan = ({navigation}) => {
  const {currentUserRole,currentUserId,} = useContext(AddressContext);
  const [danhsachPhanAnh, SetDanhSachPhanAnh] = useState(null);
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  //test data 
  const fetchData = () => {
    fetch(shareVarible.URLink + '/PhanAnh/ ', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => SetDanhSachPhanAnh(data),
      )
      .catch(error => console.log(error));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const renderlist = ((item) => {
    if ( item.trangthai === 1 || item.trangthai === 2|| item.trangthai === 3 ) {
      return null; // If trangthai is 0, return null to skip rendering this item
    }
    return (
      <View style={{
        height: 200, width: '100%', backgroundColor: 'white', borderBottomWidth: 10, justifyContent: 'center', alignItems: 'center'
      }}>
        <Image style={{ height: '60%', width: '90%', borderRadius: 30, marginBottom: 0 }} source={{ uri: item.hinhanh }} />
        <View style={{ height: 50, width: '90%', borderTopLeftRadius: 30 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text>Nội dung: </Text>
            <Text numberOfLines={1}>{item.noidung}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text >Vị trí: </Text>
            <Text numberOfLines={1}>{item.vitri}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text>Ngày đăng: </Text>
            <Text numberOfLines={1}>{item.gio}h{item.phut}' - {item.ngay}/{item.thang}/{item.nam}</Text>
            <TouchableOpacity style={{marginLeft: 100}}
            onPress={() => navigation.navigate('ThongTinPhanAnh', {item: item})}>
              <Text style={{color: "red"}}>Xem chi tiết....</Text>
            </TouchableOpacity>            
          </View>
        </View>
      </View>
    )
  })
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <FlatList
        style={{marginTop: 20}}
        data={danhsachPhanAnh}
        renderItem={({ item }) => {
          return renderlist(item)
        }}
        keyExtractor={item => item._id}
      />
    </View>
  )
}

export default PhanAnhKhan