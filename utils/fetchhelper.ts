import { BASE_URL } from "./config";

export const fetchWithCredentials = async (endpoint: string, options: RequestInit = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include", 
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${res.statusText} - ${text}`);
  }

  return res.json();
};
