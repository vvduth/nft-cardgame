import { ethers, providers } from "ethers";
import { ABI } from "../contract";

const AddNewEvent = (evenFilter, provider, cb) => {
    provider.removeListener(evenFilter) ; 
    provider.on(evenFilter, (logs) => {
        const parseLog = (new ethers.utils.Interface(ABI)).parseLog(logs) ; 

        cb(parseLog) ;
    })
} 

export const createEventListeners = ({navigate, contract , provider, walletAddress, setShowAlert}) => {
    const NewPlayerEventFilter = contract.filters.NewPlayer() ; 

    AddNewEvent(NewPlayerEventFilter , provider , ({args}) => {
        console.log("New player created! ", args ) ; 

        if (walletAddress === args.owner) {
            setShowAlert({
                status: true, 
                type: 'sucess', 
                message: "Player is successfully registered"
            })
        }
    })
}