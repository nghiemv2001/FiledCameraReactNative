import { useState } from "react";
import React from "react";
const sharedData = {
    URLink : "http://192.168.135.1:3000",
  };
const AppContext = React.createContext();
export default sharedData;