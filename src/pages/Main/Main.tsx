import { useEffect, useState, useRef, useLayoutEffect } from "react";
import styles from "./Main.module.scss";
import  "./Main.module.scss";
import { Grid, Box, Button } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import * as waxjs from "@waxio/waxjs/dist";
// import required modules
import { Pagination, Navigation } from "swiper";

import { SlideView } from "../../components/SlideView";
import { StakePanel } from "../../components/StakePanel";

import Modal from '@mui/material/Modal';

export interface NFTProp {
  wax: any,
  Assets: any,
  Account: any,
  stakedList: any,
  setStakedList: any,
}
export const Main = ({ wax, Assets, Account, stakedList, setStakedList }: NFTProp) => {
  const [showNFTs, setShowNFTs] = useState(Assets);

  const [open, setOpen] = useState(false);
  const [reward, setReward] = useState("0");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modal_style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    height: "80vh",
    overflow: "auto",
    padding: "40px",
    bgcolor: '#1a203c',
    color: 'white',
    border: '4px solid #000',
    boxShadow: 24,
    borderColor: '#ea923e',
    textAlign: "center",
    borderRadius: "16px",
    p: 4,
  };

  console.log(showNFTs);
  let totalNFTs: any = [];
  let nfts: any = [
    // (<img src="/image/nft/nft-forest-2.png" />),
    // (<img src="/image/nft/nft-snake-2.png" />),
    // (<img src="/image/nft/nft-snake-1.png" />),
    // (<img src="/image/nft/nft-forest-1.png" />),
    // (<img src="/image/nft/nft-forest-2.png" />),
    // (<img src="/image/nft/nft-snake-2.png" />),
    // (<img src="/image/nft/nft-snake-1.png" />),
  ];

  let ids: any = [];

  let flag = 0;
  flag = 1;
  // useEffect(() => {
  var src = "https://ipfs.infura.io/ipfs/";
  console.log("gg", Assets);

  for (const data of Assets) {
    let img1: any = data.data.img;
    let img_src = (<img src={`https://ipfs.infura.io/ipfs/${img1}`} />);
    nfts.push(img_src);

    ids.push(data.asset_id);
  }
  console.log(nfts);
  // }, [flag]);



  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const contract_owner_name = 'bigsnakefund';
  

  const unstake = async () => {

    var id_list = [];


    if (!wax.api || Account == "") {
      console.log('* Login first *');
    }
    try {
      const result = await wax.api.transact({
        actions: [{
          account: contract_owner_name,
          name: 'unstake',
          authorization: [{
            actor: Account,
            permission: 'active',
          }],
          data: {
            username: Account,
            memo: 'bigsnakes',
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      });

    } catch (e) {
      console.log("An error is occured in unstake");
      console.log(e);
    }
  }

  const claim = async () => {

    var id_list = [];


    if (!wax.api || Account == "") {
      console.log('* Login first *');
    }
    try {
      const result1 = await wax.api.transact({
        actions: [{
          account: contract_owner_name,
          name: 'checksolowin',
          authorization: [{
            actor: Account,
            permission: 'active',
          }],
          data: {
            user: Account,
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      });
      if (result1 != null || result1 != undefined) {
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
          if (result.rows[i].user == Account) {
              
              setReward(result.rows[i].balance_BSM);
          }
        }
      }

      // if (result.rows.length > 0) {
      //   if (!result.rows[0].mode) {
      //     this.setState({ mode: "maintaince" }); //maintaince
      //   } else {
      //     this.setState({ mode: result.rows[0].mode });
      //   }
      // }


    } catch (e) {
      console.log("An error is occured in claim");
      console.log(e);
    }
  }

  const randomWinner = async () => {

    if (!wax.api || Account == "") {
      console.log('* Login first *');
    }
    try {
      const result = await wax.api.transact({
        actions: [{
          account: contract_owner_name,
          name: 'checksolowin',
          authorization: [{
            actor: Account,
            permission: 'active',
          }],
          data: {
            username: Account,
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      });

    } catch (e) {
      console.log("An error is occured in claim");
      console.log(e);
    }
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  return (
    <main className={styles.main} >
      <div className={styles.contents}>
        <div className={styles.header}>
          
          <div><img src="/image/item_logo.png" /></div>
          <div className={styles.bottle}><img style ={{opacity:"0.5"}} src="/image/BSG.jpg" /><span style={{fontSize:"20px"}}>{reward}</span></div>

          <div className={styles.bottle}><img src="/image/item_bottle.png" /><span>20</span></div>
        </div>

        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modal_style}>
              <Typography id="modal-modal-title" variant="h6" component="h1">
                Select your NFT for staking
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 5 }}>
                <StakePanel wax={wax} Account = {Account} items={nfts} ids={ids} stakedList = {stakedList} 
                setStakedList = {setStakedList}/>
              </Typography>

            </Box>
          </Modal>
        </div>

        <div className={styles.nft_panel}>
          <h1 className={styles.align_center}>YOUR NFTS</h1>
          <SlideView items={nfts} ids={ids} stakedList = {stakedList}/>
        </div>

        <div className={styles.button_group}>
          <Button className={styles.btn_home} onClick={unstake}></Button>
          <Button className={styles.btn_stake} onClick={handleOpen}></Button>
          <Button className={styles.btn_fight} onClick={claim}></Button>
        </div>

      </div>
    </main>
  );
};
