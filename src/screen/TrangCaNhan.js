import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import img_trangcanhan from '../../assets/trangcanhan.png'
import img_logout from '../../assets/logout.png'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useFocusEffect } from '@react-navigation/native'
import shareVarible from '../../AppContext'
import { AddressContext } from './../component/AddressContext';
const TrangCaNhan = ({ navigation, route }) => {
    const { setUserId, currentUserId } = useContext(AddressContext);
    const { setUserRole } = useContext(AddressContext);
    const [dataAPI, SetDataAPI] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        role: "",
        image: ""
    })
    const ThongTinNguoiDung = async () => {
        fetch(shareVarible.URLink + '/user/' + `${route.params.data.email}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data =>
               { SetDataAPI(data)
            setUserId(data._id);
            setUserRole(data.role);
            }
            )
            .catch(error => console.log(error));
    };
    useFocusEffect(
        React.useCallback(() => {
            ThongTinNguoiDung();
        }, [])
    );

    /////////
    const TimTrangChu = () => {
        console.log(dataAPI)
        if (dataAPI.role === "1") {
            navigation.navigate('TrangChuAdmin')
        }
        else if (dataAPI.role === "2") {
            navigation.navigate('QuanLi')
        }
        else {
            navigation.navigate('TrangChuNguoiDung')
        }
    }
    return (
        <View style={{ flex: 1, width: '100%', width: '100%' }}>
            <View style={{ width: '100%', height: "30%", marginTop: 20, flexDirection: 'row' }}>
                <TouchableOpacity style={{ width: "25%" }}
                    onPress={() => navigation.navigate('DangNhap')}
                ><Text style={{fontSize: 18, fontStyle: 'normal', textDecorationLine: 'underline', marginLeft: 10}}>Logout</Text>
                </TouchableOpacity>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Image style={{ height: 200, width: 200, borderRadius: 180 }} source={img_trangcanhan} />
                </View>
            </View>
            <TouchableOpacity style={{ zIndex: 1 }}>
                <Ionicons style={{ position: 'absolute', marginTop: -75, marginLeft: 230 }} name='pencil' size={30} />
            </TouchableOpacity>
            <View style={{ width: '100%', alignItems: 'center' }}>
                {
                    dataAPI.role == 1 ? <Text style={{ height: 40, width: '60%', textAlign: 'center', textAlignVertical: 'center' }}>Admin</Text> :
                        dataAPI.role == 2 ? <Text style={{ height: 40, width: '60%', textAlign: 'center', textAlignVertical: 'center' }}>Quản lí</Text> :
                            <Text style={{ height: 40, width: '60%', textAlign: 'center', textAlignVertical: 'center' }}>Người dùng</Text>
                }
            </View>
            <View style={{ width: '100%', height: "50%", alignItems: 'center', marginTop: 15 }}>
                <Text style={{ marginRight: 230 }}>Tên người dùng</Text>
                <Text style={{ height: 40, width: '80%', borderWidth: 1, borderRadius: 50, textAlignVertical: 'center', paddingLeft: 20 }}>{dataAPI.name}</Text>
                <Text style={{ marginRight: 280, marginTop: 10 }}>Email</Text>
                <Text style={{ height: 40, width: '80%', borderWidth: 1, borderRadius: 50, textAlignVertical: 'center', paddingLeft: 20 }}>{dataAPI.email}</Text>
                <Text style={{ marginRight: 230, marginTop: 10 }}>Số điện thoại</Text>
                <Text style={{ height: 40, width: '80%', borderWidth: 1, borderRadius: 50, textAlignVertical: 'center', paddingLeft: 20 }}>{dataAPI.phone}</Text>
            </View>
            <TouchableOpacity
                onPress={() => TimTrangChu()}
                style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name='md-home' size={55}></Ionicons>
            </TouchableOpacity>
        </View>
    )
}

export default TrangCaNhan