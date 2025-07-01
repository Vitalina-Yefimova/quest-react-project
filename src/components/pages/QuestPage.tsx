import "../../index.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import BookingPopup from "../../components/pages/BookingPopup";
import Button from "../generics/button/Button";
import PageTitle from "../generics/title/PageTitle";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ClockIcon from "../icons/ClockIcon";
import PersonIcon from "../icons/PersonIcon";
import PuzzleIcon from "../icons/PuzzleIcon";
import DividerVector from "../generics/divider/DividerVector";
import { useQuestStore } from "../../store/useQuestStore";

export default function QuestPage() {
  const { id } = useParams();
  const quest = useQuestStore((state) => state.getQuestById(id || ""));
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!quest) {
    return <div className="text-white p-10">Quest not found</div>;
  }

  return (
    <div
      className="relative bg-no-repeat bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: `url(${quest?.imageBg ?? ""})`,
      }}
    >
      <Header />
      <div className="min-h-screen flex flex-col pt-[151px] pl-[600px] pr-[214px]">
        <PageTitle
          className="pb-8"
          overline={
            quest?.genres?.map((genre) => genre.genreName).join(", ") || ""
          }
          title={quest?.title || ""}
        />
        <div className="flex pl-[30px] gap-4 pb-5">
          <div className="flex gap-2">
            <ClockIcon />
            <p className="text-[#E5E5E5] text-sm not-italic font-normal leading-[144%] font-variant-numeric">
              {quest?.duration}
            </p>
          </div>
          <DividerVector className="bg-white/36 w-[1px] h-[20px]"></DividerVector>
          <div className="flex gap-2">
            <PersonIcon />
            <p className="text-[#E5E5E5] text-sm not-italic font-normal leading-[144%] font-variant-numeric">
              {typeof quest.players === "object"
                ? `${quest.players.min} – ${quest.players.max}`
                : quest.players ?? "?"}
            </p>
          </div>
          <DividerVector className="bg-white/36 w-[1px] h-[20px]"></DividerVector>
          <div className="flex gap-2">
            <PuzzleIcon />
            <p className="text-[#E5E5E5] text-sm not-italic font-normal leading-[144%] font-variant-numeric">
              {quest?.difficulty}
            </p>
          </div>
        </div>
        <p className="text-[#E5E5E5] text-[15px] not-italic font-medium leading-[150%] font-variant-numeric pl-[30px] pb-10">
          {quest?.description}
        </p>
        <Button
          className="flex items-center justify-center w-[250px] h-[65px] bg-[#F28A0F] text-white text-[17px] font-extrabold not-italic leading-normal tracking-[0.51px] cursor-none rounded-full ml-[30px]"
          onClick={() => setIsModalOpen(true)}
        >
          Book Now
        </Button>
        <Footer />
      </div>
      {isModalOpen && <BookingPopup onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
