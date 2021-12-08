import React from "react";
import { ColumnOrder, Orders } from "../../../pages/Coins.page";
import "./CoinsListHeader.scss";
import classNames from "classnames";

interface Props {
  columnClick: (column: ColumnOrder) => void;
  columnOrder: Orders;
}

const CoinsListHeader: React.FC<Props> = ({ columnClick, columnOrder }) => {
  return (
    <div className="clheader">
      <div
        className={classNames({
          clheader__column: true,
          "clheader__column--coin": true,
          "clheader__column--active": columnOrder.column === "shortName",
          "clheader__column--active-down":
            columnOrder.column === "shortName" && !columnOrder.up,
        })}
        onClick={() => columnClick("shortName")}
      >
        <p>Coin {columnOrder.column === "shortName" && <span>▼</span>}</p>
      </div>
      <div className="clheader__column clheader__column--change">
        <p>Price Change</p>
      </div>
      <div
        className={classNames({
          clheader__column: true,
          "clheader__column--price": true,
          "clheader__column--active": columnOrder.column === "price",
          "clheader__column--active-down":
            columnOrder.column === "price" && !columnOrder.up,
        })}
        onClick={() => columnClick("price")}
      >
        <p>{columnOrder.column === "price" && <span>▼</span>} Price</p>
      </div>
    </div>
  );
};

export default CoinsListHeader;
