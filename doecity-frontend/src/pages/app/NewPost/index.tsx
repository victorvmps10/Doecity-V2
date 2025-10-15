import Header from '@components/Header';
import { AuthContext } from '@contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { AppContext } from '@contexts/AppContext';

export default function NewPost() {

    const { theme } = useContext(AuthContext);
    const { createPost, setPostPhoto, photo } = useContext(AppContext);
    const navigation = useNavigation<any>();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageSource, setImageSource] = useState<{ uri: string } | null>(null);
    useEffect(() => {
        if (!photo) return;

        if (Platform.OS === 'web' && photo instanceof File) {
            setImageSource({ uri: URL.createObjectURL(photo) });
        } else if (typeof photo === 'string') {
            setImageSource({ uri: photo });
        }
    }, [photo]);
    async function handleCreate() {
        if (title !== "" || description !== "") {
            setLoading(true);
            await createPost({ title, description, photo: '' }).then(()=>{
                setLoading(false);
            })
        }

    }
    async function handleSetPostPhoto() {
        await setPostPhoto();

    }
    return (
        <SafeAreaView
            style={[
                style.container,
                theme ? { backgroundColor: '#2f1b36' }
                    :
                    { backgroundColor: '#fff' }]}>
            <Header

                title="Novo Post"
                iconBef='arrow-back'
                pressBef={() => navigation.navigate('Home')}
            />

            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={handleSetPostPhoto}
                >
                    {imageSource ?
                        <Image
                            source={imageSource}
                            style={{ borderRadius: 40, width: 150, height: 150 }}
                        />
                        :
                        <MaterialIcons
                            name="add-photo-alternate"
                            size={150}
                            color={theme ? '#f6b10a' : '#2f1b36'} />
                    }
                </TouchableOpacity>

                <TextInput style={style.input}
                    placeholder='Titulo:'
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                    maxLength={50} />
                <TextInput
                    style={style.input}
                    placeholder='Descrição:'
                    value={description}
                    maxLength={150}
                    onChangeText={(text) => setDescription(text)}
                />
                <TouchableOpacity
                    style={[style.createButton, {
                        backgroundColor: theme ? '#f6b10a' : '#2f1b36'
                    }]}
                    onPress={() => handleCreate()}
                >
                    {loading ?
                        <ActivityIndicator color={theme ? '#2f1b36' : '#fff'} size={25} />
                        :
                        <Text style={{ color: theme ? '#2f1b36' : '#fff' }}>Criar Post</Text>}

                </TouchableOpacity>
            </View>


        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    createButton: {
        margin: 10,
        width: '90%',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        height: 40
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