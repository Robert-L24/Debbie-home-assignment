import { Stack } from "expo-router";
import { AuthProvider } from "../lib/auth/AuthContext";

import "../global.css"

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}