import { createContext, ReactNode, useEffect, useState } from 'react';

import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    loading: boolean;
    loadingAuth: boolean;
    signIn: (Credentials: SignInProps) => Promise<void>;
    signUp: (Credentials: SignUpProps) => Promise<void>;
    updateUser: (Credentials: UpdateUser) => Promise<void>;
    signOut: () => Promise<void>;
    theme: boolean;
    altTheme: () => Promise<void>;
    setUserPhoto: () => Promise<void>;
    photo: string;
}

type UserProps = {
    id: string;
    name: string;
    username: string;
    email: string;
    description: string;
    token: string;
    photo: string;
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

type UpdateUser = {
    Name: string;
    Email: string;
    Username: string;
    Description: string;
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

                const accountData = JSON.parse(account);
                console.log(accountData);
                setUser(accountData);
                setPhoto(accountData.photo);
                console.log(accountData.photo);
            }
            setLoading(false);
        }

        loadStorage();
    }, [])
    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        username: '',
        description: '',
        email: '',
        photo: '',
        token: '',
        isONG: false
    });
    const [loading, setLoading] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [theme, setTheme] = useState(false);
    const [photo, setPhoto] = useState("");
    const isAuthenticated = !!user.token;

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

            const { id, name, username, description, photo, token, isONG } = response.data;

            const data = {
                ...response.data,
                photo: `${api.defaults.baseURL}/upload/${response.data.photo}`
            }
            setPhoto(`${api.defaults.baseURL}/upload/${response.data.photo}`);
            await AsyncStorage.setItem('@doecity/user', JSON.stringify(data));

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser({
                id,
                name,
                username,
                email,
                description,
                photo: `${api.defaults.baseURL}/upload/${response.data.photo}`,
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

            const { id, username, token, photo, isONG } = response.data;
            const data = {
                ...response.data
            }
            setPhoto('');
            await AsyncStorage.setItem('@doecity/user', JSON.stringify(data));

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser({
                id,
                name,
                username,
                description: '',
                email,
                photo: '',
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
            name: '',
            username: '',
            description: '',
            email: '',
            photo: '',
            token: '',
            isONG: false
        });
        setPhoto('');
        await AsyncStorage.clear();
    }
    async function updateUser({ Name, Username, Description, Email }: UpdateUser) {
        try {
            api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            const response = await api.put('/users/edit', {
                name: Name,
                username: Username,
                email: Email,
                description: Description,
            });

            console.log(response.data)

            const { name, username, email, description } = response.data;

            let newUserData = {
                id: user.id,
                name: Name,
                username: Username,
                description: Description,
                email: Email,
                photo: user.photo,
                token: user.token,
                isONG: user.isONG
            }
            setUser(newUserData);
            const data = {
                ...newUserData
            }
            await AsyncStorage.setItem('@doecity/user', JSON.stringify(data));
            setLoadingAuth(false);
        } catch (err) {
            console.log(err);
            setLoadingAuth(false);
        }
    }
    async function setUserPhoto() {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 1,
            allowsMultipleSelection: false,
        });

        if (!result.canceled) {
            console.log("Imagem escolhida:", result.assets[0].uri);
            const newPhoto = result.assets[0].uri;
            setPhoto(result.assets[0].uri);


            if (!photo) return;

            const formData = new FormData();

            formData.append("typeImage", "user");

            formData.append("file", {
                uri: newPhoto,
                type: "image/jpeg",
                name: "upload.jpg",
            } as any);

            try {
                api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
                const response = await api.put("/users/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },

                });
                let newUserData = {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    description: user.description,
                    email: user.email,
                    photo: `${api.defaults.baseURL}/upload/${response.data.photo}`,
                    token: user.token,
                    isONG: user.isONG
                }
                setUser(newUserData);
                const data = {
                    ...newUserData
                }
                await AsyncStorage.setItem('@doecity/user', JSON.stringify(data));
                console.log("Upload sucesso:", response.data);
            } catch (error) {
                console.error("Erro upload:", error);
            }
        }
    }
    return (
        <AuthContext.Provider value={{
            isAuthenticated, user, signIn, signUp, signOut,
            updateUser, loadingAuth, theme, altTheme, loading, setUserPhoto, photo
        }}>
            {children}
        </AuthContext.Provider>
    );
}