import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import { Button, Dialog, Portal, Provider } from 'react-native-paper';
import React, { useMemo, useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import shareVarible from '../../../AppContext'
import { useFocusEffect } from '@react-navigation/native'
import RadioGroup,{RadioButtonProps} from 'react-native-radio-buttons-group';
const HeThongTaiKhoan = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  const [visible, setVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // State variable to store the selected item
  const [role , SetRole] = useState(1)
  const [fdata, setFData] = useState({
    name : "",
    email:"",
    image:"",
    password:"",
    phone : "",
    role:"",
    keycode :"0"
  })
  const showDialog = (item) => {
    setSelectedItem(item); // Store the selected item in the state variable
    setVisible(true);
    SetRole(item.role)
    setFData({ ...fdata, name: item.name,email: item.email,image: item.image,password: item.password,phone: item.phone,role: item.role, })
    setSelectedId(item.role);
  };
  const CapNhatQuyen = async (item)=>{
    if(selectedId != role){
      fdata.role = selectedId
      console.log("OK", fdata)
      const response = await fetch(shareVarible.URLink + '/user/update/'+`${item._id}`, {
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
            alert('Thành công');
            fetchData();
          }
        }
      )
    }
    setVisible(false)
  }
  const hideDialog = () => {
    Alert.alert('Xác nhận', 'Cập nhật quyền này cho tài khoản ?', [
      {
        text: 'Cancel',
        onPress: () => setVisible(false),
      },
      {
        text: 'OK',
        onPress: () => CapNhatQuyen(selectedItem), // Use the selected item from the state variable
      },
    ]);
  };
  const closeDialog =()=>{
    setVisible(false)
  }
  const [danhsachtaikhoan, SetDanhSachTaiKhoan] = useState(null);
  const radioButtons = useMemo(() => ([
    {
        id: '1',
        label: 'Người dùng',
    },
    {
        id: '2',
        label: 'Quản lí        ',
    }
]), []);
  const [selectedId, setSelectedId] = useState();
  const fetchData = () => {
    fetch(shareVarible.URLink + '/users/ ', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => SetDanhSachTaiKhoan(data),
      )
      .catch(error => console.log(error));
  };
  const XoaTaiKhoan = (item) => {
    const { _id, name } = item; // Destructure the properties from the "item" object
    Alert.alert('Xác nhận', `Xóa tài khoản "${name}"?`, [
      {
        text: 'Cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          fetch(shareVarible.URLink + '/user/delete/' + `${item._id}`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(response => response.json())
            .then(data => {
              Alert.alert('Thông báo', 'Thành công!')
              fetchData();
            })
            .catch(error => {
              console.error('Error', error);
            });
        }
      },
    ]);
  };

  const renderlist = ((item) => {
    return (
      <View style={{ height: 120, width: '100%', borderBottomWidth: 3, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ height: 100, width: '25%' }}>
          <Image
            style={{ height: "100%", width: '100%', borderWidth: 1, borderRadius: 100}}
            source={{ uri: item.image }}/>
        </View>
        <View style={{ flexDirection: 'column', marginLeft: 10, width: '45%' }}>
          <Text
            numberOfLines={1}
            style={{ fontSize: 28, fontWeight: 'bold' }}>{item.name}</Text>
          {
            (item.role == 2) ? <Text style={{ fontSize: 22 }}>Quản Lí</Text>
              : <Text style={{ fontSize: 22 }}>Người dùng</Text>
          }
        </View>
        <View style={{ flexDirection: 'column', marginLeft: 50, with: '20%' }}>
          <TouchableOpacity>
            <Ionicons
              onPress={() =>showDialog(item)}
              name="pencil" size={40} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name='close-circle-sharp' size={40}
              onPress={() => XoaTaiKhoan(item)}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  })
  return (
    <View style={{ flex: 1 }}>
      <Provider>
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={hideDialog}
          >
            <Dialog.Title>Quyền</Dialog.Title>
            <Dialog.Content>
              <RadioGroup
                radioButtons={radioButtons}
                onPress={setSelectedId}
                selectedId={selectedId}
              />
            </Dialog.Content>
            <Dialog.Actions>
            <Button onPress={closeDialog}>cancel</Button>
              <Button onPress={hideDialog}>Xác nhận</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <FlatList
          style={{ flex: 1, marginTop: 30 }}
          data={danhsachtaikhoan}
          renderItem={({ item }) => {
            return renderlist(item)
          }}
          keyExtractor={item => item._id}
        />
      </Provider>
    </View>
  );
}

export default HeThongTaiKhoan