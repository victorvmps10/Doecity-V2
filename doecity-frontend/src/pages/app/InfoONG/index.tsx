import { AppContext } from '@contexts/AppContext';
import { AuthContext } from '@contexts/AuthContext';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { api } from 'src/services/api';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function InfoONG() {
    const navigation = useNavigation<any>();
    const { theme } = useContext(AuthContext);
    const { detailUser, info } = useContext(AppContext);
    const route = useRoute();
    const params = route.params as { id?: string; name?: string } | undefined;
    const id = params?.id;
    const name = params?.name;
    const [created, setCreated] = useState(``);
    const [update, setUpdate] = useState(``);

    useFocusEffect(
        useCallback(() => {
            if (id) {
                detailUser({ user_id: id }).then(() => {
                    setCreated(format(new Date(info.created_at), "dd/MM/yyyy - HH:mm", { locale: ptBR }));
                    setUpdate(format(new Date(info.update_at), "dd/MM/yyyy - HH:mm", { locale: ptBR }));
                })
            }
        }, [])
    );


    return (
        <SafeAreaView style={
            [
                style.container,
                theme ? { backgroundColor: '#2f1b36' }
                    :
                    { backgroundColor: '#fff' }]
        }>
            <Image
                source={{ uri: `${api.defaults.baseURL}/upload/${info.photo}` }}
                style={style.img}
            />
            <Text style={style.text}>Username: {info.username}</Text>
            <Text style={style.text}>Nome: {info.name}</Text>
            <Text style={style.text}>Email: {info.email}</Text>
            <Text style={style.text}>Criado: {created}</Text>
            <Text style={style.text}>Atualizado: {update}</Text>
        </SafeAreaView >
    );
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    img: {
        margin: 15,
        width: 250,
        height: 250,
        borderRadius: 180
    },
    text: {
        fontSize: 24,
        color: '#f6b10a'
    }
})