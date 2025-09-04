import { useContext } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { AuthContext } from '@contexts/AuthContext';
import Header from '@components/Header';
import { AppContext } from '@contexts/AppContext';
import { useNavigation } from '@react-navigation/native';

export default function Discover() {
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
      pressAft={()=>navigation.navigate('Search')}/>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1
  }
})