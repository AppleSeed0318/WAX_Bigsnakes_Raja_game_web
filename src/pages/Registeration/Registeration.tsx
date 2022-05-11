import { useEffect, useState } from "react";
import styles from "./Registeration.module.scss";
import { Button, TextField, FormLabel, Checkbox, FormControlLabel, FormGroup } from '@mui/material'; 

export const Registeration = () => {
  
  const [currentCheck, setCurrentCheck] = useState(0);

  const onClickEvent = (e:any, id:number) => {
    
    let _currentCheck = currentCheck ^ id;
    console.log("hahaha", id, _currentCheck);
    setCurrentCheck(_currentCheck);

  }

  const onSubmit = (e:any) => {
    if(currentCheck != 3)
      alert( "check terms and conditions" );
  }

  return (
    <main className={styles.main}>

      <section className={styles.section}>
        <div className={styles.profile_contents}>
          <div className={styles.profile_header}>
            <h2>Complete Your Profile</h2>
          </div>
          <br/>
          <p>Your email address is only used for receiving important updates. Your Nickname will be seen by other players.</p>
          <br/>
          <p>Your Wallet</p>
          <h2 style={{color:"#ed6c02"}}>tmbju.wam</h2>
          <p style={{marginBottom:"8px"}}>Email</p>
          <TextField
            id="outlined-number"
            label="Email"
            type="text"
            sx={{width:"100%"}}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <p style={{marginBottom:"8px"}}>Nickname</p>
          <TextField
            id="outlined-number"
            label="Nickname"
            type="text"
            sx={{width:"100%"}}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <FormGroup sx={{marginTop:2}}>
            <FormControlLabel control={<Checkbox onClick = {(e)=>onClickEvent(e, 1)} />} label="I confirm that I am 18 years or over and I afree to te terms and conditions" />
            <FormControlLabel control={<Checkbox onClick = {(e)=>onClickEvent(e, 2)} />} label=" I agree to receive new sletters and promotional emails" />
          </FormGroup>
          
          <br/>

          <div className={styles.profile_footer}>
            <Button variant="outlined" color="info">Cancel</Button>
            <Button variant="contained" color="error" sx={{marginLeft:"20px"}} onClick={onSubmit}>Submit</Button>
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
