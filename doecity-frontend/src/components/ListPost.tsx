import { AuthContext } from '@contexts/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { formatDistance } from 'date-fns';
import { ptBR } from "date-fns/locale";

import { useContext, useEffect, useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { api } from '../services/api';
import AntDesign from '@expo/vector-icons/AntDesign';

interface ListPostProps {
    user_id: string;
    title: string;
    description: string;
    username: string;
    photo?: string;
    photo_user?: string;
    created_at: Date;
}
export default function ListPost({ user_id, username, title, description, created_at, photo_user, photo }: ListPostProps) {
    const [visible, setVisible] = useState(false);
    function formatTimePost() {
        return formatDistance(
            new Date(),
            created_at,
            {
                locale: ptBR
            }
        )
    }

    function handleNavigate() {
        navigation.navigate('StackDiscover', {
            screen: 'TopBarONG',
            params: {
                id: user_id,
                name: username,
            },
        });
    }
    const { theme } = useContext(AuthContext);
    const navigation = useNavigation<any>();
    return (
        <View style={style.container}>
            <TouchableOpacity
                style={style.rowHeader}
                onPress={() => handleNavigate()}
            >
                <View style={{ flexDirection: 'row' }}>
                    {photo_user ?
                        <Image
                            source={{ uri: `${api.defaults.baseURL}/upload/${photo_user}` }}
                            style={{ width: 25, height: 25, borderRadius: 90, marginRight: 5 }} />
                        :
                        <MaterialIcons
                            name="account-circle"
                            size={25}
                            color='#2f1b36'
                            style={{ marginRight: 5 }} />
                    }

                    <Text
                        style={style.name}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                    >{username}</Text>
                </View>

                <Text
                    style={style.text}>Há {formatTimePost()}</Text>
            </TouchableOpacity>
            {photo ?
                <TouchableOpacity
                    onPress={() => setVisible(!visible)}
                    style={style.containerImage}>

                    <Image
                        source={{ uri: `${api.defaults.baseURL}/upload/${photo}` }}
                        style={style.img}
                    />
                </TouchableOpacity>
                : null}
            <Text
                style={style.title}>{title}</Text>
            <Text
                style={style.text}>{description}</Text>
            <Modal
                visible={visible}
                animationType="fade" transparent={true}>
                <View style={style.containerModal}>
                    <TouchableOpacity
                        style={style.buttonClose}
                        onPress={() => setVisible(!visible)}>
                        <AntDesign name="close" size={42} color="white" />
                    </TouchableOpacity>
                    <Image
                        source={{ uri: `${api.defaults.baseURL}/upload/${photo}` }}
                        style={style.imgFull}
                        resizeMode="contain"
                    />
                </View>

            </Modal>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: 5,
        margin: 10,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#2f1b36'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#2f1b36'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#2f1b36'
    },
    text: {
        fontSize: 15,
        color: '#2f1b36'
    },
    rowHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    img: {
        height: 350,
        width: 350,
        borderRadius: 45,
        marginTop: 5,
        marginBottom: 5
    },
    containerImage: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(34, 34, 34, 0.4)'
    },
    imgFull: {
        height: '90%',
        width: '90%',
        borderRadius: 45,
        marginTop: 10,
        marginBottom: 5
    },
    buttonClose: {
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 10,
    }
})