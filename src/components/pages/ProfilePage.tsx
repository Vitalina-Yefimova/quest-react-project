import { useState } from "react";
import { useUserStore } from "../../store/userStore";
import ProfileEditSection from "../content/profile/ProfileEditSection";
import ChangePasswordSection from "../content/profile/ChangePasswordSection";
import OrdersSection from "../content/profile/OrdersSection";
import FavoritesSection from "../content/profile/FavoritesSection";
import { Link } from "react-router-dom";
import ProfileTabs from "../content/profile/ProfileTabs";

export default function ProfilePage() {
  const { user } = useUserStore();
  const [selectedTab, setSelectedTab] = useState<
    "info" | "edit" | "password" | "orders" | "favorites"
  >("info");

  if (!user) return null;

  return (
    <>
      <div className="pt-10 pl-10 bg-black fixed">
        <Link
          to="/"
          className="text-[#F28A0F] underline text-sm hover:text-white transition"
        >
          Return to Home
        </Link>
      </div>

      <div className="flex flex-col items-center pt-30 min-h-screen bg-black text-white px-4">
        <h1 className="text-3xl font-bold pb-10 text-center">My Profile</h1>

        <ProfileTabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />

        <div className="flex flex-col items-center font-sans pl-21">
          {selectedTab === "info" && (
            <div className="space-y-4 text-[#E5E5E5]">
              <p>
                <strong>First Name:</strong> {user.firstName || "—"}
              </p>
              <p>
                <strong>Last Name:</strong> {user.lastName || "—"}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>Email:</strong> {user.email || "—"}
              </p>
            </div>
          )}
          {selectedTab === "edit" && <ProfileEditSection />}
          {selectedTab === "password" && <ChangePasswordSection />}
          {selectedTab === "orders" && <OrdersSection />}
          {selectedTab === "favorites" && <FavoritesSection />}
        </div>
      </div>
    </>
  );
}
