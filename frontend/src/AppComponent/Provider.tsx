"use client";
import { Provider } from "react-redux";
import { store } from "./redux";
import { SessionProvider } from "next-auth/react";
import { persistor } from "./redux";
import { PersistGate } from "redux-persist/integration/react";
import { Session } from "next-auth";
interface Props {
  children: React.ReactNode;

}

const ProviderWrapper: React.FC<Props> = ({ children }) => {
  return (
    <SessionProvider >


      <Provider store={store}><PersistGate loading={null} persistor={persistor}>




        {children}



      </PersistGate></Provider> </SessionProvider>
  )
};

export default ProviderWrapper;
