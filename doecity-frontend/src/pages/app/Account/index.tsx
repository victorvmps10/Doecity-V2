import { useContext, useEffect, useState } from 'react';
import { Alert, Image, Linking, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { AuthContext } from '@contexts/AuthContext';
import Header from '@components/Header';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
export default function Account() {
  const { altTheme, signOut, theme, setUserPhoto, photo } = useContext(AuthContext);

  const navigation = useNavigation<any>();
  function handleSignOut() {
    if (Platform.OS === 'web') {
      const confirm = window.confirm('Deseja sair da conta?');
      if (confirm) signOut();
      return;
    }
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
  async function handlePhoto() {
    await setUserPhoto();

  }
  return (
    <SafeAreaView style={[
      style.container,
      theme ? { backgroundColor: '#2f1b36' }
        :
        { backgroundColor: '#fff' }]}
    >
      <Header title="Conta" />
      <TouchableOpacity
        style={style.imgButton}
        onPress={handlePhoto}>
        {photo ?
          <Image
            source={{ uri: photo }}
            style={style.img}

          />
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
          }, Platform.OS == 'web' ? { width: '48%' } : { width: 180 }]}
          onPress={() => navigation.navigate('EditUser')}>
          <FontAwesome5
            name="user-edit"
            size={28}
            color="#fff" />
          <Text style={style.textButton}>Editar Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.button, {
            backgroundColor: theme ? '#f6b10a' : '#2f1b36'
          }, Platform.OS == 'web' ? { width: '48%' } : { width: 180 }]}
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
          }, Platform.OS == 'web' ? { width: '48%' } : { width: 180 }]}
          onPress={() => navigation.navigate('Finance')}>
          <MaterialCommunityIcons
            name="finance"
            size={32}
            color="#fff" />
          <Text style={style.textButton}>Financeiro</Text>
        </TouchableOpacity>
         <TouchableOpacity
          style={[style.button, { backgroundColor: '#FF0000', },
          Platform.OS == 'web' ? { width: '48%' } : { width: 180 }
          ]}
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
    height: 130,
    borderRadius: 75
  },
  imgButton: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})