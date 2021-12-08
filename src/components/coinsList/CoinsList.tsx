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
        <div className="coinslist__error">
          <p>There are no coin names matching your search value..</p>
        </div>
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
