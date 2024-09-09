import React from "react";
import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import Navbar from "../components/infrastructure/Navbar";
import Footer from "../components/infrastructure/Footer";

const GeneralLayout = () => {
  return (
    <Stack position={"relative"} height={"100vh"}>
      <Navbar />
      <Stack marginX={"5rem"}>
        <Outlet />
      </Stack>
      {/* <Footer /> */}
    </Stack>
  );
};

export default GeneralLayout;
