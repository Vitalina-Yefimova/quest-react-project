import { useEffect, useState } from "react";
import { getUserFavorites } from "../../../utils/favoritesApi";
import { useQuestStore } from "../../../store/useQuestStore";
import QuestBlock from "../../content/QuestBlock";

type Favorite = {
  questId: string;
};

export default function FavoritesSection() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const allQuests = useQuestStore((state) => state.quests);

  useEffect(() => {
    getUserFavorites()
      .then((favorites) => {
        const ids: string[] = favorites.map(
          (favorite: Favorite) => favorite.questId
        );
        setFavoriteIds(ids);
      })
      .catch((err) => {
        console.error("Failed to load favorites", err);
      });
  }, []);

  const favoriteQuests = allQuests.filter((q) => favoriteIds.includes(q.id));

  if (favoriteQuests.length === 0) {
    return (
      <div className="text-gray-300">
        You don’t have any favourite quests yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favoriteQuests.map((quest) => (
        <QuestBlock
          key={quest.id}
          quest={quest}
          onFavoriteChange={(newStatus) => {
            if (!newStatus) {
              setFavoriteIds((prev) => prev.filter((id) => id !== quest.id));
            }
          }}
        />
      ))}
    </div>
  );
}
