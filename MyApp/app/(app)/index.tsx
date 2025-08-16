import { View, Text, Alert } from "react-native";
import { Button } from "../../components/ui/Button";
import { useAuth } from "../../lib/auth/AuthContext";
import { api } from "../../lib/api";

export default function Home() {
  const { token, logout } = useAuth();

  const onDelete = async () => {
    try {
      await api.delete("/users/me", { token });
      Alert.alert("Account deleted", "Your account has been deleted.");
      logout();
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Failed to delete account");
    }
  };

  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <Text className="text-2xl font-semibold mb-4">Home</Text>
      <Text className="text-gray-500 mb-8">You're signed in.</Text>

      <View className="gap-3 w-full">
        <Button variant="destructive" onPress={onDelete} testID="delete-account">
          Delete Account
        </Button>
        <Button variant="secondary" onPress={logout}>
          Sign Out
        </Button>
      </View>
    </View>
  );
}