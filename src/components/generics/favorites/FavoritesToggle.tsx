import { useEffect, useState } from "react";
import { useUserStore } from "../../../store/userStore";
import {
  addFavorite,
  removeFavorite,
  getUserFavorites,
} from "../../../utils/favoritesApi";
import StarIcon from "../../icons/StarIcon";
import StarOutlineIcon from "../../icons/StarOutlineIcon";
import CustomCursorWrapper from "../customCursor/CustomCursorWrapper";

interface FavoritesToggleProps {
  questId: string | number;
  className?: string;
  iconOnly?: boolean;
  onChange?: (isFavorite: boolean) => void;
}

export default function FavoritesToggle({
  questId,
  className = "",
  iconOnly = true,
  onChange,
}: FavoritesToggleProps) {
  const { user } = useUserStore();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user && questId) {
      getUserFavorites().then((favorites) => {
        interface Favorite {
          questId: string;
        }

        const favoritesTyped = favorites as Favorite[];
        const exists = favoritesTyped.find(
          (favorite: Favorite) => favorite.questId === questId.toString()
        );
        setIsFavorite(!!exists);
      });
    }
  }, [user, questId]);

  const toggleFavorite = async () => {
    if (!user) return;
    try {
      if (isFavorite) {
        await removeFavorite(questId.toString());
        setIsFavorite(false);
        onChange?.(false);
      } else {
        await addFavorite(questId.toString());
        setIsFavorite(true);
        onChange?.(true);
      }
    } catch (err) {
      console.error("Favorite error:", err);
    }
  };

  if (!user) return null;

  return (
    <CustomCursorWrapper>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite();
        }}
        className={`transition p-1 cursor-none ${className}`}
      >
        {iconOnly ? (
          isFavorite ? (
            <StarIcon />
          ) : (
            <StarOutlineIcon />
          )
        ) : (
          <span
            className={`text-sm font-semibold px-5 py-3 rounded-full cursor-none ${
              isFavorite ? "bg-red-600" : "bg-[#F28A0F]"
            }`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </span>
        )}
      </button>
    </CustomCursorWrapper>
  );
}
