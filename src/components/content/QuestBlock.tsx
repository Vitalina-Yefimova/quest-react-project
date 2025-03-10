import { NavLink } from "react-router-dom";
import "../../index.css";
import { Quest } from "../../store/useQuestStore";
import PersonIcon from "../icons/PersonIcon";
import PuzzleIcon from "../icons/PuzzleIcon";
import CustomCursorWrapper from "../generics/customCursor/CustomCursorWrapper";

interface QuestBlockProps {
  quest: Quest;
}

const QuestBlock: React.FC<QuestBlockProps> = ({ quest }) => {
  return (
    <NavLink to={`/detailed-quest/${quest.id}`} className="relative group">
      <CustomCursorWrapper>
        <div className="relative w-full">
          <img
            src={quest.image}
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
                  {quest.players}
                </p>
              </div>
              <div className="bg-[#E5E5E5] w-[1px] h-[20px]"></div>
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
  );
};

export default QuestBlock;
