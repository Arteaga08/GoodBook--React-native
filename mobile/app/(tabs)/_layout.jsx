import { Tabs, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../../components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "../../store/authStore";
import { useEffect } from "react";
import COLORS from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { checkAuth, user, token } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    console.log("user:", user, "token:", token, "segments:", segments);
    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;
    if (!isSignedIn && !inAuthScreen) router.replace("/(auth)");
    else if (isSignedIn && inAuthScreen) router.replace("/(tabs)");
  }, [user, token, segments]);

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: COLORS.primary,
            headerTitleStyle: {
              color: COLORS.textPrimary,
              fontWeight: "600",
            },
            headerShadowVisible: false,
            tabBarStyle: {
              backgroundColor: COLORS.cardBackground,
              borderTopWidth: 1,
              borderTopColor: COLORS.border,
              paddingTop: 5,
              height: 60,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="create"
            options={{
              title: "Create",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="add-circle-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}