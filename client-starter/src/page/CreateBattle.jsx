import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../styles";
import { useGlobalContext } from "../context";
import { CustomButton, CustomInput, PageHOC, GameLoad } from "../components";

const CreateBattle = () => {
  const { contract, battleName, setBattleName } = useGlobalContext();
  const [waitBattle, setWaitBattle] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!battleName || !battleName.trim()) return null;

    try {
      await contract.createBattle(battleName);
      setWaitBattle(true);
    } catch (e) {}
  };
  return (
    <>
    {waitBattle && <GameLoad /> }
      <div className="flex flex-col mb-5">
        <CustomInput
          label={"Battle"}
          placeHolder="Enter your battle name"
          value={battleName}
          handleValueChange={setBattleName}
        />
        <CustomButton
          title={"Create Battle"}
          handleClick={handleClick}
          restStyles="mt-6"
        />
      </div>
      <p className={styles.infoText} onClick={() => navigate("/join-battle")}>
        Or join an existing battle
      </p>
    </>
  );
};

export default PageHOC(
  CreateBattle,
  <>
    Create a new battle <br />
  </>,
  <>
    Create your own battle <br /> and wait for other players.
  </>
);
