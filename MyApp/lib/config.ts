import Constants from "expo-constants";

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ??
  (Constants.expoConfig?.extra?.API_BASE_URL as string | undefined) ??
  "http://localhost:3000";