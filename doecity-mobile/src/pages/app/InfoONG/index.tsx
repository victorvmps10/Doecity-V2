import Header from '@components/Header';
import { AuthContext } from '@contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function InfoONG() {
    const { theme } = useContext(AuthContext);
    const navigation = useNavigation<any>();
    return (
        <SafeAreaView style={
            [
                style.container,
                theme ? { backgroundColor: '#2f1b36' }
                    :
                    { backgroundColor: '#fff' }]
        }>
            <Header

                title="ONG"
                iconBef='arrow-back'
                pressBef={() => navigation.goBack()}
            />
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