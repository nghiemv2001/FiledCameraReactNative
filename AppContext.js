import { useState } from "react";
import React from "react";
const sharedData = {
    URLink : "http://192.168.1.135:3000",
  };
const AppContext = React.createContext();
export default sharedData;