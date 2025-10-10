import { useContext, useEffect } from 'react';
import { Dimensions, FlatList, Platform, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AuthContext } from '@contexts/AuthContext';
import Header from '@components/Header';
import { AppContext } from '@contexts/AppContext';
import { useNavigation } from '@react-navigation/native';
import ListPost from '@components/ListPost';
import ListDiscover from '@components/ListDiscover';

const windowHeight = Dimensions.get('window').height;

export default function Discover() {
  const { listDiscoverONGS, loading, discoverData } = useContext(AppContext);
  useEffect(() => {
    listDiscoverONGS();
  }, []);
  async function handleListPost() {
    await listDiscoverONGS();
  }
  const { theme } = useContext(AuthContext);
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView
      style={[
        style.container,
        theme ? { backgroundColor: '#2f1b36' }
          :
          { backgroundColor: '#fff' }]}>
      <Header
        title="Descobrir"
        iconAft='search'
        pressAft={() => navigation.navigate('Search')} />
      {Platform.OS === 'web' ? (
        <ScrollView
          style={style.scrollWeb}
          contentContainerStyle={{ flexGrow: 1, marginBottom: 100 }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleListPost} />
          }
        >
          {discoverData.map((item) => (
            <ListDiscover
              id={item.id}
              name={item.name}
              userPhoto={item.photo}
              postId={item.posts[0]?.id}
              postPhoto={item.posts[0]?.photo}
              postTitle={item.posts[0]?.title}
              postDesc={item.posts[0]?.description}
              postCreated={item.posts[0]?.created_at}
            />
          ))}
        </ScrollView>
      ) : (
        <FlatList
          data={discoverData}

          renderItem={({ item }) =>
            <ListDiscover
              id={item.id}
              name={item.name}
              userPhoto={item.photo}
              postId={item.posts[0]?.id}
              postPhoto={item.posts[0]?.photo}
              postTitle={item.posts[0]?.title}
              postDesc={item.posts[0]?.description}
              postCreated={item.posts[0]?.created_at}
            />
          }
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleListPost} />
          }
          ListEmptyComponent={() => (
            <Text>Nenhum post encontrado.</Text>
          )}
        />
      )}

    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollWeb: {
    height: Platform.OS === 'web' ? windowHeight : undefined, // número
    width: '100%',
  },
})