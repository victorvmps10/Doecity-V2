import Header from '@components/Header';
import ListONG from '@components/ListONG';
import { AppContext } from '@contexts/AppContext';
import { AuthContext } from '@contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { FlatList, Platform, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

export default function Search() {
    const { theme } = useContext(AuthContext);
    const { listUser, ongs, loading } = useContext(AppContext);
    const navigation = useNavigation<any>();
    const [username, setUsername] = useState<string>("");
    useEffect(() => {
        handleSearch();
    }, [])
    async function handleSearch() {
        if (username == "") {
            await listUser({ Username: "" });
        }
        await listUser({ Username: username });
    }
    function handleChange(text: string) {
        setUsername(text);
        handleSearch();
    }
    return (
        <SafeAreaView style={[
            style.container,
            theme ? { backgroundColor: '#2f1b36' }
                :
                { backgroundColor: '#fff' }]}>
            {Platform.OS == 'web' ?
                <Header
                    title="Pesquisa"
                />
                :
                <Header
                    title="Pesquisa"
                    iconBef='arrow-back'
                    pressBef={() => navigation.navigate('Discover')}
                    iconAft='search'
                    pressAft={() => { handleSearch() }}
                />
            }
            <View style={{ alignItems: 'center' }}>


                {Platform.OS === 'web' ? (
                    <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', width: '95%', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={style.input}
                                placeholder='Username da ONG:'
                                value={username}
                                maxLength={150}
                                onChangeText={(text) => handleChange(text)}
                            />
                            <TouchableOpacity
                                onPress={() => handleSearch()}
                            >
                                <Feather name="search" size={24} color="#f6b10a" />
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            style={style.scrollWeb}
                            contentContainerStyle={{ flexGrow: 1 }}
                            refreshControl={
                                <RefreshControl refreshing={loading} onRefresh={handleSearch} />
                            }
                        >
                            {ongs.map((item) => (
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                    <ListONG
                                        id={item.id}
                                        username={item.username}
                                        name={item.name}
                                        photo={item.photo}
                                    />
                                </View>

                            ))}
                        </ScrollView>
                    </View>
                ) : (
                    <View style={{ width: '100%', height: '100%' }}>
                        <TextInput
                            style={style.input}
                            placeholder='Username da ONG:'
                            value={username}
                            maxLength={150}
                            onChangeText={(text) => handleChange(text)}
                        />
                        <FlatList
                            data={ongs}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <FlatList
                                    data={ongs}
                                    renderItem={({ item }) => <ListONG
                                        id={item.id}
                                        username={item.username}
                                        name={item.name}
                                        photo={item.photo}
                                    />}
                                    refreshControl={
                                        <RefreshControl refreshing={loading} onRefresh={handleSearch} />
                                    }
                                    ListEmptyComponent={() => (
                                        <Text>Nenhum ONG encontrado.</Text>
                                    )}
                                />
                            )}
                            refreshControl={
                                <RefreshControl refreshing={loading} onRefresh={handleSearch} />
                            }
                        />
                    </View>
                )}

            </View>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        width: '90%',
        margin: 10,
        height: 40,
        borderColor: '#000',
        borderWidth: 1,
        padding: 10
    },
    scrollWeb: {
        height: Platform.select({
            web: '100vh' as unknown as number,
            default: undefined,
        }),
        width: '100%',
    },
})