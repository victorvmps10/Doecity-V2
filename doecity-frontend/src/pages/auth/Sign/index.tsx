import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Checkbox from 'expo-checkbox';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useContext, useState } from 'react';
import { AuthContext } from '@contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function Sign() {
  const { signIn, signUp, theme, altTheme, loadingAuth } = useContext(AuthContext);

  const [signType, setSignType] = useState(true);

  const [altTextButton, setAltTextButton] = useState("Não tem conta? Cadastre-se");
  const [loginTextButton, setLoginTextButton] = useState("Entrar");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isONG, setIsONG] = useState(false);
  const [hiddenPassword, setHiddenPassword] = useState(true);

  function signAlt() {
    setSignType(!signType);
    if (signType) {
      setAltTextButton("Tem conta? Entre");
      setLoginTextButton("Cadastrar");
    } else {
      setAltTextButton("Não tem conta? Cadastre-se");
      setLoginTextButton("Entrar");
    }
  }
  async function handleLogin() {
    if (signType) {
      if (email !== "" || password !== "") {
        await signIn({ email, password })
      }
    } else {
      if (name !== "" || email !== "" || password !== "") {
        await signUp({ name, email, password, ONG: isONG })
      }
    }

  }
  return (
    <KeyboardAvoidingView style={[
      style.container,
      theme ? { backgroundColor: '#2f1b36' }
        :
        { backgroundColor: '#fff' }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Image
        style={style.logo}
        source={require('../../../assets/logo.png')} />
      {!signType ?
        <TextInput
          style={style.input}
          placeholder='Username:'
          value={name}
          placeholderTextColor='#cbcbcb'
          onChangeText={(text) => setName(text)}
          maxLength={18} />
        : null
      }
      <TextInput style={style.input}
        placeholder='Email:'
        value={email}
        placeholderTextColor='#cbcbcb'
        onChangeText={(text) => setEmail(text)}
        maxLength={75} />
      <View style={style.passwordView}>
        <TextInput
          style={style.inputPassword}
          placeholder='Senha:'
          value={password}
          placeholderTextColor='#cbcbcb'
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={hiddenPassword}
          maxLength={75}
        />
        <TouchableOpacity
          onPress={() => setHiddenPassword(!hiddenPassword)}>
          <Ionicons
            name={hiddenPassword ? "eye-off" : "eye"}
            color='#f6b10a'
            size={25}
          />
        </TouchableOpacity>
      </View>



      {!signType ? <TouchableOpacity
        style={style.checkboxContainer}
        onPress={() => setIsONG(!isONG)}>
        <Checkbox
          value={isONG}
          onValueChange={setIsONG}
          style={style.checkbox}
          color={isONG ? "#f6b10a" : undefined}
        />
        <Text style={{ margin: 8, color: '#f6b10a' }}>Você é uma ONG?</Text>
      </TouchableOpacity> : null}
      <TouchableOpacity style={style.loginButton}
        onPress={() => handleLogin()}
      >
        {loadingAuth ?
          <ActivityIndicator color='#fff' size={25} />
          :
          <Text style={{ color: '#2f1b36' }}>{loginTextButton}</Text>}

      </TouchableOpacity>
      <TouchableOpacity onPress={() => signAlt()}>
        <Text style={{ color: '#f6b10a' }}>{altTextButton}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.theme}
        onPress={() => altTheme()}>

        <MaterialCommunityIcons name="theme-light-dark" size={32} color="#f6b10a" />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -50
  },
  logo: {
    marginBottom: 15,
    width: 300,
    height: 150,
    borderRadius: 15
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: '90%',
    margin: 10,
    height: 40,
    borderColor: '#000',
    color: '#000',
    borderWidth: 1,
    paddingHorizontal: 10
  },
  loginButton: {
    margin: 10,
    backgroundColor: '#f6b10a',
    width: '90%',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: 40
  },
  theme: {
    position: 'absolute',
    top: 75,
    right: 10
  },
  checkbox: {
    alignSelf: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  passwordView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
    margin: 10,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  inputPassword: {
    width: '90%'
  }
})