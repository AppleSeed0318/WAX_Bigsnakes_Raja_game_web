import React from "react";
import { useEffect, useState } from "react";

import "./card.css";
import Button from '@mui/material/Button';
import { FormLabel, Box, Grid, backdropClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import * as waxjs from "@waxio/waxjs/dist";
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

// export interface CardProps {
//   menuCollapse: boolean,
//   func: (value: boolean) => void;
// }


export interface URIProp {
  uri: any,
  name: string,
  account: string,
  assetID: string,
  backed_tokens: any,
}

const NFTCard = ({ uri, name, account, assetID, backed_tokens }: URIProp) => {
  console.log("back", backed_tokens);
  const [backAmount, setBackamount] = useState("");
  const [hide, setHide] = useState(false);
  let result: any;
  const btnStyle = {
    width: "100%",
    minWidth:"2px",
    color: "white",
    height: "100%",
    fontWeight: "bold",
    // backgroundColor: "#ea923e",
    borderColor: "#d3b69a",
    borderRadius: "15px",
    fontSize: "10px"
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const box_style = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    margin: "auto",
    height: "100%",
    maxWidth: "200px",
    width: "70%",
    p: 2,
    padding: "10px 5px 10px 5px",
    bgcolor: '#1a1f3c',
    borderRadius: 4,
    border: "2px solid",
    backgroundImage: "radial-gradient(circle, #5c0067 0%, #06313a 100%)",
  }

  const display_none = {
    display: "none",
  }


  //------------ for model start------------

  const modal_style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#1a203c',
    color: 'white',
    border: '4px solid #000',
    boxShadow: 24,
    borderColor: '#ea923e',
    textAlign: "center",
    borderRadius: "16px",
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  //------------ for model end------------

  const endpoint = "https://wax.greymass.com";
  let backed_token: any = backed_tokens;

  let tmp = 0;
  if (backed_token.length != 0) {
    tmp = parseInt(backed_tokens[0].amount) / 100000000;
    tmp = Math.floor(tmp*100)/100;
  }
  const [amount, setAmount] = useState(tmp);

  let amountFlag = false;

  
  const wax = new waxjs.WaxJS({
    rpcEndpoint: endpoint
  });

  const burn = async () => {
    
    await wax.login();

    if (wax == undefined && wax == null) {

    }
    if (wax != undefined && wax != null) {
      result = await wax.api.transact({
        actions: [{
          account: 'atomicassets',
          name: 'burnasset',
          authorization: [{
            actor: account,
            permission: 'active',
          }],
          data: {
            asset_owner: account,
            asset_id: assetID,

          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      });
    }
    if(result != undefined && result != null) {
      setHide(true);
    }

  }
  const backToken = async () => {
    if(backAmount.length == 0) {
      alert("please set stake amount");
      return ;
    }
    let amountResult = backAmount + "";
    console.log("amountResult", amountResult.length);

    if (amountResult.length < 15) {
      if (amountResult.includes(".")) {
        for (let i = 0; i < 16 - amountResult.length; i++) {
          amountResult += "0";
        }
      }
      else {
        amountResult += ".";
        for (let i = 0; i < 8; i++) {
          amountResult += "0";
        }
      }

    }
    amountResult += " WAX";
    console.log("amountResult", amountResult);
    await wax.login();

    if (wax == undefined && wax == null) {
    }
    if (!wax.api) {
      console.log("plz login");
    }
    // try {
    result = await wax.api.transact({
      actions: [{
        account: 'atomicassets',
        name: 'announcedepo',
        authorization: [{
          actor: wax.userAccount,
          permission: 'active',
        }],
        data: {
          owner: wax.userAccount,
          symbol_to_announce: '8,WAX',
        },
      },
      {
        account: 'eosio.token',
        name: 'transfer',
        authorization: [{
          actor: wax.userAccount,
          permission: 'active',
        }],
        data: {
          from: wax.userAccount,
          to: 'atomicassets',
          quantity: amountResult,
          memo: 'deposit',
        },
      },
      {
        account: 'atomicassets',
        name: 'backasset',
        authorization: [{
          actor: wax.userAccount,
          permission: 'active',
        }],
        data: {
          payer: wax.userAccount,
          asset_owner: wax.userAccount,
          asset_id: assetID,
          token_to_back: amountResult,
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30
    });
    console.log("result", result);
    if(result != undefined && result != null) {
      let _amount = 1.0*amount + (1.0 * parseInt(backAmount));
      _amount = Math.floor(_amount*100)/100;
      setAmount(_amount);
      handleClose();
    }
  }

  const getInputValue = (event: any) => {
    let _value = event.target.value;

    console.log("value = ", _value, Math.floor(_value));

    if(event.target.value > 0 && Math.floor(_value) == _value || event.target.value.length == 0) {
      console.log("okay");
      setBackamount(event.target.value);
    }
    
  };
  return (
    <Grid xl={2.4} md={4} sm={6} xs={12} style={{marginBottom:"50px"}} sx = {[hide?display_none:{}]}>
    <Box sx={box_style}>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modal_style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Type stake amounts
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 5 }}>
              <TextField
              style={{color:"white"}}
                id="outlined-number"
                label="Number"
                type="number"
                value={backAmount}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={getInputValue}
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Button variant="outlined" sx={{ mr: 2 }} onClick={handleClose}>Cancel</Button>
              <Button variant="contained" onClick={() => backToken()}>Confirm</Button>
            </Typography>
          </Box>
        </Modal>
      </div>

      <Box style={{ width: "100%", margin: "auto" }}>
        <Box sx={{ width: "90%", textAlign: "center", margin: "auto" }}>
          <img style={{ width: "100%", borderRadius: "16px" }} src={uri} alt="card" />
        </Box>
      </Box>
      <Box style={{ width: "100%", margin: "auto", marginBottom: "0px" }}>
        <Box>
          <Typography className="name" variant="h6" style={{ fontSize: "13px", width: "90%", margin: "auto" }} component="div" sx={{ flexGrow: 1 }}>
            {name}
          </Typography>
        </Box>
        <Grid container style={{ justifyContent: "space-between", width: "90%", margin: "auto", marginTop: "5px" }}>
          <Grid item xs={5}>
            <Box
              sx={{
                bgcolor: '#ea923e',
                fontWeight: "bold",
                boxShadow: 1,
                borderRadius: 3,
                width: "100%",
                height: "70%"
              }}
            >
              <Button sx={btnStyle} onClick={handleOpen}>STAKE</Button>
              {/* <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
                <form>
                  <input
                    type="text"
                    name="firstName"
                    defaultValue={"Hello"}
                  />
                </form>
              </Modal> */}
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box
              sx={{
                bgcolor: '#ea923e',
                fontWeight: "bold",
                boxShadow: 1,
                borderRadius: 3,
                width: "100%",
                height: "77%",
                padding: "0",
                textAlign: "center"
              }}
            >
              <FormLabel style={{}} sx={btnStyle}>{amount ? amount : "0"}</FormLabel>
              {/* <input type="text" style={btnStyle} onChange={getInputValue}></input> */}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                bgcolor: '#ea923e',
                fontWeight: "bold",
                boxShadow: 1,
                borderRadius: 3,
                width: "100%",
                height: "70%"
              }}
            >
              <Button sx={btnStyle} onClick={() => burn()}>BURN</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
    </Grid>
  );
};

export default NFTCard;