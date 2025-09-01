import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import AuthProvider from "./src/contexts/AuthContext";
import { StatusBar } from "react-native";


export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
      <Routes/>
      </AuthProvider>
    </NavigationContainer>
  );
}
