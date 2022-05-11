export const ApiUrl = "https://api.unicial.org";
// export const ApiUrl = "http://192.168.112.103:8080";
export const REQUEST_API_URL = `${ApiUrl}/api/v1`;

export const tabs = {
  land: 1,
};
export const genderData = {
  both: "Both",
  male: "Male",
  female: "Female",
};
export const showMoreCount = 6;
export const someShowMore = 4;
export const limitCount = 6;
export const expired = -99;
export const parcelshowMoreCount = 10;

export const collectionsPlusData = [
  {
    index: 1,
    content: "New Item",
  },
  {
    index: 2,
    content: "New Collection",
  },
];
export const collectionEditMoreIconData = [
  {
    index: 1,
    content: "See in world",
  },
  {
    index: 2,
    content: "Open in editor",
  },
  {
    index: 3,
    content: "Add Existing Item",
  },
  {
    index: 4,
    content: "Delete",
  },
  {
    index: 5,
    content: "Copy URN",
  },
  {
    index: 6,
    content: "Copy address",
  },
  {
    index: 7,
    content: "Forum post",
  },
];

export const createCardletterData = {
  new_item: "New Item",
  new_collection: "New Collection",
};
export const headerLinkData = {
  dashboard   : 1,
  fighter     : 2,
  arsenal     : 3,
  arena       : 4,
  leaderboard : 5,
  halloffame  : 6,
  packs       : 7,
  staking     : 8,
};
export const topTabIndex = {
  land: 1,
  collectibles: 2,
  mystore: 3,
  auction: 4,
  partners: 5,
  myassets: 6,
  mybids: 7,
  contracts: 8,
};

export const BuilderToptabData = {
  builder_scenes: 1,
  builder_land: 2,
  builder_names: 3,
  builder_collections: 4,
};

export const searchbarBtn = {
  tableBtn: 1,
  locationBtn: 2,
};

export const searchbarIndex = {
  collections: 1,
  land: 3,
  parcels: 3,
  estate: 3,
  wearables: 2,
  ens: 4,
  on_sale: 5,
  sales: 0,
  auction: 0,
  contracts: 0,
};

export const networkInfo = {
  chain_id: 1,
  rpcUrl: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  chain_name: "Ethereum Mainnet",
};

export const connectWalletStatus = {
  connect: "1",
  disconnect: "2",
};

export const CHAIN_INFO = {
  MAINNET: {
    chainId: "0x5A",
    chainName: "Zilionixx Mainnet",
    nativeCurrency: {
      name: "ZNX Coin",
      symbol: "ZNX",
      decimals: 18,
    },
    rpcUrls: ["https://rpc1.znxscan.com"],
    blockExplorerUrls: ["https://znxscan.com"],
  },
  TESTNET: {
    chainId: "0x5D",
    chainName: "Zilionixx Testnet",
    nativeCurrency: {
      name: "ZNX Coin",
      symbol: "ZNX",
      decimals: 18,
    },
    rpcUrls: ["https://testrpc1.znxscan.com"],
    blockExplorerUrls: ["https://testnet.znxscan.com"],
  },
};

export const typebox = {
  store: "item",
  listing: "nft",
};
export const ownerStorebox = {
  originals: "item",
  collectibles: "nft",
};
export const parcelTypes = ["road", "district", "plaza"];

export const category = {
  collections: "collections",
  land: "land",
  parcels: "parcels",
  estates: "estates",
  wearable: "wearables",
  name: "ens",
  all_assets: "all",
};

export const collectiblesTagsColor = {
  DefaultColor: "DefaultColor",
  RareColor: "RareColor",
};

export const categoryWearables = {
  head: "wearables_head",
  facialhair: "wearables_facial_hair",
  hair: "wearables_hair",
  eyes: "wearables_eyes",
  eyebrows: "wearables_eyebrows",
  mouth: "wearables_mouth",
  upperBody: "wearables_upper_body",
  lowerBody: "wearables_lower_body",
  feet: "wearables_feet",
  accessories: "wearables_accessories",
  earring: "wearables_erring",
  eyewear: "wearables_eyewear",
  hat: "wearables_hat",
  helmet: "wearables_helmet",
  mask: "wearables_mask",
  tiara: "wearables_tiara",
  topHead: "wearables_top_head",
};
export const ownercategoriesData = {
  head: "wearables_head",
  facialhair: "wearables_facial_hair",
  hair: "wearables_hair",
  eyes: "wearables_eyes",
  eyebrows: "wearables_eyebrows",
  mouth: "wearables_mouth",
  upperBody: "wearables_upper_body",
  lowerBody: "wearables_lower_body",
  feet: "wearables_feet",
  accessories: "wearables_accessories",
  earring: "wearables_erring",
  eyewear: "wearables_eyewear",
  hat: "wearables_hat",
  helmet: "wearables_helmet",
  mask: "wearables_mask",
  tiara: "wearables_tiara",
  topHead: "wearables_top_head",
  skin: "wearables_skin",
};
//------------table page nation setting-----------------
export const onePageCount = 5;

