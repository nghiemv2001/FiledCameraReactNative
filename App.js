import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DangNhap from './src/screen/DangNhap'
import DangKy from './src/screen/DangKy'
import ManHinhCho from './src/screen/ManHinhCho'
import TrangCaNhan from './src/screen/TrangCaNhan';
import QuenMatKhau from './src/screen/QuenMatKhau';
import NhapMaOPT from './src/screen/NhapMaOTP';
import MatKhauMoi from './src/screen/MatKhauMoi'
//admin
import TrangChuAdmin from './src/screen/Admin/TrangChuAdmin';
//quanli
import TrangChuQuanLi from './src/screen/QuanLi/TrangChuQuanLi';
import QuanLi from './src/screen/QuanLi/QuanLi';
import ThongTinPhanAnh from './src/screen/QuanLi/ThongTinPhanAnh';
import PhanAnhDangXuLi from './src/screen/QuanLi/PhanAnhDangXuLi';
//nguoidung
import TrangChuNguoiDung from './src/screen/NguoiDung/TrangChuNguoiDung';
import PhanAnh from './src/screen/NguoiDung/PhanAnh';
import TinTuc from './src/screen/NguoiDung/TinTuc';
import MapGG from './src/screen/NguoiDung/MapGG'
import ThongBaoNguoiDung from './src/screen/NguoiDung/ThongBaoNguoiDung';
import ChiTietThongBao from './src/screen/NguoiDung/ChiTietThongBao'
import { AddressProvider } from './src/component/AddressContext';
const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <NavigationContainer>
      <AddressProvider>
        <Stack.Navigator>
          <Stack.Screen name="TrangChuAdmin" component={TrangChuAdmin} options={{
            headerShown: false
          }} />
          <Stack.Screen name="DangNhap" component={DangNhap} options={{
            headerShown: false
          }} />
          <Stack.Screen name="TrangChuNguoiDung" component={TrangChuNguoiDung} options={{
            headerShown: false
          }} />
          <Stack.Screen name="TrangChuQuanLi" component={TrangChuQuanLi} options={{
            headerShown: false
          }} />
          
          <Stack.Screen name="QuanLi" component={QuanLi} options={{
            headerShown: false
          }} />
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
          <Stack.Screen name="TinTuc" component={TinTuc} options={{
            headerShown: false
          }} />
          <Stack.Screen name="MapGG" component={MapGG} options={{
            headerShown: false
          }} />
          <Stack.Screen name="ThongTinPhanAnh" component={ThongTinPhanAnh} options={{
            headerShown: false
          }} />
          <Stack.Screen name="PhanAnhDangXuLi" component={PhanAnhDangXuLi} options={{
            headerShown: false
          }} />
          <Stack.Screen name="ThongBaoNguoiDung" component={ThongBaoNguoiDung} options={{
            headerShown: false
          }} />
          <Stack.Screen name="ChiTietThongBao" component={ChiTietThongBao} options={{
            headerShown: false
          }} />
          <Stack.Screen name="QuenMatKhau" component={QuenMatKhau} options={{
            headerShown: false
          }} />
          <Stack.Screen name="NhapMaOTP" component={NhapMaOPT} options={{
            headerShown: false
          }} />
          <Stack.Screen name="MatKhauMoi" component={MatKhauMoi} options={{
            headerShown: false
          }} />
        </Stack.Navigator>
      </AddressProvider>
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
