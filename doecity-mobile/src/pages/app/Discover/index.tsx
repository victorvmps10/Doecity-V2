import { useContext } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { AuthContext } from '@contexts/AuthContext';
import Header from '@components/Header';

export default function Discover() {
  const { theme } = useContext(AuthContext);
  return (
    <SafeAreaView
      style={[
        style.container,
        theme ? { backgroundColor: '#2f1b36' }
          :
          { backgroundColor: '#fff' }]}>
      <Header title="Descobrir" />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1
  }
})