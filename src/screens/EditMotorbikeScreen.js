import React, { useState } from 'react';
import { View, TextInput, Button, Image, Alert, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateMotorbike } from '../redux/motorbikeSlice';
import ImagePicker from 'react-native-image-picker';

const EditMotorbikeScreen = ({ route, navigation }) => {
    const { motorbikeId } = route.params;
    const motorbike = useSelector((state) => state.motorbikes.list.find((bike) => bike.id === motorbikeId));
    const [tenXe, setTenXe] = useState(motorbike.tenXe);
    const [mauSac, setMauSac] = useState(motorbike.mauSac);
    const [giaBan, setGiaBan] = useState(motorbike.giaBan);
    const [moTa, setMoTa] = useState(motorbike.moTa);
    const [hinhAnh, setHinhAnh] = useState(motorbike.hinhAnh);
    const dispatch = useDispatch();

    const handleUpdateMotorbike = () => {
        if (!tenXe || !mauSac || !giaBan || !moTa || !hinhAnh) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin.');
            return;
        }
        dispatch(updateMotorbike({ id: motorbikeId, tenXe, mauSac, giaBan, moTa, hinhAnh }));
        navigation.goBack();
    };

    const handleImagePicker = () => {
        ImagePicker.showImagePicker({}, (response) => {
            if (response.uri) {
                setHinhAnh(response.uri);
            }
        });
    };

    return (
        <View>
             {hinhAnh ? <Image source={{ uri: hinhAnh }} style={{ width: 100, height: 100 }} /> : null}
            <Text>Nhập tên xe:</Text>
            <TextInput placeholder="Tên xe" value={tenXe} onChangeText={setTenXe} />
            <Text>Nhập màu xe:</Text>
            <TextInput placeholder="Màu sắc" value={mauSac} onChangeText={setMauSac} />
            <Text>Nhập giá bán:</Text>
            <TextInput placeholder="Giá bán" value={giaBan} onChangeText={setGiaBan} keyboardType="numeric" />
            <Text>Nhập Mô tả:</Text>
            <TextInput placeholder="Mô tả" value={moTa} onChangeText={setMoTa} />
            
           
            <Button title="Chọn ảnh" onPress={handleImagePicker} />
            <Button title="Cập nhật xe" onPress={handleUpdateMotorbike} />
        </View>
    );
};

export default EditMotorbikeScreen;
