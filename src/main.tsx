import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./routes";
import "./index.css";
import Layout from "./components/Layout";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout>
      <Routes />
    </Layout>
  </React.StrictMode>
);