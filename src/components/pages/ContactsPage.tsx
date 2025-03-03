import "../../index.css";
import Header from "../header/Header";
import PageTitle from "../generics/title/PageTitle";
import VectorContactsIcon from "../icons/VectorContactsIcon";
import ContactInfo from "../main/ContactInfo";
import GoogleMap from "../main/GoogleMap";
import Footer from "../footer/Footer";

export default function Contacts(): React.ReactElement {
  return (
    <>
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
    </>
  );
}
