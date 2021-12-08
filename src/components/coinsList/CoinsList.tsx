import React from "react";
import { CoinData, ColumnOrder, Orders } from "../../pages/Coins.page";
import "./CoinsList.scss";
import CoinsListHeader from "./components/CoinsListHeader";
import CoinsListItem from "./components/CoinsListItem";

interface Props {
  coinsData: CoinData[];
  columnClick: (column: ColumnOrder) => void;
  columnOrder: Orders;
}

const CoinsList: React.FC<Props> = ({
  coinsData,
  columnClick,
  columnOrder,
}) => {
  return (
    <div className="coinslist">
      <CoinsListHeader columnClick={columnClick} columnOrder={columnOrder} />
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
