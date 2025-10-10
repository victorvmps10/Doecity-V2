import Header from '@components/Header';
import { Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useContext } from 'react';
import Victor from '@assets/Victor.png';
import Juan from '@assets/Juan.png';
import Pan from '@assets/Pan.png';
import Iuri from '@assets/Iuri.png';
import { AuthContext } from '@contexts/AuthContext';
export default function Info() {
  const { theme } = useContext(AuthContext);
  return (
    <SafeAreaView
      style={[
        style.container,
        theme ? { backgroundColor: '#2f1b36' }
          :
          { backgroundColor: '#fff' }]}>
      <Header title="Sobre Nós" />
      {Platform.OS == 'web' ?
        <ScrollView horizontal={true}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
          }}>
          <View style={{ margin: 10, alignItems: 'center' }}>
            <Image source={Victor} style={style.img} />
            <Text style={style.name}>
              Victor Valentim
            </Text>
          </View>
          <View style={{ margin: 10, alignItems: 'center' }}>
            <Image source={Pan} style={style.img} />
            <Text style={style.name}>
              Arthur Pan
            </Text>
          </View>
          <View style={{ margin: 10, alignItems: 'center' }}>
            <Image source={Juan} style={style.img} />
            <Text style={style.name}>
              Juan Luiz
            </Text>
          </View>
          <View style={{ margin: 10, alignItems: 'center' }}>
            <Image source={Iuri} style={style.img} />
            <Text style={style.name}>
              Iuri Chagas
            </Text>
          </View>
        </ScrollView>
        :
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ margin: 10, alignItems: 'center' }}>
              <Image source={Victor} style={style.imgMobile} />
              <Text style={style.name}>
                Victor Val.
              </Text>
            </View>
            <View style={{ margin: 10, alignItems: 'center' }}>
              <Image source={Pan} style={style.imgMobile} />
              <Text style={style.name}>
                Arthur Pan
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <View style={{ margin: 10, alignItems: 'center' }}>
              <Image source={Juan} style={style.imgMobile} />
              <Text style={style.name}>
                Juan Luiz
              </Text>
            </View>
            <View style={{ margin: 10, alignItems: 'center' }}>
              <Image source={Iuri} style={style.imgMobile} />
              <Text style={style.name}>
                Iuri Chagas
              </Text>
            </View>
          </View>

        </ScrollView>
      }



    </SafeAreaView >
  );
}


const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontSize: 25,
    margin: 5,
    color: '#f6b10a'
  },
  img: {
    width: 250,
    height: 250,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#f6b10a'
  },
  imgMobile: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#f6b10a'
  }
})