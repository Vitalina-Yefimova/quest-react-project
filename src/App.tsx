import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router";
import HomePage from './components/pages/HomePage'
import ContactsPage from './components/pages/ContactsPage'
import NotFoundPage from "./components/pages/NotFoundPage";

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/not-found-page" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}