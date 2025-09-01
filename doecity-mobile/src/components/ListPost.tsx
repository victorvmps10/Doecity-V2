import { AuthContext } from '@contexts/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { formatDistance } from 'date-fns';
import { ptBR } from "date-fns/locale";

import { useContext, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ListPostProps {
    title: string;
    description: string;
    username: string;
    created_at: Date;
}
export default function ListPost({ username, title, description, created_at }: ListPostProps) {

    function formatTimePost() {
        return formatDistance(
            new Date(),
            created_at,
            {
                locale: ptBR
            }
        )
    }

    const { theme } = useContext(AuthContext);
    return (
        <View style={[
            style.container,
            { backgroundColor: theme ? '#fff' : '#2f1b36' }
        ]}>
            <TouchableOpacity style={style.rowHeader}>
                <View style={{ flexDirection: 'row' }}>
                    <MaterialIcons
                        name="account-circle"
                        size={25}
                        color={theme ? '#2f1b36' : '#fff'}
                        style={{ marginRight: 5 }} />
                    <Text
                        style={[style.name,
                        { color: theme ? '#2f1b36' : '#fff' }
                        ]}
                    >{username}</Text>
                </View>

                <Text
                    style={[style.text,
                    { color: theme ? '#2f1b36' : '#fff' }
                    ]}>Há {formatTimePost()}</Text>
            </TouchableOpacity>

            <Text
                style={[style.title,
                { color: theme ? '#2f1b36' : '#fff' }
                ]}>{title}</Text>
            <Text
                style={[style.text,
                { color: theme ? '#2f1b36' : '#fff' }
                ]}>{description}</Text>

        </View>
    );
}

const style = StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: 5,
        margin: 10,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15
    },
    text: {
        fontSize: 15
    },
    rowHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})