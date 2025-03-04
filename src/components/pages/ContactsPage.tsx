import "../../index.css";
import Header from "../header/Header";
import PageTitle from "../generics/title/PageTitle";
import VectorContactsIcon from "../icons/VectorContactsIcon";
import ContactInfo from "../main/ContactInfo";
import GoogleMap from "../main/GoogleMap";
import Footer from "../footer/Footer";
import contactsBackground from "../../assets/images/contacts-background.png";

export default function Contacts(): React.ReactElement {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-lightgray bg-[445px_-359.026px] bg-[length:80.438%_178.655%] bg-no-repeat filter blur-[45px]"
        style={{ backgroundImage: `url(${contactsBackground})` }}
      ></div>

      <div className="relative z-10">
        {/* z-10 - гарантирует, что контент будет над фоном, а не размоется */}
        <Header />
        <PageTitle
          className="pt-16 pb-[29px] pl-[142px]"
          overline="Quests in Calgary"
          title="Contacts"
          titleClassName="text-6xl not-italic font-extrabold leading-[70.4px]"
        />
        <VectorContactsIcon className="ml-[136px] mr-[150px]" />
        <section className="flex gap-[157px] pr-[150px] pb-[121px]">
          <ContactInfo />
          <GoogleMap />
        </section>
        <Footer />
      </div>
    </section>
  );
}
