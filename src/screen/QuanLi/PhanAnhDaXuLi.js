import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import shareVarible from '../../../AppContext'
const PhanAnhDaXuLi = () => {
  const [danhsachPhanAnh, SetDanhSachPhanAnh] = useState(null);
  //test data 
  const fetchData = () => {
    fetch(shareVarible.URLink + '/PhanAnhDangXuLi/ ', {
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
    console.log(danhsachPhanAnh)
  }, []);
  const renderlist = ((item) => {
    if (item.trangthai === 0 || item.trangthai === 1|| item.trangthai === 2 ) {
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
            <Text>Ngày : </Text>
            <Text numberOfLines={1}>{item.ngay}/{item.thang}/{item.nam}</Text>
          </View>
        </View>
      </View>
    )
  })
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <FlatList
       style={{marginTop: 10}}
        data={danhsachPhanAnh}
        renderItem={({ item }) => {
          return renderlist(item)
        }}
        keyExtractor={item => item._id}
      />
    </View>
  )
}

export default PhanAnhDaXuLi