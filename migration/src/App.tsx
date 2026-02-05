import { Route, Routes } from "react-router-dom";

import ResourceArticle from "./pages/resourceArticle";

import IndexPage from "@/pages/index";
import Services from "@/pages/services";
import ContactUs from "@/pages/contactUs";
import ResourcesPage from "@/pages/resources";
import BlogPage from "@/pages/resources";
import AboutPage from "@/pages/about";

function App() {
  return (
    <>
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<ResourcesPage />} path="/resources" />
        <Route element={<ResourceArticle />} path="/resources/:slug" />
        <Route element={<ContactUs />} path="/contacts" />
        <Route element={<Services />} path="/services" />
        <Route element={<BlogPage />} path="/blog" />
        <Route element={<AboutPage />} path="/about" />
      </Routes>
    </>
  );
}

export default App;
