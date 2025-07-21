import { NavLink } from "react-router-dom";
import "../../index.css";
import { Quest } from "../../store/useQuestStore";
import PersonIcon from "../icons/PersonIcon";
import PuzzleIcon from "../icons/PuzzleIcon";
import CustomCursorWrapper from "../generics/customCursor/CustomCursorWrapper";
import DividerVector from "../generics/divider/DividerVector";
import FavoritesToggle from "../generics/favorites/FavoritesToggle";
import { useUserStore } from "../../store/userStore";

interface QuestBlockProps {
  quest: Quest;
  onFavoriteChange?: (isFavorite: boolean) => void;
}

const QuestBlock: React.FC<QuestBlockProps> = ({ quest, onFavoriteChange }) => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="relative group">
      <NavLink
        to={`/detailed-quest/${quest.id.toString()}`}
        className="relative group"
      >
        <CustomCursorWrapper>
          <div className="relative w-full">
            <img
              src={
                quest.image?.startsWith("http")
                  ? quest.image
                  : `http://localhost:3000${quest.image ?? ""}`
              }
              alt={quest.title}
              className="w-full object-cover select-none"
            />

            <div className="absolute bottom-0 left-0 w-full p-5 z-10">
              <h3 className="text-white text-2xl font-bold leading-[120%] font-variant-numeric pb-[15px]">
                {quest.title}
              </h3>
              <div className="flex gap-3">
                <div className="flex gap-2">
                  <PersonIcon />
                  <p className="text-[#E5E5E5] text-[13px] leading-[144%] font-medium font-variant-numeric">
                    {typeof quest.players === "object"
                      ? `${quest.players.min} – ${quest.players.max}`
                      : quest.players ?? "?"}
                  </p>
                </div>
                <DividerVector className="bg-white/50 w-[1px] h-[20px]"></DividerVector>
                <div className="flex gap-2">
                  <PuzzleIcon />
                  <p className="text-[#E5E5E5] text-[13px] leading-[144%] font-medium font-variant-numeric">
                    {quest.difficulty}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CustomCursorWrapper>
      </NavLink>

      {user && (
        <div
          className="absolute top-3 right-3 z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <FavoritesToggle
            questId={quest.id.toString()}
            onChange={onFavoriteChange}
          />
        </div>
      )}
    </div>
  );
};

export default QuestBlock;
