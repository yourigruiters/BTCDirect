import React, { useEffect, useState } from "react";
import CoinsList from "../components/coinsList/CoinsList";
import Input from "../components/input/Input";
import "./Coins.page.scss";

export type coinData = {
  shortName: string;
  longName: string;
  icon: string;
  priceChangePercentage: number;
  price: {
    unit: string;
    amount: number;
  };
};

interface Props {}

const CoinsPage: React.FC<Props> = () => {
  const [allData, setAllData] = useState<coinData[]>([]);
  const [searchedData, setSearchedData] = useState<coinData[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

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
    searchData(allData);
  }, [allData, searchValue]);

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

  const searchData = (coinData: coinData[]) => {
    const searchedData = coinData.filter((coin) => {
      if (
        coin.shortName.toLowerCase().includes(searchValue.toLowerCase()) ||
        coin.longName.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return coin;
      }

      return false;
    });

    setSearchedData(searchedData);
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
        <CoinsList coinsData={searchedData} />
      </div>
    </div>
  );
};

export default CoinsPage;
