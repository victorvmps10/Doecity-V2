import Header from '@components/Header';
import ListFinance from '@components/ListFinance';
import { AppContext } from '@contexts/AppContext';
import { AuthContext } from '@contexts/AuthContext';
import { AntDesign, FontAwesome, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Modal, Platform, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';

const windowHeight = Dimensions.get('window').height;

export default function Finance() {
    const { theme, user } = useContext(AuthContext);
    const { depositFinance, sakeFinance, listFinance, finances } = useContext(AppContext);
    const navigation = useNavigation<any>();
    const [value, setValue] = useState("");
    const [balance, setBalance] = useState("");
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    useEffect(() => {


    }, [])
    async function handleDeposit() {
        setLoading1(true);
        let numericString = value.replace("R$", "").trim().replace(/\./g, "").replace(",", ".");
        let num = Number(numericString);
        console.log(num);
        await depositFinance({ value: num, title, description });
        setLoading1(false);
        navigation.navigate("Account");
    }
    async function handleSake() {
        setLoading2(true);
        let numericString = value.replace("R$", "").trim().replace(/\./g, "").replace(",", ".");
        let num = Number(numericString);
        console.log(num);
        await sakeFinance({ value: num, title, description });
        setLoading2(false);
        navigation.navigate("Account");
    }
    async function handleListFinance() {
        setVisible(true)
        await listFinance({ isONG: 'false', user_id: user.id });
    }
    return (
        <SafeAreaView style={
            [
                style.container,
                theme ? { backgroundColor: '#2f1b36' }
                    :
                    { backgroundColor: '#fff' }]
        }>
            <Header

                title="Financeiro"
                iconBef='arrow-back'
                pressBef={() => navigation.navigate('Account')}
            />
            <View style={{ alignItems: 'center' }}>
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
                <View style={{ flexDirection: 'row', width: '90%' }}>
                    <TouchableOpacity style={[style.newButton, { marginRight: 10 }]} onPress={() => handleDeposit()}>
                        {loading1 ?
                            <ActivityIndicator color='#fff' size={25} />
                            :
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <FontAwesome6
                                    name="money-bill-trend-up"
                                    size={24}
                                    color="#fff" />
                                <Text style={{ color: '#fff' }}> Deposito </Text>
                            </View>

                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.newButton, { marginLeft: 10 }]} onPress={() => handleSake()}>
                        {loading2 ?
                            <ActivityIndicator color='#fff' size={25} />
                            :
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <FontAwesome6
                                    name="money-bill-wheat"
                                    size={24}
                                    color="#fff" />
                                <Text style={{ color: '#fff' }}> Sacar </Text>
                            </View>
                        }
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={[style.movimentButton]} onPress={() => handleListFinance()}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome6
                            name="money-bill-transfer"
                            size={24}
                            color="#fff" />
                        <Text style={{ color: '#fff' }}> Movimentação </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Modal
                visible={visible}
                animationType="fade" transparent={true}>
                <View style={style.containerModal}>
                    <TouchableOpacity
                        style={style.buttonClose}
                        onPress={() => setVisible(!visible)}>
                        <AntDesign name="close" size={42} color="white" />
                    </TouchableOpacity>
                    {Platform.OS === 'web' ? (
                        <ScrollView
                            style={style.scrollWeb}
                            contentContainerStyle={{ flexGrow: 1, marginBottom: 100 }}
                            refreshControl={
                                <RefreshControl refreshing={loading} onRefresh={handleListFinance} />
                            }
                        >
                            {finances.map((item) => (
                                <ListFinance
                                    key={item.id}
                                    action={item.action}
                                    title={item.title}
                                    description={item.description}
                                    value={item.value}
                                />
                            ))}

                        </ScrollView>
                    ) : (
                        <FlatList
                            data={finances}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <ListFinance
                                    action={item.action}
                                    title={item.title}
                                    description={item.description}
                                    value={item.value}
                                />
                            )}
                            refreshControl={
                                <RefreshControl refreshing={loading} onRefresh={handleListFinance} />
                            }
                        />
                    )}
                </View>
            </Modal>
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
        height: 40,
        flexDirection: 'row',
        flex: 1,
    },
    movimentButton: {
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f6b10a',
        borderRadius: 10,
        height: 40,
        flexDirection: 'row',
        width: '90%'
    },
    containerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(34, 34, 34, 0.4)'
    },
    buttonClose: {
        top: 5,
        right: 5,
        zIndex: 10,
    },
    scrollWeb: {
        height: Platform.OS === 'web' ? windowHeight : undefined, // número
        width: '100%',
    },
})