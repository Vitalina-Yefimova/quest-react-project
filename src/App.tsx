import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router";
import HomePage from "./components/pages/HomePage";
import ContactsPage from "./components/pages/ContactsPage";
import QuestPage from "./components/pages/QuestPage";
import NotFoundPage from "./components/pages/NotFoundPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/detailed-quest/:id" element={<QuestPage />} />
        <Route path="/for-begginners" element={<NotFoundPage />} />
        <Route path="/testimonials" element={<NotFoundPage />} />
        <Route path="/special-offers" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
