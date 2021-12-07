import React from "react";
import "./CoinsListHeader.scss";

interface Props {}

const CoinsListHeader: React.FC<Props> = () => {
  return (
    <div className="clheader">
      <div className="clheader__column clheader__column--coin">
        <p>Coin</p>
      </div>
      <div className="clheader__column clheader__column--change">
        <p>Price Change</p>
      </div>
      <div className="clheader__column clheader__column--price">
        <p>Price</p>
      </div>
    </div>
  );
};

export default CoinsListHeader;
