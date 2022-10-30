import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../context";
import { CustomButton, PageHOC } from "../components";
import styles from "../styles";

const JoinBattle = () => {
  const { contract, gameData, setShowAlert, setBattleName, walletAddress } =
    useGlobalContext();
  const navigate = useNavigate();

  const handleClick = async (name) => {
    setBattleName(name)
    try {
      await contract.joinBattle(name) ; 
      setShowAlert({status: true, type:'success', message: `Joining ${name} bra...` })
    } catch(e) {
      console.log(e)
    }
  }
  return (
    <>
      <h2 className={styles.joinHeadText}>Available battles</h2>
      <div className={styles.joinContainer}>
        {gameData.pendingBattles.length ? (
          gameData.pendingBattles.filter((battle) => !battle.players.includes(walletAddress)).map((battle, index)=> (
            <div key={battle.name + index } className={styles.flexBetween}>
                <p className={styles.joinBattleTitle}>
                  {index + 1 }. {battle.name}
                </p>
                <CustomButton 
                  title="Jump In"
                  handleClick={()=> handleClick(battle.name)}
                /> 
            </div>
          ))
        ) : (
          <p className={styles.joinLoading}>
            Reload the page to see new battles
          </p>
        )}
      </div>
      <p className={styles.infoText} onClick={() => navigate("/create-battle")}>
        Or Create you own battle
      </p>
    </>
  );
};

export default PageHOC(
  JoinBattle,
  <>
    Conquer <br /> the whole realms{" "}
  </>,
  <>Or accept others's challenges</>
);
