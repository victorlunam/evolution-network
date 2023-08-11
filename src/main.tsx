import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./theme/index.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <NextUIProvider theme={theme}>
      <App />
    </NextUIProvider>
  </BrowserRouter>,
);
