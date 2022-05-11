import { useEffect, useState } from "react";
import styles from "./Fighters.module.scss";
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

export interface NFTProp {
  NFTs: any,
  Assets: any,
  Account: any,
}

export const Fighters = ({ NFTs, Assets, Account }: NFTProp) => {
  const [backed_nft, setBackedNFT] = useState(false);

  const [filters, setFilters] = useState(["Series", "Name", "Rarity", "Powerscore", "Class Card"]);

  const [showNFTs, setShowNFTs] = useState(Assets);
  const [back_showNFTs, setBackShowNFTs] = useState(Assets);

  const [flag, setFlag] = useState(true);

  const handleChangeCheck = (event: SelectChangeEvent) => {
    setBackedNFT(!backed_nft);
    let _assets = [];
    if (backed_nft == false) {

      for (const data of showNFTs) {

          if (data.backed_tokens.length == 0)
          {
            continue;
          }

        _assets.push(data);
      }
      setShowNFTs(_assets);
    }
    else {
      
      setShowNFTs(back_showNFTs);

    }
  };
  const endpoint = "https://wax.greymass.com";

  const wax = new waxjs.WaxJS({
    rpcEndpoint: endpoint
  });
  let uri_prefix = "https://ipfs.infura.io/ipfs/";

  useEffect(() => {
    setShowNFTs(Assets);
    setBackShowNFTs(Assets);
  }, [Assets]);

  let filterData = [

    { value: "0", data: ["Series", "series1", "promo"] },
    { value: "0", data: ["Name", "Ryu", "Chun-Li", "Nash", "M. Bison", "Cammy", "Birdie", "Ken", "Necalli", "Vega", "R. Mika", "Gill", "Rashid", "Karin", "Zangief", "Laura", "Dhalsim", "F.A.N.G", "Alex", "Guile", "Ibuki", "Balrog", "Juri", "Urien", "Akuma", "Kolin", "Ed", "Abigail", "Menat", "Zeku", "Sakura", "Blanka", "Falke", "Cody", "G", "Sagat", "Seth", "E. Honda", "Poison", "Kage", "Lucia"] },
    { value: "0", data: ["Rarity", "Golden", "Build", "Base", "Foil", "Battle", "Weld", "Action", "Collector's Edition"] },
    { value: "0", data: ["Powerscore", "1", "2", "3", "4", "5"] },
    { value: "0", data: ["Class Card", "Class - Base", "Class - Foil", "Class - Weld", "Class - Battle", "Class - Action", "Class - Collector's Edition"] },
  ];


  const handleChange = (event: any, index: any) => {
    let _filters = [...filters];
    let pre_assets = [];
    // _filters = ["All Schemas", "Name", "Rarity", "Powerscore", "Class Card"];

    _filters[index] = event.target.value;

    setFilters(_filters);
    let _assets = [];
    for (const data of Assets) {
      // if(!data.data.name.includes("Class") && data.data.name.includes("Battle")) {
      //   continue;
      // }
      if (_filters[0] != "Series" && _filters[0] != data.schema.schema_name) continue;
      if (_filters[1] != "Name" && !data.data.name.includes(_filters[1])) continue;
      if (_filters[2] != "Rarity" && _filters[2] != data.data.rarity) continue;
      if (_filters[3] != "Powerscore" && _filters[3] != data.data.powerscore) continue;
      if (_filters[4] != "Class Card" && !data.data.name.includes(_filters[4])) continue;
      pre_assets.push(data);

      if (backed_nft == true) {
        if (data.backed_tokens.length == 0)
          {
            continue;
          }
      }

      _assets.push(data);
    }
    setShowNFTs(_assets);
    setBackShowNFTs(pre_assets);
  };
  return (
    <main className={styles.main}>

      <section className={styles.section}>
        <nav style={{ marginBottom: "32px", backgroundColor:"#1a203c" }}>
          <ul className={styles.NavItems}>
            {filterData.map((filter, index) => (
              <li className="NavItem" style={{ height: "40px", color:"white" }} key={index}>
                <FormControl sx={{ m: 1, minWidth: 120, margin: 0, width: "100%" }}>
                  <Select
                  style={{height:"40px"}}
                    value={filters[index]}
                    onChange={(e) => handleChange(e, index)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {filter.data.map((data, idx) => (
                      <MenuItem key={data} value={data}>
                        {idx == 0 && <b>{data}</b>}
                        {idx > 0 && <p>{data}</p>}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </li>
            ))}
          </ul>
        </nav>

        <FormControlLabel
          sx={{ mb: 4 }}
          control={
            <Checkbox style = {{color:"#ea923e"}} checked={backed_nft} onChange={handleChangeCheck} name="backed_nft" />
          }
          label="Only Backed NFTs"
        />

        <Box>
          <Grid container spacing={0} >
            {showNFTs.map((NFT: any) => (
              <>
                
                  <NFTCard key={NFT.data.img} uri={uri_prefix + NFT.data.img} name={NFT.name} account={Account} assetID={NFT.asset_id} backed_tokens={NFT.backed_tokens}/>
                

              </>
            ))}
          </Grid>
        </Box>
      </section>
      <footer className={styles.footer}>
        <p className={styles.footerAnchor}>
          © Copyright 2022 Let's Fight
        </p>
      </footer>
    </main>
  );
};
