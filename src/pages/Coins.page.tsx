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
  column: columnOrder;
  up: boolean;
};

interface Props {}

const CoinsPage: React.FC<Props> = () => {
  const [allData, setAllData] = useState<CoinData[]>([]);
  const [displayData, setDisplayData] = useState<CoinData[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [order, setOrder] = useState<Orders>({ column: "shortName", up: true });

  // Fetch new data every 15 seconds
  useEffect(() => {
    fetchData();
    let interval = setInterval(() => {
      fetchData();
    }, 1000 * 15);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Test logging fetching of data
  useEffect(() => {
    handleData(allData);
  }, [allData, order, searchValue]);

  // Fetch all coin data
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://obu.nu/blox/assessment/?debug=succeed"
      );
      const data = await response.json();
      setAllData(data);
    } catch (error) {
      // Log error - Needs to be clean
      console.log(error);
    }
  };

  const handleData = (coinData: CoinData[]) => {
    const searchedData = searchData(coinData);
    const orderedData = orderData(searchedData);

    setDisplayData(orderedData);
  };

  const searchData = (coinData: CoinData[]) => {
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
        />
      </div>
    </div>
  );
};

export default CoinsPage;
