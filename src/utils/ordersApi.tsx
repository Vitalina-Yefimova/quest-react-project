export interface CreateOrderData {
  questId: string;
  date: string;
  participants: number;
}

function getAccessToken(): string | null {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="));
  return match ? match.split("=")[1] : null;
}

export async function createOrder(data: CreateOrderData) {
  const token = getAccessToken();
  if (!token) throw new Error("No token found");

  const res = await fetch(`http://localhost:3000/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create order: ${res.status} - ${text}`);
  }

  return await res.json();
}

export async function getOrders() {
  const token = getAccessToken();
  if (!token) throw new Error("No token found");

  const res = await fetch(`http://localhost:3000/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch orders: ${res.status} - ${text}`);
  }

  return await res.json();
}

export async function updateOrder(
  id: number,
  data: { date: string; participants: number }
) {
  const res = await fetch(`http://localhost:3000/orders/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to update order: ${res.status} - ${errorText}`);
  }
  return await res.json();
}

export async function deleteOrder(id: number) {
  const token = getAccessToken();
  if (!token) throw new Error("No token found");

  const res = await fetch(`http://localhost:3000/orders/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to delete order: ${res.status} - ${text}`);
  }
  return await res.json();
}
