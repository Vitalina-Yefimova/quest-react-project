import { useUserStore } from "../store/userStore";

export async function handleTokenLogin(access_token?: string) {
  const setUser = useUserStore.getState().setUser;

  if (!access_token) {
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    access_token = match ? match.split("=")[1] : undefined;
    if (!access_token) {
      throw new Error("Token not found in cookies");
    }
  }

  document.cookie = "access_token=; path=/; max-age=0";
  document.cookie = `access_token=${access_token}; path=/; expires=${new Date(
    Date.now() + 3600 * 1000
  ).toUTCString()}; samesite=strict`;

  const payload = JSON.parse(atob(access_token.split(".")[1]));
  const userId = payload.sub;

  const res = await fetch(`http://localhost:3000/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }

  const user = await res.json();
  setUser(user);
}
