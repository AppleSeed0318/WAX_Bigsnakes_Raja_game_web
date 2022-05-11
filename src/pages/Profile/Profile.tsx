import { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import { Button, TextField, FormLabel } from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";

export interface AccountProp {
  userAccount: any,
  setLogin: (value: any) => void; // for function
  setAccount: (value: any) => void; // for function
  setAssets: (value: any) => void; // for function
  setBalance: (value: any) => void; // for function
  nickname: any;
  setNickname: (value: any) => void; // for function
}

export const Profile = ({userAccount, setLogin, setAccount, setAssets, setBalance, nickname, setNickname}:AccountProp) => {
  const navigate = useNavigate();

  const [nick, setNick] = useState(nickname);

  const onChangeEvent = (e:any) => {
    setNick(e.target.value);
  }

  const logout = () => {
    setLogin(true);
    setAccount("");
    setAssets([]);
    setBalance("");
    setNickname("");
    navigate("/");
  }

  const onSave = () => {

    setNickname(nick);
  }

  return (
    <main className={styles.main}>

      <section className={styles.section}>
        <div className={styles.profile_header}>
          <h2>Profile</h2>
          <Button variant="contained" color="error" onClick={logout}>DISCONNECT</Button>
        </div>

        <div className={styles.profile_contents}>
          <div className={styles.profile_avatar}>
            <img src = "/image/profile.svg"/>
          </div>
          <div className={styles.profile_text}>
            <div>
              <p>Wallet Address</p>
              <TextField
                id="outlined-number"
                label="Wallet Address"
                type="text"
                value = {userAccount}
                sx={{width:"100%", color:"red"}}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div style={{display: "flex"}}>
              <div className={styles.profile_email}>
                <p>Email</p>
                <TextField
                  id="outlined-number"
                  label="Email"
                  type="text"
                  sx={{width:"100%"}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className={styles.profile_nickname}>
                <p>NickName</p>
                <TextField
                  id="outlined-number"
                  label="NickName"
                  type="text"
                  value = {nick}
                  onChange={onChangeEvent}
                  sx={{width:"100%"}}
                  InputLabelProps={{
                    shrink: true,
                  }} 
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.profile_footer}>
          <Button variant="contained" color="warning">RESEND VERIFICATION EMAIL</Button>
          <Button variant="contained" color="error" sx={{marginLeft:"20px"}} onClick={onSave}>SAVE</Button>
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
