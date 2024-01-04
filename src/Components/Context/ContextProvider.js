import React, { useState } from "react";

import Context from "./Context";
import { createTheme } from "@mui/material";

const ContextProvider = (props) => {


  const [state, setState] = useState({
    isLoggedIn: false,
  });

  const value = {
    ...state,
    setIsLoggedIn: (isLoggedIn) => setState({ ...state, isLoggedIn }),
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default ContextProvider;
