import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SafeAreaView, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "@pages/app/Home";
import NewPost from "@pages/app/NewPost";
import Discover from "@pages/app/Discover";
import Account from "@pages/app/Account";

import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AppProvider from "@contexts/AppContext";


export default function AppRoutes() {
    const { theme } = useContext(AuthContext);

    const Tabs = createBottomTabNavigator();
    return (
        <AppProvider>
            <Tabs.Navigator
                screenOptions={{
                    tabBarActiveBackgroundColor: theme ? '#291630ff' : 'rgba(255, 255, 248, 1)',
                    tabBarInactiveBackgroundColor: theme ? '#291630ff' : 'rgba(255, 255, 248, 1)',
                    tabBarActiveTintColor: '#f6b10a',
                    tabBarInactiveTintColor: theme ? '#fff' : '#291630ff',
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        borderTopWidth: 0,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                }}
            >
                <Tabs.Screen
                    name="StackHome"
                    component={StackHome}
                    options={{
                        tabBarIcon: ({ size, color }) => <Feather name='home' size={size} color={color} />
                    }}
                />
                <Tabs.Screen
                    name="Discover"
                    component={Discover}
                    options={{
                        tabBarIcon: ({ size, color }) => <Feather name='search' size={size} color={color} />
                    }}
                />
                <Tabs.Screen
                    name="Account"
                    component={Account}
                    options={{
                        tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name='account' size={size} color={color} />
                    }}
                />
            </Tabs.Navigator>
        </AppProvider>
    );
}

function StackHome() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
            />
            <Stack.Screen
                name="NewPost"
                component={NewPost}
            />
        </Stack.Navigator>
    )
}