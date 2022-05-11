import { useEffect, useState } from "react";
import styles from "./WalletManager.module.scss";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Grid, Box, Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate, useLocation } from "react-router-dom";

import NFTCard from "../../components/NFTCard";
import { maxHeight } from "@mui/system";
import MenuItem from '@mui/material/MenuItem';
import * as waxjs from "@waxio/waxjs/dist";

import Modal from '@mui/material/Modal';

export interface NFTProps {
  setNFT: (value: any) => void; // for function
  setAssets: (value: any) => void; // for function
  userAccount: any;
  setAccount: (value: any) => void; // for function
  setLogin: (value: any) => void; // for function
  setBalance: (value: any) => void // for function
}


export const WalletManager = ({ setNFT, setAssets, userAccount, setAccount,setLogin, setBalance }: NFTProps) => {

  let totalNFTs: any = [];
  const navigate = useNavigate();

  const collection = "stf.capcom";

  const endpoint = "https://wax.greymass.com";
  let display_nft = false;
  let loggedIn = false;

  const wax = new waxjs.WaxJS({
    rpcEndpoint: endpoint
  });
  const main = async (account:any) => {

    if (loggedIn) {
      let assets = await GetAssets(account);
      if (assets.length != 0) PopulateData(assets);
    } else
      await autoLogin();
  }

  const autoLogin = async () => {
    let isAutoLoginAvailable = await wax.isAutoLoginAvailable();
    if (isAutoLoginAvailable) {
      // wallet_userAccount = wax.userAccount;
      // setwallet_userAccount(wax.userAccount);
      setAccount(wax.userAccount);
      let pubKeys = wax.pubKeys;
      let str = 'Player: ' + wax.userAccount;
      loggedIn = true;
      await main(wax.userAccount);
    }
  }

  const image_style = {
    width: "30px",
    marginRight:"12px",

  }


  const login = async () => {
    try {
      if (!loggedIn) {
        let wallet1_userAccount = await wax.login();
        // setwallet_userAccount(wallet1_userAccount);
        let pubKeys = wax.pubKeys;
        let str = 'Player: ' + wallet1_userAccount
        console.log(str);
        setAccount(wallet1_userAccount);
        loggedIn = true;
        setLogin(false);
        await main(wallet1_userAccount);
        let isWork = await wax.rpc
          .get_currency_balance("eosio.token", wallet1_userAccount, "wax")
          .then((res) => {
            console.log("geeg", res[0]);
            setBalance(res[0]);
            navigate("/");
            return true;
          })
          .catch((err) => {
            console.log("err", err);
            return false;
          });

      }
    } catch (e) {
    }
  }

  const GetAssets = async (account:any) => {
    let results = [];
    console.log("userAccoun t = = ", account);
    var path = "atomicassets/v1/assets?collection_name=" + collection + "&owner=" + account + "&page=1&limit=1000&order=desc&sort=asset_id";
    const response = await fetch("https://" + "wax.api.atomicassets.io/" + path, {
      headers: {
        "Content-Type": "text/plain"
      },
      method: "POST",
    });
    const body = await response.json();
    if (body.data.length != 0)
      results = body.data;
    return results;
  }

  const PopulateData = async (assets: any) => {
    console.log("assets", assets);
    if (!display_nft) {
      totalNFTs = [];
      // var src = "https://ipfs.infura.io/ipfs/";
      var src = "https://ipfs.atomichub.io/ipfs/";
      
      for (const data of assets) {
        let img_src = src + data.data.img;
        totalNFTs.push(img_src);
      }
      setNFT(totalNFTs);
      setAssets(assets);
      display_nft = true;
    }

  }

  const logout = async () => {
    loggedIn = false;
    display_nft = false;
    setAccount("");
  }


  return (
    <main className={styles.main}>

      <section className={styles.section}>
        <div className={styles.leftside}>
          <h1>New To Blockchain?</h1>
          <Box sx={{maxWidth:"80%", margin: "auto"}}>You need to create an account to play  Let's-Fight</Box>

          <div className={styles.wallet_connect}><Button variant="contained" color="error" className={styles.button}>CREATE ACCOUNT</Button></div>
        </div>
        <div className={styles.rightside}>
          <h1>Advanced Players</h1>
          <Box sx={{maxWidth:"80%", margin: "auto"}}>Please connect to your wallet and login your  Let's-Fight account</Box>

          <div className={styles.wallet_connect}>
            <Button onClick = {login} variant="contained" color="warning" className={styles.button}>
              <img src = "/image/walleticon/wax.png" style = {image_style}/>
              CLOUD WALLET
            </Button>
          </div>
          <div className={styles.wallet_connect}>
            <Button variant="contained" color="primary" className={styles.button}>
              <img src = "/image/walleticon/anchor.png" style = {image_style}/>
              ANCHOR
            </Button>
          </div>
          <div className={styles.wallet_connect}>
            <Button variant="contained" color="info" className={styles.button}>
              <img src = "/image/walleticon/scatter.png" style = {image_style}/>
              SCATTER
            </Button>
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <p className={styles.footerAnchor}>
          © Copyright 2022 Let's Fight
        </p>
      </footer>
    </main>
  );
};
