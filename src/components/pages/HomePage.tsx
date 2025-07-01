import "../../index.css";
import Header from "../header/Header";
import PageTitle from "../generics/title/PageTitle";
import GenreNavigation from "../content/GenreNavigation";
import QuestBlock from "../content/QuestBlock";
import Footer from "../footer/Footer";
import useQuestStore from "../../store/useQuestStore";
import { useParams } from "react-router";
import { useEffect } from "react";

export default function HomePage(): React.ReactElement {
  const { genre } = useParams<{ genre?: string }>();
  const { getFilteredQuests, setQuests } = useQuestStore();
  const filteredQuests = getFilteredQuests(genre);

  useEffect(() => {
    const fetchQuests = async () => {
      const res = await fetch("http://localhost:3000/quests");
      const data = await res.json();
      setQuests(data);
    };
    fetchQuests();
  }, [setQuests]);

  return (
    <div className="relative">
      <Header className="bg-[#1E1C1C]" />
      <PageTitle
        className="pb-12 pt-[122px] pl-[136px]"
        overline="Quests in Calgary"
        title="Find Your Quest"
      />
      <GenreNavigation />
      <div className="grid grid-cols-3 gap-x-6 gap-y-8 pl-[136px] pr-[150px] pb-20">
        {(filteredQuests ?? []).map((quest) =>
          quest ? <QuestBlock key={quest.id.toString()} quest={quest} /> : null
        )}
      </div>
      <Footer />
    </div>
  );
}
