import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ stocks, onClick }) {
  console.log("stocks in portfolio", stocks)
  const portfolioList = stocks.map(stock => <Stock key={stock.id} stock={stock} onClick={onClick} />)
  return (
    <div>
      <h2>My Portfolio</h2>
      {
        portfolioList
      }
    </div>
  );
}

export default PortfolioContainer;
