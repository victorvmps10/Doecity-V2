import { useContext, useState } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { SafeAreaView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import { AuthContext } from '@contexts/AuthContext';
import Slides from '../../../components/Slides';
import { useNavigation } from '@react-navigation/native';

import Slide1 from '@assets/slide1.png';
import Slide2 from '@assets/slide2.png';
import Slide3 from '@assets/slide3.png';
import Slide4 from '@assets/slide4.png';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Welcome() {
  const { theme, altTheme } = useContext(AuthContext);
  const navigation = useNavigation<any>();
  const DATA = [
    {
      id: 1,
      title: 'O que é DoeCity',
      text: 'Uma plataforma que ajuda a garantir que a sua doação chegue sem nenhum desvio de verba.',
      img: Slide1
    },
    {
      id: 2,
      title: 'Futuro',
      text: 'Planejamos abranger todas as cidades e estados do Brasil, já que somos um projeto 100% brasileiro, e, quem sabe, no futuro, o mundo todo.',
      img: Slide2
    },
    {
      id: 3,
      title: '100% na prática',
      text: 'Nós somos um indexador de links diretamente para os sites das ONGs, permitindo também fazer as transações via app, para fornecer relatórios sobre o status da sua doação e garantir que não ocorra nenhum desvio.',
      img: Slide3
    },
    {
      id: 4,
      title: 'Segurança',
      text: 'Para garantir que não sejam feitas fraudes de doações em seu nome ou e-mail, é necessário ter uma conta para assegurar a sua segurança e a da ONG destinada.',
      img: Slide4
    },
  ]
  return (
    <View style={[
      style.container,
      theme ? { backgroundColor: '#2f1b36' }
        :
        { backgroundColor: '#fff' }]}>
      <AppIntroSlider
      style={{flex: 1, marginTop: 50}}
        data={DATA}
        renderItem={({ item }) =>
          <Slides
            title={item.title}
            text={item.text}
            img={item.img}
          />
        }
        keyExtractor={item => String(item.id)}
        activeDotStyle={{
          backgroundColor: '#f6b10a',
          width: 30,
        }}
        renderNextButton={() => <Text style={{ color: '#f6b10a' }}>PRÓXIMO</Text>}
        renderDoneButton={() => <Text style={{ color: '#f6b10a' }}>INICIAR</Text>}

        onDone={() => { navigation.navigate('Sign') }}
      />
      <TouchableOpacity
        style={style.theme}
        onPress={() => altTheme()}>

        <MaterialCommunityIcons name="theme-light-dark" size={32} color="#f6b10a" />
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -50,
  },
  theme: {
    position: 'absolute',
    top: 75,
    right: 10
  },

})