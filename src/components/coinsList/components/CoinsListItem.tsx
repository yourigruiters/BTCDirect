import React from "react";
import { CoinData } from "../../../pages/Coins.page";
import "./CoinsListItem.scss";
import classNames from "classnames";

interface Props {
  coinData: CoinData;
}

const CoinsListItem: React.FC<Props> = ({ coinData }) => {
  const { shortName, longName, icon, priceChangePercentage, price } = coinData;

  // Convert currency name to symbol
  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case "EUR":
        return "€";
      default:
        return "";
    }
  };

  // Shorten to 2 decimals and replace . with ,
  const shortenAndCorrectNumber = (value: number) => {
    return value.toFixed(2).replace(".", ",");
  };

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
        <p
          className={classNames({
            clitem__text: true,
            "clitem__text--change": true,
            "clitem__text--change--red": priceChangePercentage > 0,
          })}
        >
          <span>{priceChangePercentage < 0 ? "▲" : "▼"}</span>
          {shortenAndCorrectNumber(priceChangePercentage)}%
        </p>
      </div>
      <div className="clitem__column clitem__column--price">
        <p className="clitem__text clitem__text--price">
          {getCurrencySymbol(price.unit)}{" "}
          {shortenAndCorrectNumber(price.amount)}
        </p>
      </div>
    </div>
  );
};

export default CoinsListItem;
