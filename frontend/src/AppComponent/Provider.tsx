"use client";
import { Provider } from "react-redux";
import { store  } from "./redux";

import { persistor } from "./redux";
import { PersistGate } from "redux-persist/integration/react";
interface Props {
  children: React.ReactNode;
}

const ProviderWrapper: React.FC<Props> = ({ children }) => {
  return   <Provider store={store}><PersistGate loading={null} persistor={persistor}>{children}</PersistGate></Provider>;
};  

export default ProviderWrapper;
