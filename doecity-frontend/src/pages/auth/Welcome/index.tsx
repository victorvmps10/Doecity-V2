import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  Image
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '@contexts/AuthContext';

import Slide1 from '@assets/slide1.png';
import Slide2 from '@assets/slide2.png';
import Slide3 from '@assets/slide3.png';
import Slide4 from '@assets/slide4.png';

const { width } = Dimensions.get('window');

export default function Welcome() {
  const { theme, altTheme } = useContext(AuthContext);
  const navigation = useNavigation<any>();
  const [currentIndex, setCurrentIndex] = useState(0);

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
  ];

  const renderSlide = ({ item, index }: any) => {
    const isLast = index === DATA.length - 1;

    return (
      <View style={[styles.slide, Platform.OS === 'web' ? styles.webSlide : {}]}>
        <Image source={item.img} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>

        {Platform.OS === 'web' && (
          <View style={styles.webControls}>
            <View style={styles.dotsContainer}>
              {DATA.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    currentIndex === i ? styles.activeDot : {}
                  ]}
                />
              ))}
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                if (isLast) {
                  navigation.navigate('Sign');
                } else {
                  sliderRef.current?.goToSlide(index + 1, true);
                }
              }}
            >
              <Text style={styles.buttonText}>{isLast ? 'INICIAR' : 'PRÓXIMO'}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const sliderRef = React.useRef<AppIntroSlider>(null);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme ? '#2f1b36' : '#fff' }]}>
      <AppIntroSlider
        ref={sliderRef}
        data={DATA}
        renderItem={renderSlide}
        keyExtractor={item => String(item.id)}
        activeDotStyle={Platform.OS === 'web' ? {} : styles.activeDot}
        showNextButton={Platform.OS !== 'web'}
        showDoneButton={Platform.OS !== 'web'}
        renderNextButton={
          Platform.OS !== 'web'
            ? () => <Text style={{ color: '#f6b10a', fontWeight: 'bold' }}>PRÓXIMO</Text>
            : undefined
        }
        renderDoneButton={
          Platform.OS !== 'web'
            ? () => <Text style={{ color: '#f6b10a', fontWeight: 'bold' }}>INICIAR</Text>
            : undefined
        }
        renderPagination={Platform.OS === 'web' ? () => null : undefined}
        onDone={() => navigation.navigate('Sign')}
        onSlideChange={(index) => setCurrentIndex(index)}
      />

      <TouchableOpacity style={styles.themeButton} onPress={altTheme}>
        <MaterialCommunityIcons name="theme-light-dark" size={32} color="#f6b10a" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    width,
  },
  webSlide: {
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f6b10a',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#f6b10a',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  activeDot: {
    backgroundColor: '#f6b10a',
    width: 30,
  },
  webControls: {
    marginTop: 20,
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  buttonContainer: {
    backgroundColor: '#f6b10a',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  buttonText: {
    color: '#2f1b36',
    fontWeight: 'bold',
    fontSize: 16,
  },
  themeButton: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 20 : 25,
    right: 10,
  },
});
