import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthContext';
import { useNavigation } from '@react-navigation/native';

type AppContextData = {
    createPost: (Credentials: CreatePostProps) => Promise<void>;
    listPost: () => Promise<void>;
    listUser: (Credentials: ListProps) => Promise<void>;
    loading: boolean;
    data: Post[];
    ongs: Ong[];
}

interface Post {
    id: string;
    title: string;
    description: string;
    userName: string;
    user_id: string;
    draft: boolean;
    created_at: Date;
    update_at: Date;
}

interface Ong{
    username: string;
    name: string;
    photo: string;
}
type AppProviderProps = {
    children: ReactNode;
}

type CreatePostProps = {
    title: string;
    description: string;
}

type ListProps = {
    Username: string;
}
export const AppContext = createContext({} as AppContextData);

export default function AppProvider({ children }: AppProviderProps) {
    const navigation = useNavigation<any>();

    const { user } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [ongs, setONGS] = useState([]);
    async function createPost({ title, description }: CreatePostProps) {
        setLoading(true);
        try {
            api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            const response = await api.post('/posts/create',
                { title, description, user_id: user.id, draft: false }
            );
            setLoading(false);
            navigation.navigate("Home");

        } catch {

        }

    }
    async function listPost() {
        try {
            setLoading(true);
            api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            const response = await api.get('/posts/list',

            );
            const sorted = response.data.sort(
                (a: Post, b: Post) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
            );
            setData(sorted);
            setLoading(false);
        } catch (err) {
            console.log('erro' + err);
            setLoading(false);
        }
    }
    async function listUser({ Username }: ListProps) {
        const response = await api.get('/users/detail',
            {
                params: {
                    Search: 'true',
                    username: Username
                }
            }
        );
        setONGS(response.data);
    }
    return (
        <AppContext.Provider value={{ createPost, listPost, listUser, data, loading, ongs }}>
            {children}
        </AppContext.Provider>
    );
}