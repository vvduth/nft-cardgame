import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../context";
import { CustomButton, PageHOC } from "../components";
import styles from "../styles";

const JoinBattle = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2 className={styles.joinHeadText}>Available battles</h2>
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
