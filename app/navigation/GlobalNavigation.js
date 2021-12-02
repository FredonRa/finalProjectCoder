import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useSelector } from "react-redux"

import Chat from '../screens/Chat';
import Register from '../screens/Register';
import Login from '../screens/Login';

const GlobalNavigation = () => {
    const TabNavigator = createBottomTabNavigator();
    const StackNavigator = createNativeStackNavigator();
    const isLogged = useSelector((store) => store.loginReducer);
	const { isLoggedIn } = isLogged;

    return (  
        <>
            {!isLoggedIn ? (
                <StackNavigator.Navigator screenOptions={{header: () => null}}>
                    <StackNavigator.Screen name ="Login" component={Login} />
                    <StackNavigator.Screen name ="Register" component={Register} />
                </StackNavigator.Navigator>
            ) : (
                <TabNavigator.Navigator screenOptions={{ header: () => null }}>
                    <TabNavigator.Screen 
                        name="Chat" 
                        component={Chat} 
                        // options={{
                        // 	tabBarIcon: ({ color, size }) => (
                        // 	  <Ionicons name="home" color={color} size={size} />
                        // 	),
                        // }}
                    />
                </TabNavigator.Navigator>
            )}
        </>
    );
}
 
export default GlobalNavigation;