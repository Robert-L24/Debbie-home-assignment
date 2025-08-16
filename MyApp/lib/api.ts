import axios from "axios";
import { API_BASE_URL } from "../lib/config";

export const api = {
  async post(path: string, body: any) {
    const res = await axios.post(API_BASE_URL + path, body, {
      headers: { "Content-Type": "application/json" }
    });
    return res.data;
  },

  async delete(path: string, { token }: { token?: string | null }) {
    try {
      const res = await axios.delete(API_BASE_URL + path, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      });
      return res.data;
    } catch {
      return {};
    }
  }
};
