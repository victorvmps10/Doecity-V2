import { AuthContext } from '@contexts/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { formatDistance } from 'date-fns';
import { ptBR } from "date-fns/locale";

import { useContext, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ListONGProps {
    username: string;
    name: string;
}
export default function ListONG({ username, name }: ListONGProps) {
    const { theme } = useContext(AuthContext);
    const navigation = useNavigation<any>();
    function handleNavigate() {
        navigation.navigate('StackDiscover', {
            screen: 'InfoONG',
        });
    }
    return (
        <View style={style.container}>
            <TouchableOpacity 
            style={style.rowHeader}
            onPress={handleNavigate}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <MaterialIcons
                        name="account-circle"
                        size={25}
                        color='#2f1b36'
                        style={{ marginRight: 5 }} />
                    <Text
                        style={style.name}
                    >{username}</Text>

                </View>


            </TouchableOpacity>

        </View>
    );
}

const style = StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: 5,
        margin: 10,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#2f1b36',
        width: 350,
        height: 50
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#2f1b36'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#2f1b36'
    },
    text: {
        fontSize: 15,
        color: '#2f1b36'
    },
    rowHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})