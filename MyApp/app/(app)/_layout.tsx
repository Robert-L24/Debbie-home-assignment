import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "../../lib/auth/AuthContext";

export default function AppLayout() {
  const router = useRouter();
  const { token, hydrated } = useAuth();

  useEffect(() => {
    if (hydrated && !token) {
      router.replace("/(auth)/login");
    }
  }, [hydrated, token]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}