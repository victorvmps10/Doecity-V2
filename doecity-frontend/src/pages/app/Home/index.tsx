import { useContext, useEffect } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Platform, ScrollView, Dimensions, Linking } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import { AuthContext } from '@contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

import Header from '@components/Header';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { AppContext } from '@contexts/AppContext';
import ListPost from '@components/ListPost';
import { AntDesign } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;

export default function Home() {
  const { theme, user } = useContext(AuthContext);
  const { listPost, data, loading } = useContext(AppContext);
  const navigation = useNavigation<any>();
  useEffect(() => {
    handleListPost();
    console.log(data)
  }, []);
  async function handleListPost() {
    await listPost({ id: '' });
  }
  return (
    <SafeAreaView
      style={[
        style.container,
        theme ? { backgroundColor: '#2f1b36' }
          :
          { backgroundColor: '#fff' }]}>
      <Header title="Posts Recentes: " />
      {
        user.isONG ?
          <TouchableOpacity style={style.newButton} onPress={() => navigation.navigate('NewPost')}>
            <FontAwesome6
              name="add"
              size={24}
              color="#fff" />
            <Text style={{ color: '#fff' }}> Novo Post </Text>
          </TouchableOpacity>
          : null
      }
      {Platform.OS === 'web' ? (
        <ScrollView
          style={style.scrollWeb}
          contentContainerStyle={{ flexGrow: 1, marginBottom: 100 }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleListPost} />
          }
        >
          {data.map((item) => (
            <ListPost
              user_id={item.user_id}
              username={item.userName}
              title={item.title}
              description={item.description}
              created_at={item.created_at}
              photo={item.photo}
              photo_user={item.photo_user}
            />
          ))}

        </ScrollView>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListPost
              user_id={item.user_id}
              username={item.userName}
              title={item.title}
              description={item.description}
              created_at={item.created_at}
              photo={item.photo}
              photo_user={item.photo_user}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleListPost} />
          }
        />
      )}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  newButton: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#f6b10a',
    borderRadius: 10,
    height: 40,
    flexDirection: 'row'
  },
  container: {
    flex: 1,
  },
  scrollWeb: {
    height: Platform.OS === 'web' ? windowHeight : undefined, // número
    width: '100%',
  },

})