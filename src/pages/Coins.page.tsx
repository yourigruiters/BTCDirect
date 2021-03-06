import React, { useEffect, useState } from "react";
import CoinsList from "../components/coinsList/CoinsList";
import Input from "../components/input/Input";
import "./Coins.page.scss";

export type CoinData = {
  shortName: string;
  longName: string;
  icon: string;
  priceChangePercentage: number;
  price: {
    unit: string;
    amount: number;
  };
};

export type ColumnOrder = "shortName" | "price";

export type Orders = {
  column: ColumnOrder;
  up: boolean;
};

interface Props {}

const CoinsPage: React.FC<Props> = () => {
  const [allData, setAllData] = useState<CoinData[]>([]);
  const [displayData, setDisplayData] = useState<CoinData[]>([]);
  const [dataError, setDataError] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [order, setOrder] = useState<Orders>({ column: "shortName", up: true });

  useEffect(() => {
    // Fetch new data every 15 seconds
    fetchData();
    let interval = setInterval(() => {
      fetchData();
    }, 1000 * 15);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    handleData(allData);
  }, [allData, order, searchValue]);

  const fetchData = async () => {
    // Fetch all coindata
    setDataError(false);
    try {
      const response = await fetch("https://obu.nu/blox/assessment/");
      const data = await response.json();
      setAllData(data);
    } catch (error) {
      console.error(`Failed to fetch with reason: ${error}`);
      setDataError(true);
    }
  };

  const handleData = (coinData: CoinData[]) => {
    const searchedData = searchData(coinData);
    const orderedData = orderData(searchedData);

    setDisplayData(orderedData);
  };

  const searchData = (coinData: CoinData[]) => {
    // Search coins for matching search value
    const searchedData = coinData.filter((coin) => {
      if (
        coin.shortName.toLowerCase().includes(searchValue.toLowerCase()) ||
        coin.longName.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return coin;
      }

      return false;
    });

    return searchedData;
  };

  const orderData = (coinData: CoinData[]) => {
    // Order coins by selected column
    if (order.column === "price") {
      return coinData.sort((a, b) =>
        order.up
          ? a.price.amount > b.price.amount
            ? 1
            : -1
          : a.price.amount < b.price.amount
          ? 1
          : -1
      );
    }

    return coinData.sort((a, b) =>
      order.up
        ? a.shortName > b.shortName
          ? 1
          : -1
        : a.shortName < b.shortName
        ? 1
        : -1
    );
  };

  const handleColumnClick = (column: ColumnOrder) => {
    // Ensure correct column and direction is used for ordering
    if (order.column === column) {
      setOrder({ ...order, up: !order.up });
    } else {
      column === "shortName"
        ? setOrder({ column: "shortName", up: true })
        : setOrder({ column: "price", up: true });
    }
  };

  return (
    <div className="coinspage">
      <div className="coinspage__header">
        <Input
          value={searchValue}
          onChange={(value: string) => setSearchValue(value)}
        />
      </div>
      <div className="coinspage__main">
        <CoinsList
          coinsData={displayData}
          columnClick={(column: ColumnOrder) => handleColumnClick(column)}
          columnOrder={order}
          dataError={dataError}
        />
      </div>
    </div>
  );
};

export default CoinsPage;
