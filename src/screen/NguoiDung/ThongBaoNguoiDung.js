import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import shareVarible from '../../../AppContext'
import { AddressContext } from './../../component/AddressContext';
import { useFocusEffect } from '@react-navigation/native'
const ThongBaoNguoiDung = ({navigation}) => {
    const { currentUserId } = useContext(AddressContext);
    const [thongbao, setThongBao] = useState(null)
    const [fdata, setFdata] = useState({
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
    useFocusEffect(
        React.useCallback(() => {
          fetchData();
        }, [])
      );
    const fetchData = () => {
        fetch(shareVarible.URLink + '/thongbao/' + `${currentUserId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => setThongBao(data),
            )
            .catch(error => console.log(error));
    }
    const XenThongTinThongBao = async(item) => {
            fdata.noidung =item.noidung
            fdata.userID =item.userID
            fdata.trangthai = 1;
            fdata.phut =item.phut
            fdata.gio =item.gio
            fdata.ngay =item.ngay
            fdata.thang =item.thang
            fdata.nam =item.nam
            fdata.noidungphananh =item.noidungphananh
            fdata.hinhanh =item.hinhanh
            fdata.vitri =item.vitri
            fdata.thoigian =item.thoigian
            const response = await fetch(shareVarible.URLink + '/thongbao/update/'+`${item._id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(fdata),
              }).then(res => res.json()).then(
                data => {
                  if (data.error) {
                    setErrormgs(data.error);
                    alert(data.error);
                  }
                  else {
                    navigation.navigate('ChiTietThongBao', {item : fdata})
                  }
                }
              )
    }
    const renderlist = (item) => {
        return (
            <TouchableOpacity
                onPress={() => XenThongTinThongBao(item)}
                style={{ height: 90, width: "100%", borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center', }}>
                {
                    (item.trangthai == 1) ?
                        <View style={{ height: 80, width: '95%', backgroundColor: 'white', borderRadius: 10 , borderWidth:1}}>
                            <Text
                                numberOfLines={3}
                                style={{ marginTop: 6, marginLeft: 5, height: 49, width: '100%' }}>{item.noidung}</Text>
                            <View></View>
                            <Text
                                style={{ marginTop: 6, marginLeft: 5, height: 20, width: '100%', marginLeft: 200, fontWeight: 'bold' }}
                                numberOfLines={1}>{item.gio}h{item.phut}' - {item.ngay}/{item.thang}/{item.nam}</Text>
                        </View>
                        :
                        <View style={{ height: 80, width: '95%', backgroundColor: '#CCCCCC', borderRadius: 10, borderWidth: 1 }}>

                            <Text
                                numberOfLines={3}
                                style={{ marginTop: 6, marginLeft: 5, height: 49, width: '100%' }}>{item.noidung}</Text>
                            <View></View>
                            <Text
                                style={{ marginTop: 6, marginLeft: 5, height: 20, width: '100%', marginLeft: 200, fontWeight: 'bold' }}
                                numberOfLines={1}>{item.gio}h{item.phut}' - {item.ngay}/{item.thang}/{item.nam}</Text>
                        </View>
                }
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'white'}}>
            <View style={{padding: 5, position:'absolute', height: 25, width: 220, backgroundColor: 'white', marginTop: 30, marginLeft: 19, zIndex: 1}}>
                <Text style={{marginRight : 190, fontSize: 22, fontWeight: '600', height: 50, width: 250}}>Danh sách thông báo</Text>
            </View>
            <View style={{height : '90%', width: "90%", borderWidth: 4, marginTop: 50, marginLeft: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
 <FlatList
                style={{ marginTop: 15 }}
                data={thongbao}
                renderItem={({ item }) => {
                    return renderlist(item)
                }}
                keyExtractor={item => item._id}
            />
            </View>
        </View>
    )
}

export default ThongBaoNguoiDung