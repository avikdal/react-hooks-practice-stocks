import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [portfolioStocks, setPortfolioStocks] = useState([])
  const [sortBy, setSortBy] = useState("Alphabetically")
  const [filter, setFilter] = useState("Tech")

useEffect(() => {
  fetch("http://localhost:3001/stocks")
  .then((r) => r.json())
  .then(stocks => setStocks(stocks));
}, [])


function handleBuyStock(stockToAdd){
  const portfolio = portfolioStocks.find(stock => stock.id === stockToAdd.id);
  if (!portfolio) {
    setPortfolioStocks([...portfolioStocks, stockToAdd]);
  }
}

function handleSellStock(stockToSell){
  const updatedPortfolio = portfolioStocks.filter(stock => stock.id !== stockToSell.id)
  setPortfolioStocks(updatedPortfolio)
}

const sortedStocks = [...stocks].sort((stock1, stock2) => {
  if (sortBy === "Alphabetically") {
    return stock1.name.localeCompare(stock2.name);
  } else  {
    return stock1.price - stock2.price;
  }
})

const filteredStocks = sortedStocks.filter( stock => stock.type === filter)

  return (
    <div>
      <SearchBar sortBy={sortBy} onSortChange={setSortBy} filter={filter} onFilterChange={setFilter} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} onClick={handleBuyStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={portfolioStocks} onClick={handleSellStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
