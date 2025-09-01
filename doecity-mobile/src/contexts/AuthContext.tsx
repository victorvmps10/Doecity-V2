import { createContext, ReactNode, useEffect, useState } from 'react';

import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    loading: boolean;
    loadingAuth: boolean;
    signIn: (Credentials: SignInProps) => Promise<void>;
    signUp: (Credentials: SignUpProps) => Promise<void>;
    signOut: () => Promise<void>;
    theme: boolean;
    altTheme: () => Promise<void>;
}

type UserProps = {
    id: string;
    username: string;
    email: string;
    token: string;
    isONG: boolean;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
    ONG: boolean;
}

export const AuthContext = createContext({} as AuthContextData);
export default function AuthProvider({ children }: AuthProviderProps) {
    useEffect(() => {
        setLoading(true);
        async function loadStorage() {
            const theme = await AsyncStorage.getItem('@doecity/theme');
            if (theme) {
                setTheme(JSON.parse(theme));

            }
            const account = await AsyncStorage.getItem('@doecity/user');
            if (account) {
                setUser(JSON.parse(account));
            }
            setLoading(false);
        }

        loadStorage();
    }, [])
    const [user, setUser] = useState<UserProps>({
        id: '',
        username: '',
        email: '',
        token: '',
        isONG: false
    });
    const [loading, setLoading] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [theme, setTheme] = useState(false);
    const isAuthenticated = !!user.username;

    async function altTheme() {
        const newTheme = !theme;
        setTheme(!theme);
        await AsyncStorage.setItem('@doecity/theme', JSON.stringify(newTheme));
    }

    async function signIn({ email, password }: SignInProps) {
        setLoadingAuth(true);
        try {
            const response = await api.post('/users/auth', {
                email,
                password
            });

            console.log(response.data)

            const { id, username, token, isONG } = response.data;
            const data = {
                ...response.data
            }
            await AsyncStorage.setItem('@doecity/user', JSON.stringify(data));

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser({
                id,
                username,
                email,
                token,
                isONG
            });
            setLoadingAuth(false);
        } catch (err) {
            console.log(err);
            setLoadingAuth(false);
        }
    }
    async function signUp({ name, email, password, ONG }: SignUpProps) {
        setLoadingAuth(true);
        try {
            const response = await api.post('/users/create', {
                username: name,
                email,
                password,
                ONG: String(ONG)
            });

            console.log(response.data)

            const { id, username, token, isONG } = response.data;
            const data = {
                ...response.data
            }
            await AsyncStorage.setItem('@doecity/user', JSON.stringify(data));

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser({
                id,
                username,
                email,
                token,
                isONG
            });
            setLoadingAuth(false);
        } catch (err) {
            console.log(err);
            setLoadingAuth(false);
        }
    }
    async function signOut() {
        setUser({
            id: '',
            username: '',
            email: '',
            token: '',
            isONG: false
        });
        await AsyncStorage.clear();
    }
    return (
        <AuthContext.Provider value={{ isAuthenticated, user, signIn, signUp, signOut, loadingAuth, theme, altTheme, loading }}>
            {children}
        </AuthContext.Provider>
    );
}