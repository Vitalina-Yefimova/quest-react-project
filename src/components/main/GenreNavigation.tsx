import "../../index.css";
import useQuestStore from "../../store/questsStore";
import { NavLink, useLocation } from "react-router-dom";
import UnderlineOrangeIcon from "../icons/UnderlineOrangeIcon";
import VerticalDividerIcon from "../icons/VerticalDividerIcon";
import AllQuestsIcon from "../icons/AllQuestsIcon";

const GenreNavigation = () => {
  const { genres } = useQuestStore();
  const location = useLocation();

  return (
    <nav className="pl-[137px] pr-[200px] pb-[39px]">
      <ul className="flex gap-10 text-[#E5E5E5] text-sm font-bold leading-[140%] tracking-[-0.28px]">
        <li className="flex">
          <NavLink to="/" className="flex flex-col">
            {({ isActive }: { isActive: boolean }) => {
              const isAllQuestsActive = isActive || location.pathname === "/";
              return (
                <>
                  <div className="flex items-center gap-3">
                    <AllQuestsIcon />
                    <span>All Quests</span>
                  </div>
                  {isAllQuestsActive && (
                    <UnderlineOrangeIcon className="ml-9 mt-1" />
                  )}
                </>
              );
            }}
          </NavLink>
          <VerticalDividerIcon className="ml-10" />
        </li>
        {genres.map((genre, index) => (
          <li className="flex" key={genre.name}>
            <NavLink
              to={`/genre/${genre.name}`}
              className="flex flex-col items-center"
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  <div className="flex items-center gap-3">
                    {genre.icon}
                    {genre.name}
                  </div>
                  {isActive && <UnderlineOrangeIcon />}
                </>
              )}
            </NavLink>
            {index < genres.length - 1 && (
              <VerticalDividerIcon className="ml-10" />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default GenreNavigation;
