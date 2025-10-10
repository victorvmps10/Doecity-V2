import Header from '@components/Header';
import { AppContext } from '@contexts/AppContext';
import { AuthContext } from '@contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function EditUser() {
    const { theme, user, updateUser } = useContext(AuthContext);
    const navigation = useNavigation<any>();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        function handleLoad() {
            setUsername(user.username),
                setName(user.name),
                setEmail(user.email),
                setDescription(user.description)
        }
        handleLoad()
    }, [])
    function handleUpdate() {
        if (username !== '' || name !== '' || email !== '' || description !== '') {
            updateUser({
                Username: username,
                Name: name,
                Description: description,
                Email: email,
            })
            navigation.navigate('Account')
        }

    }
    return (
        <SafeAreaView
            style={[
                style.container,
                theme ? { backgroundColor: '#2f1b36' }
                    :
                    { backgroundColor: '#fff' }]}
        >
            <Header

                title="Editar Usuario"
                iconBef='arrow-back'
                pressBef={() => navigation.navigate('Account')}
            />
            <View style={style.form}>
                <TextInput
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={style.input}
                />
                <TextInput
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    style={style.input}
                />
                <TextInput
                    value={description}
                    placeholder='Descrição'
                    placeholderTextColor={'#808080'}
                    onChangeText={(text) => setDescription(text)}
                    style={style.input}
                />
                <TextInput
                    value={email}
                    placeholder='Email'
                    placeholderTextColor={'#808080'}
                    onChangeText={(text) => setEmail(text)}
                    style={style.input}
                />
                <TouchableOpacity
                    style={style.button}
                    onPress={handleUpdate}>
                    <Text style={{ color: '#fff' }}>Alterar</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    );
}


const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        alignItems: 'center'
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        width: '90%',
        margin: 10,
        height: 40,
        borderColor: '#000',
        borderWidth: 1,
        paddingHorizontal: 10
    },
    button: {
        backgroundColor: '#f6b10a',
        borderRadius: 10,
        width: '90%',
        margin: 10,
        height: 40,
        borderColor: '#000',
        borderWidth: 1,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})