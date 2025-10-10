import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Platform, SafeAreaView, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "@pages/app/Home";
import NewPost from "@pages/app/NewPost";
import Discover from "@pages/app/Discover";
import Account from "@pages/app/Account";

import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AppProvider from "@contexts/AppContext";
import EditUser from "@pages/app/EditUser";
import Search from "@pages/app/Search";
import InfoONG from "@pages/app/InfoONG";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Header from "@components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import PostONG from "@pages/app/PostONG";
import FinanceONG from "@pages/app/FinanceONG";
import Info from "@pages/app/Info";


export default function AppRoutes() {
    const { theme } = useContext(AuthContext);

    const Tabs = createBottomTabNavigator();
    const StackWeb = createStackNavigator();
    return (
        <AppProvider>
            {Platform.OS == 'web' ? 
             <StackWeb.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <StackWeb.Screen
                    name="StackHome"
                    component={StackHome}
                />
                <StackWeb.Screen
                    name="StackDiscover"
                    component={StackDiscover}
                    
                />
                <StackWeb.Screen
                    name="StackAccount"
                    component={StackAccount}
                />
                 <StackWeb.Screen
                    name="Info"
                    component={Info}
                />
            </StackWeb.Navigator>
            :
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
                    name="StackDiscover"
                    component={StackDiscover}
                    options={{
                        tabBarIcon: ({ size, color }) => <Feather name='search' size={size} color={color} />
                    }}
                />
                <Tabs.Screen
                    name="StackAccount"
                    component={StackAccount}
                    options={{
                        tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name='account' size={size} color={color} />
                    }}
                />
                <Tabs.Screen
                    name="Info"
                    component={Info}
                    options={{
                        tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name='information' size={size} color={color} />
                    }}
                />
            </Tabs.Navigator>
            }
           
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


function StackAccount() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="Account"
                component={Account}
            />
            <Stack.Screen
                name="EditUser"
                component={EditUser}
            />
        </Stack.Navigator>
    )
}

function StackDiscover() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="Discover"
                component={Discover}
            />
            <Stack.Screen
                name="TopBarONG"
                component={TopBarONG}
            />
            <Stack.Screen
                name="Search"
                component={Search}
            />
        </Stack.Navigator>
    )
}

function TopBarONG() {
    const TopBar = createMaterialTopTabNavigator();
    const navigation = useNavigation<any>();
    const { theme } = useContext(AuthContext);
    const route = useRoute();
    const { id, name } = route.params as { id: string; name: string };
    return (
        <SafeAreaView
            style={[
                {
                    flex: 1
                },
                theme ? { backgroundColor: '#2f1b36' }
                    :
                    { backgroundColor: '#fff' }
            ]}
        >
            <Header
                title={`${name}`}
                iconBef='arrow-back'
                pressBef={() => navigation.navigate('Discover')}
            />
            <TopBar.Navigator
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: theme ? '#2f1b36' : '#fff'
                    },
                    tabBarLabelStyle: {
                        color: '#f6b10a'
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: '#f6b10a'
                    }

                }}
            >
                <TopBar.Screen
                    name='PostsONG'
                    component={PostONG}
                    options={{
                        tabBarLabel: 'Posts'
                    }}
                    initialParams={{ id: id, name: name }}
                />
                <TopBar.Screen
                    name='FinanceONG'
                    component={FinanceONG}
                    options={{
                        tabBarLabel: 'Finanças'
                    }}
                    initialParams={{ id: id, name: name }}
                />
                <TopBar.Screen
                    name='InfoONG'
                    component={InfoONG}
                    options={{
                        tabBarLabel: 'Sobre'
                    }}
                    initialParams={{ id: id, name: name }}
                />
            </TopBar.Navigator>
        </SafeAreaView >

    )
}