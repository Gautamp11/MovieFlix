import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Stack, useRootNavigationState, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./globals.css";

const AppNavigator = () => {
  const { isLoading, user } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key || isLoading) return;

    const inTabsGroup = segments[0] === "(tabs)";
    const inMovieDetails = segments[0] === "movies";
    const inProtectedRoutes = inTabsGroup || inMovieDetails;
    const inAuthScreens = segments[0] === "login" || segments[0] === "signup";

    if (!user && inProtectedRoutes) {
      router.replace("/login");
      return;
    }

    if (user && inAuthScreens) {
      router.replace("/(tabs)");
    }
  }, [isLoading, navigationState?.key, router, segments, user]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-primary">
        <ActivityIndicator size="large" color="#AB8BFF" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar hidden />
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
