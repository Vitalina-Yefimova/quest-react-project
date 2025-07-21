export async function getUserFavorites() {
  const res = await fetch("http://localhost:3000/favorites", {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch favorites");
  return await res.json();
}

export async function addFavorite(questId: string) {
  const res = await fetch("http://localhost:3000/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ questId }),
  });
  if (!res.ok) throw new Error("Failed to add favorite");
  return await res.json();
}

export async function removeFavorite(questId: string) {
  const res = await fetch(`http://localhost:3000/favorites/${questId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to remove favorite");
}
