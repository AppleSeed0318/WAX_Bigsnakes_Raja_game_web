import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import * as waxjs from "@waxio/waxjs/dist";


import { Dashboard } from "../pages/Dashboard";
import { Fighters } from "../pages/Fighters";
import { Profile } from "../pages/Profile";
import { Registeration } from "../pages/Registeration";
import { WalletManager } from "../pages/WalletManager";
import { Main } from "../pages/Main";

export const App = () => {
  const [NFTs, setNFT] = useState([]);
  const [Assets, setAssets] = useState([]);
  const [Account, setAccount] = useState("");

  const[stakedList, setStakedList] = useState([]);

  const [loginFlag, setLogin] = useState(true);
  const [balance, setBalance] = useState("");
  const [nickname, setNickname] = useState("");

  const endpoint_uri = "https://wax.greymass.com";
  const wax = new waxjs.WaxJS({
    rpcEndpoint: endpoint_uri
  });

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard wax = {wax} setAssets = {setAssets} setAccount = {setAccount}/>} />
            <Route path="/main" element={
              <Main 
                wax = {wax} 
                Assets = {Assets} 
                Account = {Account} 
                stakedList = {stakedList} 
                setStakedList = {setStakedList}
              />
            }/>
          </Routes>
      </BrowserRouter>
    </>
  );
};
