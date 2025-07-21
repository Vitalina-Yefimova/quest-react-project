interface ProfileTabsProps {
  selectedTab: string;
  setSelectedTab: (
    tab: "info" | "edit" | "password" | "orders" | "favorites"
  ) => void;
}

export default function ProfileTabs({
  selectedTab,
  setSelectedTab,
}: ProfileTabsProps) {
  const tabs = [
    { key: "info", label: "Info" },
    { key: "edit", label: "Edit Info" },
    { key: "password", label: "Change Password" },
    { key: "orders", label: "My Orders" },
    { key: "favorites", label: "My Favorites" },
  ] as const;

  return (
    <div className="flex space-x-4 pb-10">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setSelectedTab(key)}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            selectedTab === key
              ? "bg-orange-500 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
