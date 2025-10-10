import { useContext } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { AuthContext } from '@contexts/AuthContext';

interface SlideProps {
  title: string;
  text: string;
  img?: any;
  backgroundColor?: string;
}

export default function Slides(props: SlideProps) {
  const { theme } = useContext(AuthContext);
  return (
    <View style={[
      style.container,
      theme ? { backgroundColor: '#2f1b36' }
        :
        { backgroundColor: '#fff' }]}>
      <Image source={props.img} style={style.img} />
      <Text style={style.title}>{props.title}</Text>
      <Text style={style.text}>{props.text}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#f6b10a',
  },
  text: {
    marginTop: 5,
    margin: 10,
    fontSize: 15,
    textAlign: 'center',
    color: '#f6b10a',
    marginHorizontal: 35
  },
})