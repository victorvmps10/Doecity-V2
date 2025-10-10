import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "@pages/auth/Welcome";
import Sign from "@pages/auth/Sign";

export default function AuthRoutes() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>

            <Stack.Screen
                name="Welcome"
                component={Welcome}
            />
            <Stack.Screen
                name="Sign"
                component={Sign}
            />
        </Stack.Navigator>
    );
}