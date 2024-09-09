import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TransactionProvider } from "./context/useTrans";
import "./App.css";

// Lazy load components for performance optimization
const Dashboard = lazy(() => import("./components/Dashboard"));
const PortfolioForm = lazy(() => import("./components/PortfolioForm"));
const TransactionForm = lazy(() => import("./components/TransactionForm"));
const TransactionReconciliation = lazy(() => import("./components/TransRec"));
const Navbar = lazy(() => import("./components/Navbar")); // Import Navbar

function App() {
  useEffect(() => {
    document.title = "Financio"; // Set the title here
  }, []);
  // State Management for portfolio data
  const [portfolios, setPortfolios] = useState([]);

  // Function to handle adding a new portfolio
  const addPortfolio = (portfolio) => {
    setPortfolios([...portfolios, portfolio]);
  };

  const updatePortfolio = (updatedPortfolio) => {
    setPortfolios(
      portfolios.map((portfolio) =>
        portfolio.name === updatedPortfolio.name ? updatedPortfolio : portfolio
      )
    );
  };

  return (
    <Router>
      <div className="App">
        <TransactionProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
            <div className="container mx-auto p-6">
              {/* Implement Suspense for lazy-loaded components */}
              <Routes>
                <Route
                  path="/"
                  element={<Dashboard portfolios={portfolios} />}
                />
                <Route
                  path="/portfolio"
                  element={
                    <PortfolioForm
                      portfolios={portfolios}
                      addPortfolio={addPortfolio}
                      updatePortfolio={updatePortfolio}
                    />
                  }
                />
                <Route
                  path="/transaction"
                  element={<TransactionForm />} // No longer need to pass addTransaction and transactions
                />
                <Route
                  path="/reconciliation"
                  element={<TransactionReconciliation />} // No longer need to pass transactions
                />
              </Routes>
            </div>
          </Suspense>
        </TransactionProvider>
      </div>
    </Router>
  );
}

export default App;
