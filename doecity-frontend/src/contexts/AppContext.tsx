import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';

import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthContext';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Platform } from 'react-native';

type AppContextData = {
    createPost: (Credentials: CreatePostProps) => Promise<void>;
    listPost: (Credentials: ListPostProps) => Promise<void>;
    listUser: (Credentials: ListUserProps) => Promise<void>;
    detailUser: (Credentials: DetailUserProps) => Promise<void>;
    depositFinance: (Credentials: DepositProps) => Promise<void>;
    sakeFinance: (Credentials: DepositProps) => Promise<void>;
    listFinance: (Credentials: ListFinanceProps) => Promise<void>;
    setPostPhoto: () => Promise<void>;
    listDiscoverONGS: () => Promise<void>;
    photo: File | string;
    loading: boolean;
    data: Post[];
    postONG: Post[];
    setPostONG: Dispatch<SetStateAction<Post[]>>;
    ongs: Ong[];
    discoverData: any[];
    info: any[];
    finances: any[];
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
    photo_user: string;
    photo: string;
}

interface Ong {
    id: string;
    username: string;
    name: string;
    photo: string;
}

type DepositProps = {
    title?: string,
    value: number,
    description?: string
}

type AppProviderProps = {
    children: ReactNode;
}

type CreatePostProps = {
    title: string;
    description: string;
    photo: string;
}

type ListUserProps = {
    Username: string;
}

type ListPostProps = {
    id: string;
}

type DetailUserProps = {
    user_id: string;
}

type ListFinanceProps = {
    user_id?: string;
    ong_id?: string;
    isONG: string;
}

export const AppContext = createContext({} as AppContextData);

export default function AppProvider({ children }: AppProviderProps) {
    const navigation = useNavigation<any>();

    const { user } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [postONG, setPostONG] = useState<Post[]>([]);
    const [discoverData, setDiscoverData] = useState<any[]>([]);
    const [ongs, setONGS] = useState([]);
    const [finances, setFinances] = useState([]);
    const [info, setInfo] = useState<any>([]);
    const [photo, setPhoto] = useState<File | string>("");

    async function createPost({ title, description }: CreatePostProps) {
        if (!title || !description) {
            alert('Preencha título e descrição!');
            return;
        }

        setLoading(true);
        const formData = new FormData();

        formData.append('typeImage', 'post');
        formData.append('title', title);
        formData.append('description', description);

        if (photo) {
            if (Platform.OS === 'web' && photo instanceof File) {
                formData.append('file', photo, photo.name);
            } else {
                formData.append('file', {
                    uri: photo,
                    type: 'image/jpeg',
                    name: 'upload.jpg',
                } as any);
            }
        }

        try {
            api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            const response = await api.post('/posts/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log('Post criado:', response.data);
            setPhoto("");
            navigation.navigate('Home');
        } catch (error) {
            console.error('Erro ao criar post:', error);
            alert('Erro ao criar post');
        } finally {
            setLoading(false);
        }
    }
    async function setPostPhoto() {
        if (Platform.OS === 'web') {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (event: any) => {
                const file = event.target.files[0];
                if (!file) return;
                setPhoto(file); // salva o File real
            };
            input.click();
        } else {
            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permission.granted) return;

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                allowsMultipleSelection: false,
            });

            if (!result.canceled) {
                setPhoto(result.assets[0].uri); // salva URI no Mobile
            }
        }
    }
    async function listPost({ id }: ListPostProps) {
        try {
            setLoading(true);
            api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            const response = await api.get('/posts/list',
                {
                    params: {
                        user_id: id
                    }
                }
            );
            const sorted = response.data.sort(
                (a: Post, b: Post) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
            );
            if (id !== '') {
                setPostONG(sorted);
            } else {
                setData(sorted);
            }

            setLoading(false);
        } catch (err) {
            console.log('erro' + err);
            setLoading(false);
        }
    }

    async function listUser({ Username }: ListUserProps) {
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
    async function detailUser({ user_id }: DetailUserProps) {
        const response = await api.get('/users/detail',
            {
                params: {
                    Search: 'false',
                    user_id: user_id
                }
            }
        );
        setInfo(response.data);
    }

    async function listDiscoverONGS() {
        try {
            const response = await api.get('/users/discover');
            setDiscoverData(response.data);
            console.log(response.data);
        } catch (err) {
            console.error('Erro ao listar ONGs e posts:', err);
            setLoading(false);
        }
    }
    async function depositFinance({ title, value, description }: DepositProps) {
        try {
            api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            const response = await api.put('/finances/deposit', {
                value,
                title: title,
                description: description,
                user_id: user.id
            });
        } catch (err) {
            console.error('Erro ao listar ONGs e posts:', err);
            setLoading(false);
        }
    }
    async function sakeFinance({ title, value, description }: DepositProps) {
        try {
            api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            const response = await api.put('/finances/sake', {
                value,
                title: title,
                description: description,
                user_id: user.id
            }).catch((error) => {
                if (Platform.OS === 'web') {
                    console.log(error.response.data.error);
                    const message = window.alert("Erro: Saldo Insuficiente/Bloqueado");
                    return;
                }
                Alert.alert(
                    'Erro',
                    "Saldo Insuficiente/Bloqueado"
                )
            })
        } catch (err) {
            console.error('Erro ao listar ONGs e posts:', err);
            setLoading(false);
        }
    }
    async function listFinance({ user_id, ong_id, isONG }: ListFinanceProps) {
        const response = await api.get('/finances/list',
            {
                params: { user_id, ong_id, isONG }
            }
        );
        setFinances(response.data);
        console.log(response.data);

    }
    return (
        <AppContext.Provider value={{
            createPost, listPost, listUser, listDiscoverONGS, setPostPhoto, detailUser, depositFinance, sakeFinance,
            data, loading, ongs, photo, discoverData, postONG, setPostONG, info, listFinance, finances
        }}>
            {children}
        </AppContext.Provider>
    );
}