import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import PageResources from "../resources/PageResources";
import Paths from "../statics/Paths";

export default function NotFound() {
  let location = useLocation();

  return (
    <div>
      <h3>
        {PageResources.notFoundPage.pageTitle}
        <code>
          {import.meta.env.VITE_UI_URL}
          {location.pathname}
        </code>
        {PageResources.notFoundPage.pageDescription}
      </h3>
      <a href={Paths.landing}>
        <Typography color={"black"}>{PageResources.notFoundPage.backLinkText}</Typography>
      </a>
    </div>
  );
}