export const headerSendData = [
  "Token Address",
  "Token Id",
  "Price",
  "Expires At Time",
  "Action",
];

export const headerReceiveData = [
  "Bid Id",
  "Bidder",
  "Price",
  "Expires At Time",
  "Action",
];

export const headerUpdateManagerData = ["Address", "Current Status", "Action"];

export const WearablesData = [
  {
    tagColor: "EpicColor",
    tagLetter: "EPIC",
    productName: "1Unicon ",
    price: 1500,
  },
  {
    tagColor: "LegendaryColor",
    tagLetter: "LEGENDARY",
    productName: "2Unicon punk fantasy",
    price: 1200,
  },
  {
    tagColor: "CommonColor",
    tagLetter: "COMMON",
    productName: "3Unicon punk fantasy",
    price: 900,
  },
  {
    tagColor: "UncommonColor",
    tagLetter: "UNCCOMMON",
    productName: "4Unicon punk fantasy",
    price: 1500,
  },
  {
    tagColor: "RareColor",
    tagLetter: "RARE",
    productName: "5Unicon punk fantasy",
    price: 4500,
  },
  {
    tagColor: "CommonColor",
    tagLetter: "COMMON",
    productName: "3Unicon punk fantasy",
    price: 900,
  },
  {
    tagColor: "UncommonColor",
    tagLetter: "UNCCOMMON",
    productName: "4Unicon punk fantasy",
    price: 1500,
  },
  {
    tagColor: "RareColor",
    tagLetter: "RARE",
    productName: "5Unicon punk fantasy",
    price: 4500,
  },
  {
    tagColor: "CommonColor",
    tagLetter: "COMMON",
    productName: "3Unicon punk fantasy",
    price: 900,
  },
  {
    tagColor: "UncommonColor",
    tagLetter: "UNCCOMMON",
    productName: "4Unicon punk fantasy",
    price: 1500,
  },
  {
    tagColor: "RareColor",
    tagLetter: "RARE",
    productName: "5Unicon punk fantasy",
    price: 4500,
  },
];

export const NamesData = [
  {
    mainName: "Jacobandco",
    price: 1000,
  },
  {
    mainName: "Jacobandco",
    price: 1000,
  },
  {
    mainName: "Jacobandco",
    price: 1000,
  },
  {
    mainName: "Jacobandco",
    price: 1000,
  },
  {
    mainName: "Jacobandco",
    price: 1000,
  },
  {
    mainName: "Jacobandco",
    price: 1000,
  },
  {
    mainName: "Jacobandco",
    price: 1000,
  },
  {
    mainName: "Jacobandco",
    price: 1000,
  },
];

export const managerData = [
  {
    tokenAddress: "0x4343d",
    currentStatus: true,
  },
  {
    tokenAddress: "0x4343d",
    currentStatus: false,
  },
  {
    tokenAddress: "0x4343d",
    currentStatus: false,
  },
  {
    tokenAddress: "0x4343d",
    currentStatus: true,
  },
  {
    tokenAddress: "0x4343d",
    currentStatus: true,
  },
  {
    tokenAddress: "0x4343d",
    currentStatus: false,
  },
  {
    tokenAddress: "0x4343d",
    currentStatus: false,
  },
  {
    tokenAddress: "0x4343d",
    currentStatus: true,
  },
  {
    tokenAddress: "0x4343d",
    currentStatus: true,
  },
  {
    tokenAddress: "0x4343d",
    currentStatus: false,
  },
  {
    tokenAddress: "0x4343d",
    currentStatus: false,
  },
  {
    tokenAddress: "0x4343d",
    currentStatus: true,
  },
  {
    tokenAddress: "0x4343d",
    currentStatus: true,
  },
  {
    tokenAddress: "0x4343d",
    currentStatus: false,
  },
  {
    tokenAddress: "0x4343d",
    currentStatus: false,
  },
  {
    tokenAddress: "0x4343d",
    currentStatus: true,
  },
];
//-------------map color-----------------------
export const mapColor = {
  selected: "#ff9990",
  myParcel: "#FAF0CA",
  myEstate: "#7E65E3",
  otherEstate: "#60B94D",
  onSaleParcels: "#FFAF3B",
  onSaleEstates: "#C7EFCF",
  focused: "#F0B67F ",
};

export const rareData = [
  {
    index: 1,
    name: "Unique",
    frequency: 1,
  },
  {
    index: 2,
    name: "Mythic",
    frequency: 10,
  },
  {
    index: 3,
    name: "Legendary",
    frequency: 100,
  },
  {
    index: 4,
    name: "Epic",
    frequency: 1000,
  },
  {
    index: 5,
    name: "Rare",
    frequency: 5000,
  },
  {
    index: 6,
    name: "Umcommon",
    frequency: 10000,
  },
  {
    index: 7,
    name: "Common",
    frequency: 10000000,
  },
];

export const categoryData = [
  {
    index: 1,
    name: "Eyebrows",
  },
  {
    index: 2,
    name: "Eyes",
  },
  {
    index: 3,
    name: "Mouth",
  },
];
