import { useState } from "react";
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../lib/auth/AuthContext";
import { Button } from "../../components/ui/Button";

export default function LoginScreen() {
  const router = useRouter();
  const { login, status } = useAuth();
  const [email, setEmail] = useState("demo@myapp.ai");
  const [password, setPassword] = useState("demo1234");

  const disabled = status === "loading" || !email || !password;

  const onSubmit = async () => {
    const ok = await login(email, password);
    if (ok) router.replace("/(app)");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: undefined })}
      className="flex-1 bg-white"
    >
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-3xl font-bold mb-2">Welcome</Text>
        <Text className="text-gray-500 mb-8">Sign in to continue</Text>

        <View className="w-full gap-3">
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            className="border rounded-2xl p-3"
            value={email}
            onChangeText={setEmail}
            testID="email-input"
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            className="border rounded-2xl p-3"
            value={password}
            onChangeText={setPassword}
            testID="password-input"
          />
          <Button
            onPress={onSubmit}
            disabled={disabled}
            variant="primary"
            size="lg"
            testID="login-button"
          >
            {status === "loading" ? "Signing in..." : "Sign In"}
          </Button>
        </View>

        <Pressable className="mt-6">
          <Text className="text-brand">Forgot password?</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}