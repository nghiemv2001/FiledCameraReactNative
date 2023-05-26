import {View,Text,StyleSheet,TextInput,Image,TouchableOpacity,FlatList, Alert} from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import shareVarible from '../../../AppContext'
const TinTuc = () => {
  const [danhsachPhanAnh, SetDanhSachPhanAnh] = useState(null);
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
    console.log(danhsachPhanAnh)
  }, []);
  const renderlist = ((item) => {
    return (
      <View style={{
        height: 200, width: '100%', backgroundColor: 'red', borderBottomWidth: 10
      }}>
        <Image style={{height: '100%', width: '100%'}}  source={{ uri: item.hinhanh }}/>
        <View style={{height: 100, width: 200, marginLeft: 230, marginTop: 90, borderTopLeftRadius: 30, zIndex: 1, position:'absolute', backgroundColor:'white'}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', padding: 10, paddingRight: 18}} multiline={true}>{item.noidung}</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', paddingHorizontal: 10}} multiline={true}>{item.vitri}</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', padding: 10, paddingRight: 18}} multiline={true}>{item.noidung}</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', padding: 10, paddingRight: 18}} multiline={true}>{item.noidung}</Text>
        </View>
      </View>

    )
  })
  return (
    <View style={{width:'100%', height: '100%'}}>
        <FlatList
          data={danhsachPhanAnh}
          renderItem={({ item }) => {
            return renderlist(item)
          }}
          keyExtractor={item => item._id}
        />
      </View>
  )
}

export default TinTuc