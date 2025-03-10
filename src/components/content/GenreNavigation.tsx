import "../../index.css";
import { useQuestStore, Genre } from "../../store/useQuestStore";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import AllQuestsIcon from "../icons/AllQuestsIcon";
import HorrorIcon from "../icons/HorrorIcon";
import MysteryIcon from "../icons/MysteryIcon";
import DetectiveIcon from "../icons/DetectiveIcon";
import AdventureIcon from "../icons/AdventureIcon";
import SciFiIcon from "../icons/SciFiIcon";
import { questsData } from "../../store/questsData";
import CustomCursorWrapper from "../generics/customCursor/CustomCursorWrapper";

const genres: Genre[] = [
  { genreName: "Horror", icon: <HorrorIcon /> },
  { genreName: "Mystery", icon: <MysteryIcon /> },
  { genreName: "Detective", icon: <DetectiveIcon /> },
  { genreName: "Adventure", icon: <AdventureIcon /> },
  { genreName: "Sci-fi", icon: <SciFiIcon /> },
];

const GenreNavigation = () => {
  const { setQuests, setGenres, getAvailableGenres } = useQuestStore();
  const { genre } = useParams(); // Получает жанр из URL (если он есть) для фильтрации квестов по жанру (если жанр не выбран - показывает все квесты) и для выделения активного жанра в навигации по жанрам (если жанр выбран - выделяет его в навигации по жанрам)
  const [availableGenres, setAvailableGenres] = useState<Genre[]>([]); // Состояние доступных жанров для навигации по жанрам (показывает только те жанры, у которых есть квесты)

  useEffect(() => {
    setGenres(genres);
    setQuests(questsData);
  }, []); // При первом рендере устанавливает жанры и квесты в состояние store

  useEffect(() => {
    setAvailableGenres(getAvailableGenres());
  }, [getAvailableGenres]); // При изменении доступных жанров устанавливает их в состояние компонента для отображения в навигации по жанрам (показывает только те жанры, у которых есть квесты)

  return (
    <nav className="pl-[137px] pb-[39px] relative">
      <ul className="flex gap-10 text-[#E5E5E5] text-sm font-bold leading-[140%] tracking-[-0.28px]">
        <li className="flex">
          <CustomCursorWrapper>
            <NavLink to="/" className="flex flex-col cursor-none">
              {({ isActive }: { isActive: boolean }) => {
                const isAllQuestsActive = isActive || !genre;

                return (
                  <>
                    <div className="flex items-center gap-3">
                      <AllQuestsIcon />
                      <span>All Quests</span>
                    </div>
                    {isAllQuestsActive && (
                      <div className="ml-[37px] w-[67px] h-[1.5px] bg-[#F2890F]  transition-all duration-200"></div>
                    )}
                  </>
                );
              }}
            </NavLink>
          </CustomCursorWrapper>
          <div className="bg-white/32 w-[1.5px] h-[40px] ml-10"></div>
        </li>
        {availableGenres.map(({ icon, genreName }, index) => (
          <li className="flex" key={genreName}>
            <CustomCursorWrapper>
              <NavLink
                to={`/genre/${genreName}`}
                className="flex flex-col items-center cursor-none"
              >
                {({ isActive }: { isActive: boolean }) => (
                  <>
                    <div className="flex items-center gap-3 pr-10">
                      {icon}
                      {genreName}
                    </div>
                    {isActive && (
                      <div className="ml-[17px] w-1/2 h-[1.5px] bg-[#F2890F]"></div>
                    )}
                  </>
                )}
              </NavLink>
            </CustomCursorWrapper>
            {index < availableGenres.length - 1 && (
              <div className="bg-white/32 w-[1.5px] h-[40px]"></div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default GenreNavigation;
