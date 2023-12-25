import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Footer, Navbar } from "./components";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import store from "./redux/store.js";
import AppRoutes from "./routes.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer position="top-center" />
      <Router>
        <main className="bg-slate-50 dark:bg-gray-900 min-h-screen py-4">
          <Navbar />
          <ScrollToTop />

          <AppRoutes />
          <Footer />
        </main>
      </Router>
    </Provider>
  );
}

export default App;
