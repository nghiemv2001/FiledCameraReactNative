import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DangNhap from './src/screen/DangNhap'
import DangKy from './src/screen/DangKy'
import ManHinhCho from './src/screen/ManHinhCho'
import TrangCaNhan from './src/screen/TrangCaNhan';
//admin
import TrangChuAdmin from './src/screen/Admin/TrangChuAdmin';
//quanli
import TrangChuQuanLi from './src/screen/QuanLi/TrangChuQuanLi';
//nguoidung
import TrangChuNguoiDung from './src/screen/NguoiDung/TrangChuNguoiDung';
import PhanAnh from './src/screen/NguoiDung/PhanAnh';
const Stack = createNativeStackNavigator();
export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="PhanAnh" component={PhanAnh} options={{
          headerShown: false
        }} />
        <Stack.Screen name="ManHinhCho" component={ManHinhCho} options={{
          headerShown: false
        }} /> 
        <Stack.Screen name="TrangCaNhan" component={TrangCaNhan} options={{
          headerShown: false
        }} />
        <Stack.Screen name="DangKy" component={DangKy} options={{
          headerShown: false
        }} />
        <Stack.Screen name="DangNhap" component={DangNhap} options={{
          headerShown: false
        }} />
        <Stack.Screen name="TrangChuAdmin" component={TrangChuAdmin} options={{
          headerShown: false
        }} />
        <Stack.Screen name="TrangChuQuanLi" component={TrangChuQuanLi} options={{
          headerShown: false
        }} />
        <Stack.Screen name="TrangChuNguoiDung" component={TrangChuNguoiDung} options={{
          headerShown: false
        }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
