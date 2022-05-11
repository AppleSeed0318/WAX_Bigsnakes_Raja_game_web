import {APP_CONSTANTS} from "../../constants/app.constant"
export function settotalNFTs(list) {
    return {
        type: APP_CONSTANTS.TOTAL_NFTS,
        payload: {
            list
        }
    }
}