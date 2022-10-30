import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { PageHOC, CustomInput, CustomButton } from "../components";
import { useGlobalContext } from "../context";
const Home = () => {
  const { contract, walletAddress, setShowAlert } = useGlobalContext();
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate() ; 

  const handleClick =async  () => {
    try {
      
      const playerExist = await contract.isPlayer(walletAddress)  ; 
      if (!playerExist) {
        await contract.registerPlayer(playerName, playerName) ;
        setShowAlert({
          status: true,
          type: 'info', 
          message: `${playerName} is being summoned!` 

        })
      }
    } catch (e) {
      setShowAlert({
        staus: true, 
        type: 'failure', 
        message: "Somethign went wrong!"
      })
    }
  }

  useEffect(()=> {
    const checkForPlayerToken = async () => {
      const playerExist = await contract.isPlayer(walletAddress)  ; 
      const playerTokenExist = await contract.isPlayerToken(walletAddress) ; 

      if (playerExist && playerTokenExist) {navigate('/create-battle')}

    }
    if (contract) {
      checkForPlayerToken() ;
    }
  }, [contract])
  return (
    <div className="flex flex-col ">
      <CustomInput
        label="Name"
        placeholder="Enter your player name"
        value={playerName}
        handleValueChange={setPlayerName}
      />
      <CustomButton
        title={"Register"}
        handleClick={handleClick}
        restStyles="mt-6"
      />
    </div>
  );
};

export default PageHOC(
  Home,
  <>
    Welcome to AVAX GODs <br /> a Web3 NFT Card Game{" "}
  </>,
  <>
    Connect your wallet to start playing <br /> ultimate battlefield awaits.
  </>
);
