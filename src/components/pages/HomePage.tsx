import "../../index.css";
import Header from "../header/Header";
import PageTitle from "../generics/title/PageTitle";
import GenreNavigation from "../main/GenreNavigation";
import Footer from "../footer/Footer";

export default function HomePage(): React.ReactElement {
  return (
    <div className="relative">
      <Header />
      <PageTitle
        className="py-12 pl-[136px]"
        overline="Quests in Calgary"
        title="Find Your Quest"
        titleClassName="text-6xl not-italic font-extrabold leading-[70.4px]"
      />
      <GenreNavigation />
      <Footer />
    </div>
  );
}
