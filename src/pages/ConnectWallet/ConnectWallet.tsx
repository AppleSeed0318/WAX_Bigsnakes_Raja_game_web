import { useEffect, useState } from "react";
import styles from "./ConnectWallet.module.scss";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Grid, Box, Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import NFTCard from "../../components/NFTCard";
import { maxHeight } from "@mui/system";
import MenuItem from '@mui/material/MenuItem';
import * as waxjs from "@waxio/waxjs/dist";

import Modal from '@mui/material/Modal';

export const ConnectWallet = () => {

  return (
    <main className={styles.main}>

      <div className="wallet-buttons"><div className="WalletLoginButton" data-testid="Cloud Wallet"><div className="button-wrapper"><button type="button" className="btn btn-primary btn-block btn-lg" style={{ backgroundColor: "rgb(255, 119, 74)" }}><span><img src="/images/logos/wcw.png" alt="Cloud Wallet" className="wcw" /> Cloud Wallet</span></button><a href="https://wallet.wax.io" target="_blank" rel="noreferrer noopener" className="website" style={{ color: "rgb(255, 119, 74)" }}></a></div></div><div className="WalletLoginButton" data-testid="Anchor"><div className="button-wrapper"><button type="button" className="btn btn-primary btn-block btn-lg" style={{ backgroundColor: "rgb(54, 80, 162)" }}><span><img src="/images/logos/anchor.png" alt="Anchor" className="anchor-wallet" /> Anchor</span></button><a href="https://greymass.com/anchor/" target="_blank" rel="noreferrer noopener" className="website" style={{ color: "rgb(54, 80, 162)" }}></a></div></div><div className="WalletLoginButton" data-testid="Scatter"><div className="button-wrapper"><button type="button" className="disabled btn btn-primary btn-block btn-lg" style={{ backgroundColor: "rgb(98, 174, 202)", cursor: "default" }}><span><img src="/images/logos/scatter.png" alt="Scatter" className="scatter-wallet" />Scatter</span></button><a href="https://github.com/GetScatter/ScatterDesktop/releases/" target="_blank" rel="noreferrer noopener" className="website" style={{ color: "rgb(98, 174, 202)" }}></a></div></div></div>
      <footer className={styles.footer}>
        <p className={styles.footerAnchor}>
          © Copyright 2022 Let's Fight
        </p>
      </footer>
    </main >
  );
};
