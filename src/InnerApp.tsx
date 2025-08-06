import { Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import ContactsPage from "./components/pages/ContactsPage";
import QuestPage from "./components/pages/QuestPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import { useEffect } from "react";
import { useQuestStore } from "./store/useQuestStore";
import VerifyPage from "./components/pages/VerifyPage";
import CheckEmail from "./components/pages/CheckEmail";
import ProfilePage from "./components/pages/ProfilePage";
import { handleTokenLogin } from "./utils/handleTokenLogin";
import ResetPasswordPopup from "./components/content/popups/reset-password/ResetPasswordPopup";
import VerifyNewEmailPage from "./components/pages/VerifyNewEmailPage";

export default function InnerApp() {
  const setQuests = useQuestStore((state) => state.setQuests);
  const quests = useQuestStore((state) => state.quests);

  useEffect(() => {
    if (quests.length === 0) {
      fetch("http://localhost:3000/quests")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch quests: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => setQuests(data))
        .catch(console.error);
    }

    handleTokenLogin().catch(() => {});
  }, [quests.length, setQuests]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/detailed-quest/:id" element={<QuestPage />} />
        <Route path="/genre/:genre" element={<HomePage />} />
        <Route path="/for-begginners" element={<NotFoundPage />} />
        <Route path="/testimonials" element={<NotFoundPage />} />
        <Route path="/special-offers" element={<NotFoundPage />} />
        <Route path="/privacy-policy" element={<NotFoundPage />} />
        <Route path="/user-agreement" element={<NotFoundPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reset-password" element={<ResetPasswordPopup />} />
        <Route path="/verify-new-email" element={<VerifyNewEmailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
