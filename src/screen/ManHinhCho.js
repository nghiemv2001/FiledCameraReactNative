import { View, Text,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import img_mahinhcho from '../../assets/manhinhcho.png'
const ManHinhCho = ({navigation}) => {
  return (
    <View style={{flex : 1, height : '100%', width:'100%'}}>
      <View style={{height: '30%', width : '100%'}}>
        <Text style={{height : 120, width : 120, backgroundColor : '#A7F5FF', borderRadius : 120}}/>
        <Text style={{height : 120, width : 120, backgroundColor : '#B3F6FF',opacity: 0.6, borderRadius : 120, position : 'absolute', marginTop : 70}}/>
        <Text style={{height : 80, width : 80, backgroundColor : '#B3F6FF', borderRadius : 120, position : 'absolute', marginTop : 35, marginLeft : 120}}/>
      </View><Text style={{height : 50, width : 50, backgroundColor : '#B3F6FF', borderRadius : 120, position : 'absolute', marginTop : 70, marginLeft :210}}/>
      <TouchableOpacity style ={{height: 100, width : 100 , borderRadius: 100, backgroundColor: '#A7F5FF', marginLeft: 290, marginTop: 120, position : 'absolute', justifyContent:'center', alignItems:'center'}}>
        <Ionicons name='arrow-forward-circle-outline' size={70} onPress={() => navigation.navigate('DangNhap')}/>
      </TouchableOpacity>
      <View style={{height: '20%', width : '100%'}}>
        <Text style={{fontSize : 40, fontWeight:'bold', marginLeft : 70}}>PHẢN ẢNH</Text>
        <Text style={{fontSize : 32, fontWeight:'400',marginLeft : 190}}>HIỆN TRƯỜNG</Text>
        
      </View>
      <View style={{height: '50%', width : '100%'}}>
        <Image style={{height: '100%', width: '100%'}} source={img_mahinhcho}/>
      </View>
    </View>
  )
}

export default ManHinhCho