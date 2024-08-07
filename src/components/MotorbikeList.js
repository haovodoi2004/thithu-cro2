import React from 'react';
import { View, Text, Button, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { deleteMotorbike } from '../redux/motorbikeSlice';

const MotorbikeList = ({ motorbike }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleDelete = () => {
        Alert.alert('thông báo','bạn có muốn xóa ko ?',[
            {
                text:'có',
                onPress: () => {
                    dispatch(deleteMotorbike(motorbike.id));
                    console.log('Đã xóa');
                }
            },{
                text:'ko',
                style:'cancel'
            }
        ])
        
    };

    return (
        <View>


            <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 10 }}>
                {motorbike.hinhAnh ? <Image source={{ uri: motorbike.hinhAnh }} style={{ width: 200, height: 100, alignSelf: 'center' }} /> : null}
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{fontSize:20}}>Tên xe: </Text>
                    <Text style={{fontSize:18,fontWeight:'bold',marginTop:4}}>Tên xe: {motorbike.tenXe}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{fontSize:20}}>Màu sắc:</Text>
                    <Text style={{fontSize:18,fontWeight:'bold',marginTop:4}}> {motorbike.mauSac}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{fontSize:20}}>Giá:</Text>
                    <Text style={{fontSize:18,fontWeight:'bold',marginTop:4}}> {motorbike.giaBan}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{fontSize:20}}>Mô tả:</Text>
                    <Text style={{fontSize:18,fontWeight:'bold',marginTop:4}}> {motorbike.moTa}</Text>
                </View>
                <Button title="Sửa" onPress={() => navigation.navigate('EditMotorbike', { motorbikeId: motorbike.id })} />
                <Button title="Xóa" onPress={handleDelete} />
            </View>
        </View>
    );
};

export default MotorbikeList;
