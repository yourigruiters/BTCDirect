import React, { useEffect, useState } from "react";
import "./Coins.page.scss";

type coinData = {
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
    console.log(allData);
  }, [allData]);

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
  return <div className="coinspage"></div>;
};

export default CoinsPage;
