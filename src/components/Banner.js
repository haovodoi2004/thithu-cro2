import React from 'react';
import { View, Text, Image } from 'react-native';

const Banner = () => {
    return (
        <View>
            <Image source={{ uri: 'https://carshop.vn/wp-content/uploads/2022/07/anh-lamborghini-dep_062148757.jpg' }} style={{ width: '100%', height: 200 }} />
        </View>
    );
};

export default Banner;
