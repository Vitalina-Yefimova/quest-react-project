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
        const exists = (favorites as Favorite[]).some(
          (favorite) => favorite.questId === questId.toString()
        );
        setIsFavorite(exists);
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
        className={`transition cursor-none ${className}`}
      >
        {iconOnly ? (
          isFavorite ? (
            <StarIcon />
          ) : (
            <StarOutlineIcon />
          )
        ) : (
          <span
            className={`flex items-center justify-center text-white font-semibold min-w-[200px] h-[50px] rounded-full shadow-lg transition duration-300 cursor-none
  ${
    isFavorite
      ? "bg-red-600 hover:bg-red-700"
      : "bg-[#F28A0F] hover:bg-[#d97706]"
  }`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </span>
        )}
      </button>
    </CustomCursorWrapper>
  );
}
