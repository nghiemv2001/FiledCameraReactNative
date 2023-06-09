import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import shareVarible from '../../../AppContext'
import { AddressContext } from './../../component/AddressContext';
import { useFocusEffect } from '@react-navigation/native'
const ChiTietThongBao = ({ navigation, route }) => {
  const LayThongTin = (type) => {
    if (route.params.item) {
      switch (type) {
        case "noidung":
          return route.params.item.noidung
        case "hinhanh":
          return route.params.item.hinhanh
        case "vitri":
          return route.params.item.vitri
      }
    }
    return ""
  }
  const [fdata, setFdata] = useState({
    noidung: LayThongTin("noidung"),
    hinhanh: LayThongTin("hinhanh"),
    vitri: LayThongTin("vitri"),
  })
  console.log(fdata)
  return (
    <View>
      <TouchableOpacity
            onPress={() => navigation.navigate('TrangChuNguoiDung')}
            style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 70, borderWidth: 1, marginTop: 20, marginLeft: 5 }}>
            <Ionicons name="chevron-back-sharp" size={35} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', marginTop: 20, paddingLeft: 10 }}>
            <Text style={{ fontSize: 25, fontWeight: '500' }}>Phản ánh: </Text>
            <Text style={{ fontSize: 25, fontWeight: '500', flexShrink: 1 }} numberOfLines={1} ellipsizeMode="tail">{fdata.noidung}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 12, paddingLeft: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: '500' }}>Vị trí: </Text>
            <Text style={{ fontSize: 18, fontWeight: '500', flexShrink: 1 }} numberOfLines={1} ellipsizeMode="tail">{fdata.vitri}</Text>
          </View>
          <Text style={{ marginTop: 40, paddingLeft: 10 }}>ảnh minh họa</Text>
          <Image style={{ height: '60%', width: '90%', borderRadius: 30, marginBottom: 0, borderWidth: 1, height: 190, width: 390, marginLeft: 10 }} source={{ uri: fdata.hinhanh }} />
    </View>
  )
}
export default ChiTietThongBao