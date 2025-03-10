import "../../index.css";
import { useParams } from "react-router-dom";
import { questsData } from "../../store/questsData";
import { useState } from "react";
import BookingPopup from "../../components/pages/BookingPopup";
import Button from "../generics/button/Button";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export default function GuestPage() {
  const { id } = useParams();
  const quest = questsData.find((q) => q.id === id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className="bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${quest?.imageBg})` }}
    >
      <Header />
      <div className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-6 text-white">
        <div className="bg-black bg-opacity-70 p-6 rounded-lg max-w-3xl text-center">
          <h1 className="text-4xl font-bold mb-4">{quest?.title}</h1>
          <p className="text-lg mb-4">{quest?.description}</p>
          <div className="flex justify-center gap-4 text-gray-300 text-sm">
            <span>{quest?.duration}</span>
            <span>{quest?.players}</span>
            <span>{quest?.difficulty}</span>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>Book Now</Button>
        </div>
        {isModalOpen && <BookingPopup onClose={() => setIsModalOpen(false)} />}
      </div>
      <Footer />
    </div>
  );
}
