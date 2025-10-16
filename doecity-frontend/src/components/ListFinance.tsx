import { AuthContext } from '@contexts/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { formatDistance } from 'date-fns';
import { ptBR } from "date-fns/locale";

import { useContext, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { api } from 'src/services/api';

interface ListFinanceProps {
    action: string;
    title: string;
    description: string;
    value: string;
}
export default function ListFinance({ action, title, description, value }: ListFinanceProps) {
    const { theme } = useContext(AuthContext);
    const navigation = useNavigation<any>();
    return (
        <View style={style.container}>
            
            <Text style={style.action}>{action ? 'Saque' : 'Deposito'} - R$ {value}</Text>
            <Text style={style.title}>{title}</Text>
            <Text style={style.text}>{description}</Text>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 5,
        margin: 10,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#2f1b36',
        width: '90%'
    },
    action: {
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