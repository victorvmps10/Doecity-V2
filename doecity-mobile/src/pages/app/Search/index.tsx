import Header from '@components/Header';
import ListONG from '@components/ListONG';
import { AppContext } from '@contexts/AppContext';
import { AuthContext } from '@contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Search() {
    const { theme } = useContext(AuthContext);
    const { listUser, ongs, loading } = useContext(AppContext);
    const navigation = useNavigation<any>();
    const [username, setUsername] = useState<string>("");
    async function handleSearch() {
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
            <Header
                title="Pesquisa"
                iconBef='arrow-back'
                pressBef={() => navigation.navigate('Discover')}
                iconAft='search'
                pressAft={() => { handleSearch() }}
            />
            <View style={{ alignItems: 'center' }}>
                <TextInput
                    style={style.input}
                    placeholder='Username da ONG:'
                    value={username}
                    maxLength={150}
                    onChangeText={(text) => handleChange(text)}
                />
                <FlatList
                    data={ongs}
                    renderItem={({ item }) => <ListONG
                        username={item.username}
                        name={item.name}
                    />}
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={handleSearch} />
                    }
                    ListEmptyComponent={() => (
                        <Text>Nenhum post encontrado.</Text>
                    )}
                />
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
})