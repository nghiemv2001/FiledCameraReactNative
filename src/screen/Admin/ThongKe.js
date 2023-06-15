import { View, Text, TouchableOpacity , Alert} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Dimensions } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import SelectDropdown from 'react-native-select-dropdown'
import shareVarible from '../../../AppContext'
const ThongKe = () => {
    const months = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",]
    const years = Array.from({ length: 510 }, (_, i) => 2000 + i); // Generate an array of years from 2000 to 2100
    const [month, setMonth] = useState(null)
    const [year, setYear] = useState(null)
    const [khan, setKhan] = useState(0)
    const [chuaxuli, setChuaXuLi] = useState(0)
    const [dangxuli, setDangXuLi] = useState(0)
    const [hoanthanh, setHoanThanh] = useState(0)
    const [trangthai, setTrangThai] = useState(0)
    const data = [
        {
            name: "khẩn",
            population: khan,
            color: "red",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "chưa xử lý",
            population: chuaxuli,
            color: "#FF4500",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Đang xử lý",
            population: dangxuli,
            color: "yellow",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Đã xử lý ",
            population: hoanthanh,
            color: "green",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
    ];
    const databarchart = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43]
            }
        ]
    };
    const XemToanBo = () => {
        setTrangThai(0)
        const fetchCount = (url, setter) => {
            fetch(shareVarible.URLink + url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    setter(data);
                })
                .catch(error => {
                    console.error(error);
                });
        };

        fetchCount('/PhanAnhChuaXuLi/count', setChuaXuLi);
        fetchCount('/PhanAnhKhan/count', setKhan);
        fetchCount('/PhanAnhDangXuLi/count', setDangXuLi);
        fetchCount('/PhanAnhHoanThanh/count', setHoanThanh);
    };
    const XemKetQua = () => {
        if (month == null || year == null) {
            Alert.alert("Thông báo","Bạn cần cung cấp thời gian cụ thể về tháng và năm!")
        }
        else {
            setTrangThai(1)
            const fetchCount = (url, setter) => {
                fetch(shareVarible.URLink + url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        setter(data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            };
            fetchCount('/PhanAnhChuaXuLi/count/' + `${month}` + '/' + `${year}`, setChuaXuLi);
            fetchCount('/PhanAnhKhan/count/' + `${month}` + '/' + `${year}`, setKhan);
            fetchCount('/PhanAnhDangXuLi/count/' + `${month}` + '/' + `${year}`, setDangXuLi);
            fetchCount('/PhanAnhHoanThanh/count/' + `${month}` + '/' + `${year}`, setHoanThanh);
        }
    }
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };
    return (
        <View>
            <View style={{ flexDirection: 'row', marginTop: 25 }}>
                <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 20 }}>Tháng</Text>
                <SelectDropdown

                    buttonStyle={{ width: 120, }}
                    rowStyle={{ height: 40 }}
                    data={months}
                    onSelect={(selectedItem, index) => {
                        setMonth(index + 1)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                />
                <Text style={{ fontSize: 20, marginTop: 10 }}>Năm</Text>
                <SelectDropdown
                    buttonStyle={{ width: 120 }}
                    data={years}
                    onSelect={(selectedItem, index) => {
                        setYear(index + 2000)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                />
            </View>

            <PieChart
            style={{marginLeft: 10}}
                data={data}
                width={Dimensions.get('window').width}
                height={320}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[10, 0]}
                absolute
            />
            {
                (trangthai == 0)?<Text style={{marginLeft: 10, fontSize: 18, marginBottom: 10}}>
                Trên hệ thống hiện có :
                
            </Text>:<Text style={{marginLeft: 10, fontSize: 18, marginBottom: 10}}>
                Thống kê theo tháng {month} / {year} :
            </Text>
            }
            
            <View style={{ marginLeft: 170 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ height: 15, width: 15, borderWidth: 2, backgroundColor: "red" , marginRight: 10}}></Text><Text>{khan} phản ảnh chưa xử lí</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ height: 15, width: 15, borderWidth: 2, marginTop: 5, backgroundColor: "#FF4500", marginRight: 10 }}></Text><Text>{chuaxuli} phản ảnh chưa xử lí</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ height: 15, width: 15, borderWidth: 2, marginTop: 5, backgroundColor: "yellow", marginRight: 10 }}></Text><Text>{dangxuli} phản ảnh chưa xử lí</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ height: 15, width: 15, borderWidth: 2, marginTop: 5, backgroundColor: "green", marginRight: 10 }}></Text><Text>{hoanthanh} phản ảnh chưa xử lí</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                <TouchableOpacity
                    onPress={XemToanBo}>
                    <Text style={{ height: 50, width: 120, borderWidth: 1, borderRadius: 120, textAlign: 'center', textAlignVertical: 'center' }}>Xem toàn bộ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={XemKetQua}
                >
                    <Text style={{ height: 50, width: 120, borderWidth: 1, borderRadius: 120, textAlign: 'center', textAlignVertical: 'center', marginLeft: 10 }}>Kết quả</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default ThongKe