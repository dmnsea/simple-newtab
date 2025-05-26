import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/pages/App.tsx";
import SettingsPage from '@/pages/Settings.tsx';
import { Provider as ReduxProvider } from "react-redux";
import store from "@/redux/store.ts";
import { HashRouter, Route, Routes } from "react-router";
import BaseLayout from "@/BaseLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <HashRouter>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/">
              <Route index element={<App />}/>
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </ReduxProvider>
  </StrictMode>
);
