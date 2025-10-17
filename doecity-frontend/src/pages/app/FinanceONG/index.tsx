import ListFinance from '@components/ListFinance';
import { AppContext } from '@contexts/AppContext';
import { AuthContext } from '@contexts/AuthContext';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useCallback, useContext, useState } from 'react';
import { Dimensions, FlatList, Platform, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const windowHeight = Dimensions.get('window').height;
export default function FinanceONG() {
    const { theme } = useContext(AuthContext);
    const { listUser, finances, listFinance, balance, saldReq, ongSelectedId, ongSelectedName } = useContext(AppContext);
    const route = useRoute();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<any>();

    useFocusEffect(
        useCallback(() => {
            async function loadFinance() {
                    await listFinance({ isONG: 'true', ong_id: ongSelectedId });

                    await saldReq({ user_id: ongSelectedId });

            }
            loadFinance();
        }, [])
    );
    async function handleListFinance() {  
            await listFinance({ isONG: 'true', ong_id: ongSelectedId });

            await saldReq({ user_id: ongSelectedId });
    }
    return (
        <SafeAreaView style={
            [
                style.container,
                theme ? { backgroundColor: '#2f1b36' }
                    :
                    { backgroundColor: '#fff' }]
        }>

            <TouchableOpacity style={style.newButton} onPress={() => navigation.navigate("Donate")}>
                <FontAwesome5
                    name="donate"
                    size={24}
                    color="#fff" />
                <Text style={{ color: '#fff' }}> Doar para essa ONG </Text>
            </TouchableOpacity>
            <Text style={style.balance}>Saldo ONG: R$ {balance}</Text>
            {Platform.OS === 'web' ? (
                <ScrollView
                    style={style.scrollWeb}
                    contentContainerStyle={{ flexGrow: 1, marginBottom: 100 }}
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={handleListFinance} />
                    }
                >
                    {finances.map((item) => (
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <ListFinance
                                action={item.action}
                                title={item.title}
                                description={item.description}
                                value={item.value}
                            />
                        </View>

                    ))}

                </ScrollView>
            ) : (
                <FlatList
                    data={finances}
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
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
    },
    newButton: {
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f6b10a',
        borderRadius: 10,
        height: 40,
        flexDirection: 'row'
    },
    scrollWeb: {
        height: Platform.OS === 'web' ? windowHeight : undefined, // número
        width: '100%',
    },
    balance: {
        fontSize: 30,
        color: '#f6b10a',
        textAlign: 'center'
    }
})