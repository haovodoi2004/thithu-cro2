import React, { useEffect } from 'react';
import { View, Button, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMotorbikes } from '../redux/motorbikeSlice';
import Banner from '../components/Banner';
import MotorbikeList from '../components/MotorbikeList';

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const motorbikes = useSelector((state) => state.motorbikes.list);

    useEffect(() => {
        dispatch(fetchMotorbikes());
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <Banner />
            <FlatList
                data={motorbikes}
                renderItem={({ item }) => <MotorbikeList motorbike={item} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
            <Button
                title="Add"
                onPress={() => navigation.navigate('AddMotorbike')}
                style={styles.addButton}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    list: {
        flexGrow: 1,
    },
    addButton: {
        marginTop: 20,
    },
});

export default HomeScreen;
