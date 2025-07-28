import { useEffect, useState } from "react";
import { getOrders, updateOrder, deleteOrder } from "../../../utils/ordersApi";

interface Order {
  id: number;
  questTitle: string;
  date: string;
  participants: number;
  price: number;
  createdAt: string;
}

export default function OrdersSection() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editOrderId, setEditOrderId] = useState<number | null>(null);
  const [editDate, setEditDate] = useState("");
  const [editParticipants, setEditParticipants] = useState(1);
  const [editError, setEditError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleEdit = (order: Order) => {
    setEditOrderId(order.id);
    setEditDate(order.date.split("T")[0]);
    setEditParticipants(order.participants);
    setEditError(null);
  };

  const handleCancelEdit = () => {
    setEditOrderId(null);
    setEditDate("");
    setEditParticipants(1);
    setEditError(null);
  };

  const handleSaveEdit = async (id: number) => {
    try {
      setEditError(null);
      const now = new Date();
      const questDate = new Date(editDate);
      const diffInDays = Math.ceil(
        (questDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffInDays < 7) {
        setEditError(
          "Date cannot be changed less than 7 days before the quest."
        );
        return;
      }

      await updateOrder(id, {
        date: editDate,
        participants: editParticipants,
      });

      setOrders((prev) =>
        prev.map((order) =>
          order.id === id
            ? { ...order, date: editDate, participants: editParticipants }
            : order
        )
      );

      handleCancelEdit();
    } catch (err) {
      setEditError(
        err instanceof Error ? err.message : "Failed to update order."
      );
    }
  };

  const handleDelete = async (id: number, date: string) => {
    setDeleteError(null);
    const now = new Date();
    const questDate = new Date(date);
    const diffInDays = Math.ceil(
      (questDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays < 7) {
      setDeleteError("Cannot cancel less than 7 days before the quest date.");
      return;
    }

    try {
      await deleteOrder(id);
      setOrders((prev) => prev.filter((order) => order.id !== id));
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Failed to cancel order."
      );
    }
  };

  if (loading) return <div className="text-gray-300">Loading orders...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (orders.length === 0)
    return <div className="text-gray-300">You don’t have any orders yet.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-white">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-[#2B2B2B] p-4 rounded-lg shadow-md border border-gray-700"
        >
          {editOrderId === order.id ? (
            <div className="space-y-2">
              <p className="text-lg font-semibold">{order.questTitle}</p>
              <label className="text-sm block">Date</label>
              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                className="bg-gray-800 text-white p-2 rounded w-full"
              />
              <label className="text-sm block">Participants</label>
              <input
                type="number"
                min={1}
                max={8}
                value={editParticipants}
                onChange={(e) =>
                  setEditParticipants(Math.max(1, Number(e.target.value)))
                }
                className="bg-gray-800 text-white p-2 rounded w-full"
              />
              {editError && <p className="text-red-500 text-sm">{editError}</p>}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleSaveEdit(order.id)}
                  className="px-3 py-1 bg-green-500 rounded text-sm"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-3 py-1 bg-gray-500 rounded text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-lg font-semibold">{order.questTitle}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              <p>Participants: {order.participants}</p>
              <p>Price: ${order.price}</p>
              <p className="text-xs text-gray-400">
                Created at: {new Date(order.createdAt).toLocaleString()}
              </p>
              {deleteError && (
                <p className="text-red-500 text-sm mt-1">{deleteError}</p>
              )}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(order)}
                  className="px-3 py-1 bg-orange-500 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(order.id, order.date)}
                  className="px-3 py-1 bg-red-600 rounded text-sm"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
