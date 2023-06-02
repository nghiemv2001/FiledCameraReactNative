import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState,useEffect } from 'react'
import img_trangcanhan from '../../assets/trangcanhan.png'
import img_logout from '../../assets/logout.png'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useFocusEffect } from '@react-navigation/native'
import shareVarible from '../../AppContext'
const TrangCaNhan = ({navigation, route}) => {
    const [dataAPI, SetDataAPI] = useState({
        name : "",
        email:"",
        phone : "",
        role :"",
        image:""
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
          .then(data => SetDataAPI(data),
          )
          .catch(error => console.log(error));
      };
      useFocusEffect(
        React.useCallback(() => {
          ThongTinNguoiDung();
        }, [])
      );
    /////////
    const TimTrangChu=()=>{
        if(dataAPI.role === "1"){
            navigation.navigate('TrangChuAdmin')
        }
        else if(dataAPI.role === "2"){
            navigation.navigate('TrangChuQuanLi')
        }
        else{
            navigation.navigate('TrangChuNguoiDung')
        }
    }
    return (
        <View style={{ flex: 1, width: '100%', width: '100%' }}>
            <View style={{ width: '100%', height: "30%", marginTop: 20, flexDirection: 'row' }}>
                <TouchableOpacity style={{ width: "25%" }}
                    onPress={() => navigation.navigate('DangNhap')}    
                >
                    {
                        dataAPI.image != "" ?  <Image style={{ height: 60, width: 60, borderRadius: 60, marginTop: 10, marginLeft: 20, zIndex: 1 }} source={img_logout} />
                        :<Image style={{ height: 60, width: 60, borderRadius: 60, marginTop: 10, marginLeft: 20, zIndex: 1 }} source={img_logout} />
                        
                    }
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
                <Text style={{ height: 40, width: '80%', borderWidth: 1, borderRadius: 50, textAlignVertical:'center', paddingLeft: 20 }}>{dataAPI.name}</Text>
                <Text style={{ marginRight: 280, marginTop: 10 }}>Email</Text>
                <Text style={{ height: 40, width: '80%', borderWidth: 1, borderRadius: 50, textAlignVertical:'center', paddingLeft: 20 }}>{dataAPI.email}</Text>
                <Text style={{ marginRight: 230, marginTop: 10 }}>Số điện thoại</Text>
                <Text style={{ height: 40, width: '80%', borderWidth: 1, borderRadius: 50, textAlignVertical:'center', paddingLeft: 20 }}>{dataAPI.phone}</Text>
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