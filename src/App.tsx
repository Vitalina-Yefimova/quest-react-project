import { BrowserRouter as Router } from "react-router-dom";
import InnerApp from "./InnerApp";

export default function App() {
  return (
    <Router>
      <InnerApp />
    </Router>
  );
}
