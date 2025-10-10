import { AppContext } from '@contexts/AppContext';
import { AuthContext } from '@contexts/AuthContext';
import { useRoute } from '@react-navigation/native';
import { useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function FinanceONG() {
    const { theme } = useContext(AuthContext);
    const { listUser } = useContext(AppContext);
    const route = useRoute();
    const { id, name } = route.params as { id: string; name: string };
    function list() {

    }
    return (
        <SafeAreaView style={
            [
                style.container,
                theme ? { backgroundColor: '#2f1b36' }
                    :
                    { backgroundColor: '#fff' }]
        }>

            <Text>oi</Text>
        </SafeAreaView >
    );
}


const style = StyleSheet.create({
    container: {
        flex: 1
    },
    addButton: {
        position: 'absolute',
        bottom: 25,
        right: 25,
        backgroundColor: '#f6b10a',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
})