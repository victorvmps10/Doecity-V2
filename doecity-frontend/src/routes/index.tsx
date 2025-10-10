import { ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

import { useContext } from 'react';
import { AuthContext } from '@contexts/AuthContext';

export default function Routes() {
 
  const { isAuthenticated, loading, theme } = useContext(AuthContext);
  if(loading){
    return(
      <SafeAreaView style={{ backgroundColor: '#2f1b36',flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#f6b10a" size={30}/>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {
        isAuthenticated ? <AppRoutes /> : <AuthRoutes />
      }
      <StatusBar 
       barStyle={theme ? "light-content" : "dark-content"} 
       backgroundColor={theme ? "#2f1b36" : "#FFF"} 
       />
       
    </SafeAreaView>
  );
}