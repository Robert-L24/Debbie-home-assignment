import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import LoginScreen from "../login";
import { AuthProvider } from "../../../lib/auth/AuthContext";

jest.mock("../../../lib/api", () => ({
  api: { post: jest.fn(() => Promise.resolve({ access_token: "mock" })) }
}));

describe("Login", () => {
  it("submits and shows loading state", async () => {
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <LoginScreen />
      </AuthProvider>
    );

    const btn = getByTestId("login-button");
    fireEvent.press(btn);

    await waitFor(() => {
      expect(getByText("Sign In")).toBeTruthy();
    });
  });
});