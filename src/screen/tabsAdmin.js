import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import PhanAnhKhan from '../screen/QuanLi/PhanAnhKhan'
import PhanAnhChuaXuLi from '../screen/QuanLi/PhanAnhChuaXuLi'
import PhanAnhDangXuLi from '../screen/QuanLi/PhanAnhDangXuLi'
import PhanAnhDaXuLi from '../screen/QuanLi/PhanAnhDaXuLi'
import HeThongTaiKhoan from '../screen/Admin/HeThongTaiKhoan'
import { View, Text } from 'react-native'

const Tab = createBottomTabNavigator();
const tabsAdmin = ({ refreshData, onRefreshData, count }) => {
    return (
        <Tab.Navigator
        
            screenOptions={({ route }) => ({
                tabBarStyle: {height: 70 },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Khẩn') {
                        iconName = focused
                            ? 'ios-information-circle'
                            : 'ios-information-circle-outline';
                    } else if (route.name === 'Chưa xử lí') {
                        iconName = focused ? 'list' : 'list';
                    }
                    else if (route.name === 'Đang xử lí') {
                        iconName = focused ? 'list-circle-outline' : 'list-circle-outline';
                    }
                    else if (route.name === 'Đã xử lí') {
                        iconName = focused ? 'list-circle' : 'list-circle';
                    }
                    else if (route.name === 'Tài Khoản') {
                        iconName = focused ? 'people' : 'people';
                    }
                    return <Ionicons name={iconName} size={40} color={color} />;
                },
                tabBarLabel: ({ focused, color, size }) => {
                    let labelStyle = {
                        fontSize: focused ? 16 : 14, // Chỉnh kích thước chữ dựa trên trạng thái được chọn
                        fontWeight: focused ? 'bold' : 'normal', // Chỉnh kiểu chữ dựa trên trạng thái được chọn
                    };
                    return <Text style={labelStyle}>{route.name}</Text>;
                },
            }
            )}
            // tabBarOptions={{
            //     activeTintColor: 'tomato',
            //     inactiveTintColor: 'gray',
            // }}
        >
            <Tab.Screen name="Khẩn" component={PhanAnhKhan} initialParams={{ count }} options={{ headerShown : false }}/>
            <Tab.Screen name="Chưa xử lí" component={PhanAnhChuaXuLi} options={{headerShown : false }}/>
            <Tab.Screen name="Đang xử lí" component={PhanAnhDangXuLi} options={{headerShown : false }} initialParams={{ refreshData: true}}/>
            <Tab.Screen name="Đã xử lí" component={PhanAnhDaXuLi} options={{headerShown : false }}/>
            <Tab.Screen name="Tài Khoản" component={HeThongTaiKhoan} options={{headerShown : false }}/>
        </Tab.Navigator>

    )
}
export default tabsAdmin;