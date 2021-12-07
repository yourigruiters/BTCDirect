import React from "react";
import { coinData } from "../../../pages/Coins.page";
import "./CoinsListItem.scss";

interface Props {
  coinData: coinData;
}

const CoinsListItem: React.FC<Props> = ({ coinData }) => {
  const { shortName, longName, icon, priceChangePercentage, price } = coinData;
  return (
    <div className="clitem">
      <div className="clitem__column clitem__column--coin">
        <div className="clitem__image">
          <img src={icon} alt="coin-icon" />
        </div>
        <div className="clitem__name">
          <p className="clitem__text clitem__text--short-name">{shortName}</p>
          <p className="clitem__text clitem__text--long-name">{longName}</p>
        </div>
      </div>
      <div className="clitem__column clitem__column--change">
        <p className="clitem__text clitem__text--change">
          {priceChangePercentage}
        </p>
      </div>
      <div className="clitem__column clitem__column--price">
        <p className="clitem__text clitem__text--price">
          {price.unit} {price.amount}
        </p>
      </div>
    </div>
  );
};

export default CoinsListItem;
