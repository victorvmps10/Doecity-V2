import { useContext, useEffect } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AuthContext } from '@contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

import Header from '@components/Header';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { AppContext } from '@contexts/AppContext';
import ListPost from '@components/ListPost';


export default function Home() {
  const { theme, user } = useContext(AuthContext);
  const { listPost, data, loading } = useContext(AppContext);
  const navigation = useNavigation<any>();
  useEffect(() => {
    async function handleListPost() {
      await listPost();
    }
    handleListPost();
    console.log(data)
  }, [])
  return (
    <SafeAreaView
      style={[
        style.container,
        theme ? { backgroundColor: '#2f1b36' }
          :
          { backgroundColor: '#fff' }]}>
      <Header title="Posts Recentes: " />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}

        renderItem={({ item }) =>
          <ListPost
            username={item.userName}
            title={item.title}
            description={item.description}
            created_at={item.created_at}
          />
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={listPost} />
        }
        ListEmptyComponent={() => (
          <Text>Nenhum post encontrado.</Text>
        )}
      />
      {user.isONG ?
        <TouchableOpacity
          style={style.addButton}
          onPress={() => navigation.navigate('NewPost')}
        >
          <FontAwesome6
            name="add"
            size={24}
            color="black" />
        </TouchableOpacity>
        : null}


    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  addButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#f6b10a',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
})