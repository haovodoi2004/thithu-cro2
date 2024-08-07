import React, { useState } from 'react';
import { View, TextInput, Button, Image, Alert, StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { addMotorbike } from '../redux/motorbikeSlice';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const AddMotorbikeScreen = ({ navigation }) => {
    const [tenXe, setTenXe] = useState('');
    const [mauSac, setMauSac] = useState('');
    const [giaBan, setGiaBan] = useState('');
    const [moTa, setMoTa] = useState('');
    const [hinhAnh, setHinhAnh] = useState('');
    const dispatch = useDispatch();

    const handleAddMotorbike = () => {
        if (!tenXe || !mauSac || !giaBan || !moTa || !hinhAnh) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin.');
            return;
        }
        dispatch(addMotorbike({ tenXe, mauSac, giaBan, moTa, hinhAnh }));
        navigation.goBack();
    };

    const handleImagePicker = () => {
        launchImageLibrary({}, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.assets && response.assets.length > 0) {
                setHinhAnh(response.assets[0].uri);
            }
        });
    };

    const handleCamera = () => {
        launchCamera({}, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.error) {
                console.log('Camera Error: ', response.error);
            } else if (response.assets && response.assets.length > 0) {
                setHinhAnh(response.assets[0].uri);
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text>Nhập tên xe:</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Tên xe" 
                value={tenXe} 
                onChangeText={setTenXe} 
            />
            <Text>Nhập màu xe:</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Màu sắc" 
                value={mauSac} 
                onChangeText={setMauSac} 
            />
            <Text>Nhập giá bán:</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Giá bán" 
                value={giaBan} 
                onChangeText={setGiaBan} 
                keyboardType="numeric" 
            />
            <Text>Nhập Mô tả:</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Mô tả" 
                value={moTa} 
                onChangeText={setMoTa} 
            />
            <Button title="Chọn ảnh từ thư viện" onPress={handleImagePicker} />
            <Button title="Chụp ảnh" onPress={handleCamera} />
            {hinhAnh ? <Image source={{ uri: hinhAnh }} style={styles.image} /> : null}
            <Button title="Thêm xe" onPress={handleAddMotorbike} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
        alignSelf: 'center',
    },
});

export default AddMotorbikeScreen;
