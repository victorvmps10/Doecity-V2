import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Linking, Platform, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
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
import { AntDesign } from "@expo/vector-icons";
import Finance from "@pages/app/Finance";
import Donate from "@pages/app/Donate";


export default function AppRoutes() {
    const { theme } = useContext(AuthContext);

    const Tabs = createBottomTabNavigator();
    const StackWeb = createStackNavigator();
    return (
        <View style={{ flex: 1 }}>
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
            <TouchableOpacity
                style={style.support}
                onPress={() => Linking.openURL('https://mail.google.com/mail/?view=cm&fs=1&to=suportdoecity@gmail.com&su=Ajuda&body=Olá, preciso de suporte!')}
            >
                <AntDesign
                    name="customerservice"
                    size={32}
                    color="#fff" />
            </TouchableOpacity>
        </View>
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
            <Stack.Screen
                name="Finance"
                component={Finance}
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

const TopBar = createMaterialTopTabNavigator();

function TopBarONG() {
    const navigation = useNavigation<any>();
    const { theme } = useContext(AuthContext);
    const route = useRoute();
    const { id, name } = (route.params as { id?: string; name?: string }) || {};
    if (!id || !name) return null;
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
                />
                <TopBar.Screen
                    name='FinanceONG'
                    component={FinanceONGStack}
                    options={{
                        tabBarLabel: 'Finanças'
                    }}
                />
                <TopBar.Screen
                    name='InfoONG'
                    component={InfoONG}
                    options={{
                        tabBarLabel: 'Sobre'
                    }}
                />
            </TopBar.Navigator>
        </SafeAreaView >

    )
}

function FinanceONGStack() {
    const Stack = createStackNavigator();
    const route = useRoute();
    const { id, name } = (route.params as { id?: string; name?: string }) || {};
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="FinanceONG1"
                component={FinanceONG}

            />
            <Stack.Screen
                name="Donate"
                component={Donate}
            />
        </Stack.Navigator>
    )
}

const style = StyleSheet.create({
    support: {
        position: Platform.OS === 'web' ? ('fixed' as any) : 'absolute',
        bottom: Platform.OS == 'web' ? 25 : 100,
        right: 25,
        backgroundColor: '#f6b10a',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

})