import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StatusBar, View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { AuthContext } from '@contexts/AuthContext';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

export default function Routes() {
  const { isAuthenticated, loading, theme } = useContext(AuthContext);
  const [showPrompt, setShowPrompt] = useState(false);
  const [platformDetected, setPlatformDetected] = useState<'android' | 'ios' | null>(null);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const ua = navigator.userAgent || navigator.vendor;

      if (/android/i.test(ua)) {
        setPlatformDetected('android');
        setShowPrompt(true);
      } else if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
        setPlatformDetected('ios');
        setShowPrompt(true);
      }
    }
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{ backgroundColor: '#2f1b36', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#f6b10a" size={30} />
      </SafeAreaView>
    );
  }

  const storeUrl = 'https://drive.google.com/drive/folders/1VOg96G7jbXeFRVWyqgC4jYpOlx1PxLXI?usp=sharing';

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
      {showPrompt && (
        <View style={styles.overlay}>
          <View style={styles.box}>
            <Text style={styles.title}>Baixe o aplicativo DoeCity</Text>
            <Text style={styles.subtitle}>
              Você está usando um dispositivo {platformDetected === 'android' ? 'Android' : 'iOS'}.
              {'\n'}Para uma melhor experiência, instale o app oficial.
            </Text>

            <TouchableOpacity style={styles.button} onPress={() => window.open(storeUrl, '_blank')}>
              <Text style={styles.buttonText}>
                {platformDetected === 'android' ? 'Abrir no Drive APK' : 'Não compativel com Iphone'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <StatusBar
        barStyle={theme ? 'light-content' : 'dark-content'}
        backgroundColor={theme ? '#2f1b36' : '#FFF'}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  box: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#291630ff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  button: {
    backgroundColor: '#f6b10a',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  close: {
    color: '#291630ff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
