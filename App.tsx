import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './src/redux/store';
import HomeScreen from './src/screens/HomeScreen';
import AddMotorbikeScreen from './src/screens/AddMotorbikeScreen';
import EditMotorbikeScreen from './src/screens/EditMotorbikeScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Danh sách xe' }} />
                    <Stack.Screen name="AddMotorbike" component={AddMotorbikeScreen} options={{ title: 'Thêm xe mới' }} />
                    <Stack.Screen name="EditMotorbike" component={EditMotorbikeScreen} options={{ title: 'Sửa xe' }} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
