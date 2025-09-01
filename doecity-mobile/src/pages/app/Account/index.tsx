import { useContext } from 'react';
import { Alert, Image, Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AuthContext } from '@contexts/AuthContext';
import Header from '@components/Header';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function Account() {
  const { altTheme, signOut, theme } = useContext(AuthContext);
  const UserIco = '';

  function handleSignOut() {
    Alert.alert(
      'Confirmar',
      'Deseja Sair da Conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Confirmar',
          onPress: () => signOut()
        }
      ]
    )
  }
 
  return (
    <SafeAreaView style={[
      style.container,
      theme ? { backgroundColor: '#2f1b36' }
        :
        { backgroundColor: '#fff' }]}>
      <Header title="Conta" />
      <TouchableOpacity
        style={style.imgButton}
        onPress={() => null}>
        {UserIco ?
          <Image
            //source={null}
            style={style.img} />
          :
          <MaterialIcons
            name="account-circle"
            size={150}
            color={theme ? '#f6b10a' : '#2f1b36'} />
        }
      </TouchableOpacity>

      <View style={style.rowButtons}>
        <TouchableOpacity
          style={[style.button, {
            backgroundColor: theme ? '#f6b10a' : '#2f1b36'
          }]}
          onPress={() => null}>
          <FontAwesome5
            name="user-edit"
            size={28}
            color="#fff" />
          <Text style={style.textButton}>Editar Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.button, {
            backgroundColor: theme ? '#f6b10a' : '#2f1b36'
          }]}
          onPress={() => altTheme()}>
          <MaterialCommunityIcons
            name="theme-light-dark"
            size={32}
            color="#fff" />
          <Text style={style.textButton}>Trocar Tema</Text>
        </TouchableOpacity>
      </View>

      <View style={style.rowButtons}>
        <TouchableOpacity
          style={[style.button, {
            backgroundColor: theme ? '#f6b10a' : '#2f1b36'
          }]}
          onPress={() => null}>
          <MaterialCommunityIcons
            name="finance"
            size={32}
            color="#fff" />
          <Text style={style.textButton}>Financeiro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.button, {
            backgroundColor: theme ? '#f6b10a' : '#2f1b36'
          }]}
          onPress={() => null}>
          <Ionicons
            name="chatbox-ellipses"
            size={32}
            color="#fff" />
          <Text style={style.textButton}>Chats</Text>
        </TouchableOpacity>
      </View>
      <View style={style.rowButtons}>
        <TouchableOpacity
          style={[style.button, {
            backgroundColor: theme ? '#f6b10a' : '#2f1b36'
          }]}
          onPress={() => Linking.openURL('mailto:suportdoecity@gmail.com')}>
          <AntDesign
            name="customerservice"
            size={32}
            color="#fff" />
          <Text style={style.textButton}>Suporte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.button, { backgroundColor: '#FF0000' }]}
          onPress={() => handleSignOut()}>
          <MaterialCommunityIcons
            name="logout"
            size={32}
            color="#fff" />
          <Text style={style.textButton}>Deslogar</Text>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
}


const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    width: 175,
    height: 100,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#fff',
    marginHorizontal: 10
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    height: 150
  },
  imgButton: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})