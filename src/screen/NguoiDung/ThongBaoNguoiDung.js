import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import shareVarible from '../../../AppContext'

const ThongBaoNguoiDung = () => {

    const [thongbao, setThongBao] = useState(null)
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = () => {
        fetch(shareVarible.URLink + '/ThongBao/ ', {
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
    const renderlist = (item) => {
        return (
            <View style={{ height: 90, width: "100%", borderBottomWidth : 1, justifyContent: 'center', alignItems:'center' ,}}>
                <View style={{height: 75, width : '95%', backgroundColor:'#CCCCCC', borderRadius: 10}}>
                    <Text style={{marginTop: 6, marginLeft: 5}}>{item.noidung}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <FlatList
                data={thongbao}
                renderItem={({ item }) => {
                    return renderlist(item)
                }}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

export default ThongBaoNguoiDung