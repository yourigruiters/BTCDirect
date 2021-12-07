import React from "react";
import { coinData } from "../../pages/Coins.page";
import "./CoinsList.scss";
import CoinsListHeader from "./components/CoinsListHeader";
import CoinsListItem from "./components/CoinsListItem";

interface Props {
  coinsData: coinData[];
}

const CoinsList: React.FC<Props> = ({ coinsData }) => {
  return (
    <div className="coinslist">
      <CoinsListHeader />
      {!coinsData.length ? (
        <p>Nothing found - Needs to be changed</p>
      ) : (
        <ul>
          {coinsData.map((coinData, id) => (
            <CoinsListItem coinData={coinData} key={id} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CoinsList;
