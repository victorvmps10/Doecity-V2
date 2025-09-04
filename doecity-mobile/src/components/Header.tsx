import { useContext, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '@contexts/AuthContext';

interface HeaderProps {
    MarginTopCustom?: number;
    title: string;
    iconBef?: React.ComponentProps<typeof Ionicons>['name'];
    pressBef?: () => Promise<void>;
    iconAft?: React.ComponentProps<typeof Feather>['name'];
    pressAft?: () => void;
}
export default function Header({ title, iconBef, pressBef, iconAft, pressAft }: HeaderProps) {
    const {theme} = useContext(AuthContext);
    return (
        <View style={style.container}>
            {iconBef && pressBef ?
                <TouchableOpacity
                    onPress={pressBef}
                >
                    <Ionicons name={iconBef} size={35} color={theme? '#f6b10a' :'#2f1b36'} />
                </TouchableOpacity>
                : null}
            <Text style={[style.title, { color: theme? '#f6b10a' :'#2f1b36'}]}>{title}</Text>
            {iconAft && pressAft ?
                <TouchableOpacity
                    style={style.button}
                    onPress={pressAft}
                >
                    <Feather name={iconAft} size={30} color={theme? '#f6b10a' :'#2f1b36'} />
                </TouchableOpacity>
                : null}

        </View>
    );
}

const style = StyleSheet.create({
    container: {
        marginTop: 25,
        marginHorizontal: 25,
        height: 55,
        alignItems: 'center',
        flexDirection: 'row'
    },
    title: {
        marginHorizontal: 15,
        fontSize: 30,
        fontWeight: 'bold',
    },
    button: {
        position: 'absolute',
        right: 10,
    }
})