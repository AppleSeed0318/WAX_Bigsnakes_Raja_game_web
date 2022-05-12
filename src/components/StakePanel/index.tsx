import { useEffect, useState } from "react";

import { FormLabel, Box, Grid, backdropClasses } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import "./index.module.css";

export interface Prop {
  // onStake: any,
  wax:any,
  walletSession: any,
  Account: any,
  items: any,
  ids: any,
  stakedList: any,
  setStakedList: any,
}

export const StakePanel = ({wax, walletSession, Account, items, ids, stakedList, setStakedList }: Prop) => {

  const onSuccessStake = (asset_id:any) => {
    let _stakedList = [...stakedList];
    _stakedList.push(asset_id);
    setStakedList(_stakedList);
  }

  const onStake = (asset_id: any) => {
    console.log("select asset_id = ", asset_id);
    console.log("Account", Account);

    stake(asset_id);
  }
  const contract_owner_name = 'bigsnakefund';
  const stake = async (asset_id: any) => {
    // let wallet1_userAccount = await wax.login();
    var id_list = [];
    id_list.push(asset_id);
    console.log("Account", Account, walletSession);
    if (!walletSession || Account == "") {
      console.log('* Login first *');
    }
    try {
      const result = await walletSession.transact({
        actions: [{
          account: "atomicassets",
          name: 'transfer',
          authorization: [{
            actor: Account,
            permission: 'active',
          }],
          data: {
            from: Account,
            to: contract_owner_name,
            asset_ids: id_list,
            memo: 'bigsnakes',
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      });

      if (result) {
        console.log("success result----------------");
        let _stakedList = [...stakedList];
        _stakedList.push(asset_id);
        setStakedList(_stakedList);

      }
      else {
        console.log("result value is null, stake request faild!!!");
      }

    } catch (e) {
      console.log("An error is occured in stake");
      console.log(e);
    }
  }
  const style = {
    display: "flex",
    justifyContent: "center",
  }

  const grid_style = { marginBottom: "50px", marginRight: "4px", marginLeft: "4px" };

  return (
    <Box>
      <Grid container spacing={0} >
        {items.map((data: any, index: any) => {

          var flag = true;
          for (var i = 0; i < stakedList.length; i ++) {
            if(stakedList[i] == ids[index]) {
              flag = false;
              break;
            }
          }

          if(flag) {
            return (<Grid key={data + index} xl={2.4} md={4} sm={6} xs={12} style={grid_style}>
              <button onClick={() => onStake(ids[index])}>{data}</button>
            </Grid>)
          } else {
            return (<></>);
          }
        })}
      </Grid>
    </Box>
  );
};
