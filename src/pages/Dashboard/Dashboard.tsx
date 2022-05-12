import { useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";
import { Grid, Box, Button } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import * as waxjs from "@waxio/waxjs/dist";

import AnchorLink from 'anchor-link'
import AnchorLinkBrowserTransport from 'anchor-link-browser-transport'

import Modal from '@mui/material/Modal';
import { useNavigate, useLocation } from "react-router-dom";
export interface NFTProps {
  wax: any,
  setWalletSession: any,
  setAccount: any,
  // balance: any,
  setAssets: any,
  // loginFlag: any,
}
export const Dashboard = ({ wax, setWalletSession, setAccount, setAssets }: NFTProps) => {

  const [endpoint, setEndPoint] = useState("WCW");
  // const [userAccount, setUserAccount] = useState("");
  const [userBalance, setUserBalance] = useState("");
  const navigate = useNavigate();

  let  wallet_session:any;
  let loggedIn = false;
  let wallet1_userAccount: any;
  // [loggedIn, setLoginedIn] = useState(false);
  const [wallet_userAccount, setwallet_userAccount] = useState("");
  let display_nft = false;
  const endpoint_uri = "https://wax.greymass.com";
  const collection = "bigsnakesp2e";
  let totalNFTs: any = [];
  const contract_owner_name = 'bigsnakefund';
  const main = async () => {

    if (loggedIn) {
      let assets = await GetAssets();
      if (assets.length != 0) PopulateData(assets);
      navigate("/main");
    } else
      await autoLogin();
  }

  const autoLogin = async () => {
    let isAutoLoginAvailable = await wax.isAutoLoginAvailable();
    if (isAutoLoginAvailable) {
      // wallet_userAccount = wax.userAccount;
      setwallet_userAccount(wax.userAccount);
      let pubKeys = wax.pubKeys;
      let str = 'Player: ' + wallet_userAccount
      loggedIn = true;
      await main();
    }
  }


  const login = async () => {
    try {
      if (!loggedIn) {
        console.log("str");
        let isflag = true;
        // wallet1_userAccount = await wax.login();
        wallet1_userAccount = await wallet_login();

        console.log(wallet1_userAccount);
        setwallet_userAccount(wallet1_userAccount);
        let pubKeys = wax.pubKeys;
        let str = 'Player: ' + wallet1_userAccount
        console.log(str);
        // setAccount(wallet1_userAccount);
        loggedIn = true;
        setAccount(wallet1_userAccount);
        // setLogin(false);
        await main();
        let isWork = await wax.rpc
          .get_currency_balance("eosio.token", wallet1_userAccount, "wax")
          .then((res: any) => {
            console.log("geeg", res[0]);
            // setBalance(res[0]);
            return true;
          })
          .catch((err: any) => {
            console.log("err", err);
            return false;
          });
        if (wallet1_userAccount != null || wallet1_userAccount != undefined) {
          const result = await wax.rpc.get_table_rows({
            json: true,
            code: contract_owner_name,
            scope: contract_owner_name,
            table: "peoplelist",
            reverse: false,
            show_payer: false
          });
          console.log("result", result);
          for (let i = 0; i < result.rows.length; i++) {
            if (result.rows[i].user == wallet1_userAccount) {
              isflag = false;
            }
          }
        }
        if (isflag) {
          console.log("send message add person", wallet_session);
          const result = await wallet_session.transact({
            actions: [{
              account: contract_owner_name,
              name: 'addperson',
              authorization: [{
                actor: wallet1_userAccount,
                permission: 'active',
              }],
              data: {
                user: wallet1_userAccount,
              },
            }]
          }, {
            blocksBehind: 3,
            expireSeconds: 60
          });
        }

      }
    } catch (e) {
      console.log("-----------------------");
      console.log(e);
    }
  }

  const GetAssets = async () => {
    let results = [];
    var path = "atomicassets/v1/assets?collection_name=" + collection + "&owner=" + wallet1_userAccount + "&page=1&limit=1000&order=desc&sort=asset_id";
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
      var src = "https://ipfs.atomichub.io/ipfs/";
      for (const data of assets) {
        let img_src = src + data.data.img;
        totalNFTs.push(img_src);
      }
      // setNFT(totalNFTs);
      setAssets(assets);
      display_nft = true;
    }

  }

  const logout = async () => {
    loggedIn = false;
    display_nft = false;
    setwallet_userAccount("");
  }
  const image_style = {
    width: "30px",
    marginRight: "12px",
  }

  const [walletType, setWalletType] = useState("WCW");
  const handleChange = (e: any) => {
    setEndPoint(e.target.value);
    console.log(e.target.value);
  }

  ///--------------------- for anchor ----------------------------

  const dapp = "collection";

  async function wallet_login() {
    var wallet_userAccount;
    const transport = new AnchorLinkBrowserTransport();
    const anchorLink = new AnchorLink({
      transport,
      chains: [{
        chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
        nodeUrl: 'https://wax.greymass.com',
      }],
    }); 
    if (endpoint == "Anchor") {
      var sessionList = await anchorLink.listSessions(dapp);
      if (sessionList && sessionList.length > 0) {
        wallet_session = await anchorLink.restoreSession(dapp);
      } else {
        wallet_session = (await anchorLink.login(dapp)).session;
      }
      wallet_userAccount = String(wallet_session.auth).split("@")[0];
      let auth = String(wallet_session.auth).split("@")[1];
      let anchorAuth = auth;
    } else {
      wallet_userAccount = await wax.login();
      wallet_session = wax.api;
      let anchorAuth = "active";
    }
    setWalletSession(wallet_session);
    return wallet_userAccount;
  }

  return (
    <main className={styles.main}>
      <div className={styles.loginpanel}>
        <h2>SELECT RPC END POINT</h2>
        <div className={styles.endpoint}>
          <Select
            sx={{ m: 1, minWidth: 120, margin: 0, width: "240px", backgroundColor: "#63cbe5" }}
            style={{ height: "40px" }}
            onChange={handleChange}
            value={endpoint}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value={"WCW"}><img src="/image/walleticon/wax.png" style={image_style} /><span>WCW</span></MenuItem>
            <MenuItem value={"Anchor"}><img src="/image/walleticon/anchor.png" style={image_style} /><span>Anchor</span></MenuItem>
          </Select>
        </div>
        <Button className={styles.btn_login} onClick={login}></Button>
      </div>
    </main>
  );
};
