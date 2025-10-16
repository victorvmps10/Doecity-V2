import Header from '@components/Header';
import ListFinance from '@components/ListFinance';
import { AppContext } from '@contexts/AppContext';
import { AuthContext } from '@contexts/AuthContext';
import { AntDesign, FontAwesome, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, FlatList, Modal, Platform, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';

const windowHeight = Dimensions.get('window').height;

export default function Donate() {
    const { theme, user } = useContext(AuthContext);
    const route = useRoute();
    const { saldReq, balance, donateONG } = useContext(AppContext);
    const navigation = useNavigation<any>();
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { id, name } = route.params as { id: string; name: string };
    useEffect(() => {
        async function loadBalance() {
            await saldReq({ user_id: user.id })
        }
        loadBalance();
    }, []);
    async function handleDonateONG() {
        setLoading(true);
        let numericString = value.replace("R$", "").trim().replace(/\./g, "").replace(",", ".");
        let num = Number(numericString);
        console.log(num);
        await donateONG({ user_id: user.id, ong_id: id, title, description, value: num }).catch(() => {
            if(Platform.OS === 'web'){
                window.alert("Saldo Invalido!!!");
            } else {
                 Alert.alert("Saldo Invalido!!!");
            }
            setLoading(false);
            navigation.navigate("FinanceONG1");
        })
        setLoading(false);
        navigation.navigate("FinanceONG1");

    }
    return (
        <SafeAreaView style={
            [
                style.container,
                theme ? { backgroundColor: '#2f1b36' }
                    :
                    { backgroundColor: '#fff' }]
        }>
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    style={style.newButton}
                    onPress={() => navigation.navigate("FinanceONG1")}>
                    <AntDesign name="close" size={42} color="#2f1b36" />
                    <Text style={{ color: '#2f1b36', fontSize: 15 }}>Sair </Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 30, color: '#f6b10a' }}>Seu saldo: {balance}</Text>

                <TextInput
                    style={style.input}
                    placeholder='Titulo:'
                    value={title}
                    placeholderTextColor='#cbcbcb'
                    onChangeText={(text) => setTitle(text)}
                    maxLength={18} />
                <TextInput
                    style={style.input}
                    placeholder='Descrição:'
                    value={description}
                    placeholderTextColor='#cbcbcb'
                    onChangeText={(text) => setDescription(text)}
                    maxLength={18} />
                <MaskedTextInput
                    mask="R$ 999.999,99"
                    style={style.input}
                    placeholder='R$ 000.000,00'
                    keyboardType='number-pad'
                    value={value}
                    onChangeText={(text) => setValue(text)}
                    placeholderTextColor='#cbcbcb'
                    maxLength={15} />
                <TouchableOpacity style={[style.newButton, { marginRight: 10 }]} onPress={() => handleDonateONG()}>
                    {loading ?
                        <ActivityIndicator color='#2f1b36' size={25} />
                        :
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <FontAwesome6
                                name="money-bill-trend-up"
                                size={24}
                                color="#2f1b36" />
                            <Text style={{ color: '#2f1b36' }}> Doar </Text>
                        </View>

                    }
                </TouchableOpacity>
            </View>

        </SafeAreaView >
    );
}


const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        backgroundColor: '#FFF',
        color: '#000',
        borderRadius: 10,
        width: '90%',
        margin: 10,
        height: 40,
        borderColor: '#000',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    newButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f6b10a',
        borderRadius: 10,
        flexDirection: 'row',
        height: 40,
        width: '90%',
        marginTop: 10
    },
})