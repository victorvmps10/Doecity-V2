import { useContext, useEffect } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import { AuthContext } from '@contexts/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';

import { AppContext } from '@contexts/AppContext';
import ListPost from '@components/ListPost';


export default function PostONG() {
    const { theme } = useContext(AuthContext);
    const { listPost, postONG, loading, setPostONG, ongSelectedId } = useContext(AppContext);
    const navigation = useNavigation<any>();

    const route = useRoute();
    const params = route.params as { id?: string; name?: string } | undefined;
    const id = params?.id;
    const name = params?.name;
    useEffect(() => {
        console.log(ongSelectedId);
        const unsubscribe = navigation.addListener('beforeRemove', () => {
            setPostONG([]);
        });

        handleListPost();
    }, [navigation]);
    async function handleListPost() {  
            await listPost({ id: ongSelectedId });
    }
    return (
        <SafeAreaView
            style={[
                style.container,
                theme ? { backgroundColor: '#2f1b36' }
                    :
                    { backgroundColor: '#fff' }]}>
            <FlatList
                data={postONG}
                keyExtractor={(item) => item.id}

                renderItem={({ item }) =>
                    <ListPost
                        user_id={item.user_id}
                        username={item.userName}
                        title={item.title}
                        description={item.description}
                        created_at={item.created_at}
                        photo={item.photo}
                        photo_user={item.photo_user}
                    />
                }
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={handleListPost} />
                }
                ListEmptyComponent={() => (
                    <Text>Nenhum post encontrado.</Text>
                )}
            />



        </SafeAreaView>
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