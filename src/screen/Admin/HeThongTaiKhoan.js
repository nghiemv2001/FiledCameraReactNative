import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import shareVarible from '../../../AppContext'

const HeThongTaiKhoan = () => {
  const [danhsachPhanAnh, SetDanhSachPhanAnh] = useState([{
    "_id":
      "6466a90babf9a01bbb8339da",
    "name":
      "Quan Li Khu 2",
    "email":
      "QuanLi@gmail.com",
    "phone":
      "0829019209",
    "password":
      "$2b$08$fN4332SmDzNcd5Yfdm.k9OrFpO1J39KPViPf5ee02hxvdVzQihfba",
    "keycode":
      "0",
    "role":
      "2",
    "image":
      "https://res.cloudinary.com/dmsgfvp0y/image/upload/v1683214084/sgsbkijr…"
  }]);
  const renderlist = ((item) => {
    return (
      <View style={{ height: 120, width: '100%', borderBottomWidth: 3, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ height: 100, width: 100, borderWidth: 1, borderRadius: 100 }}></View>
        <View style={{ flexDirection: 'column', marginLeft: 10 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold' }}>{item.name}</Text>
          {
            (item.role == 2) ? <Text style={{ fontSize: 22 }}>Quản Lí</Text>
              : <Text style={{ fontSize: 22 }}>Người dùng</Text>
          }
        </View>
        <View style={{ flexDirection: 'column', marginLeft: 50 }}>
          <TouchableOpacity>
            <Ionicons name="pencil" size={40} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='close-circle-sharp' size={40} />
          </TouchableOpacity>


        </View>
      </View>
    )
  })
  return (
    <View style={{ flex: 1 }}>
      <FlatList style={{ flex: 1, marginTop: 30 }}
        data={danhsachPhanAnh}
        renderItem={({ item }) => {
          return renderlist(item)
        }}
        keyExtractor={item => item._id}
      />
    </View>
  )
}

export default HeThongTaiKhoan