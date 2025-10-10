import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';

import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthContext';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

type AppContextData = {
    createPost: (Credentials: CreatePostProps) => Promise<void>;
    listPost: (Credentials: ListPostProps) => Promise<void>;
    listUser: (Credentials: ListUserProps) => Promise<void>;
    detailUser: (Credentials: DetailUserProps) => Promise<void>;
    setPostPhoto: () => Promise<void>;
    listDiscoverONGS: () => Promise<void>;
    photo: string;
    loading: boolean;
    data: Post[];
    postONG: Post[];
    setPostONG: Dispatch<SetStateAction<Post[]>>;
    ongs: Ong[];
    discoverData: any[];
    info: any[];
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

export const AppContext = createContext({} as AppContextData);

export default function AppProvider({ children }: AppProviderProps) {
    const navigation = useNavigation<any>();

    const { user } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [postONG, setPostONG] = useState<Post[]>([]);
    const [discoverData, setDiscoverData] = useState<any[]>([]);
    const [ongs, setONGS] = useState([]);
    const [info, setInfo] = useState<any>([]);
    const [photo, setPhoto] = useState("");

    async function createPost({ title, description }: CreatePostProps) {
        const formData = new FormData();

        formData.append("typeImage", "post");
        formData.append("title", title);
        formData.append("description", description);
        if (photo) {
            formData.append("file", {
                uri: photo,
                type: "image/jpeg",
                name: "upload.jpg",
            } as any);
        }


        try {
            api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            const response = await api.post("/posts/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },

            });

            console.log("Post Criado:", response.data);

        } catch (error) {
            console.error("Erro upload:", error);
        }
        setPhoto('');
        navigation.navigate('Home');
    }
    async function setPostPhoto() {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 1,
            allowsMultipleSelection: false,
        });
        if (!result.canceled) {
            console.log("Imagem escolhida:", result.assets[0].uri);
            setPhoto(result.assets[0].uri);
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

    return (
        <AppContext.Provider value={{
            createPost, listPost, listUser, listDiscoverONGS, setPostPhoto, detailUser,
            data, loading, ongs, photo, discoverData, postONG, setPostONG, info
        }}>
            {children}
        </AppContext.Provider>
    );
}