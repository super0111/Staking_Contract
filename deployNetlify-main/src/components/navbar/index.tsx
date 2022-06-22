import React, { useState } from "react";
import { ReactComponent as SmallArrow } from "../../assets/svg/small-arrow.svg";
import { Styles } from "./style";

export default function Navbar() {
  const [styleOfEn, setStyleOfEn] = useState<object>({ display: "none" });
  const [styleOfMortgages, setStyleOfMortgages] = useState<object>({ display: "none" });
  const [styleOfSell, setStyleOfSell] = useState<object>({ display: "none" });
  const [styleOfVal, setStyleOfVal] = useState<object>({ display: "none" });
  return (
    <Styles>
      <div className="center-header">
        <img className="logo" src="/logo.png" alt="" />
        <div className="desktop">
          <div className="header-expand" onMouseOver={() => setStyleOfVal({ display: "block" })} onMouseLeave={() => setStyleOfVal({ display: "none" })}>
            <span>Valuation</span>
            <SmallArrow />
            <div className="nav-menu" style={styleOfVal}>
              <div>Online Property Valuation</div>
              <div>House prices</div>
            </div>
          </div>
          <div className="header-expand" onMouseOver={() => setStyleOfSell({ display: "block" })} onMouseLeave={() => setStyleOfSell({ display: "none" })}>
            <span>Sell</span>
            <SmallArrow />
            <div className="nav-menu" style={styleOfSell}>
              <div>Sell at the best price</div>
              <div>How to sell your house?</div>
            </div>
          </div>
          <div className="header-link">Buy</div>
          <div className="header-link">Rent</div>
          <div className="header-link">New developments</div>
          <div className="header-expand" onMouseOver={() => setStyleOfMortgages({ display: "block" })} onMouseLeave={() => setStyleOfMortgages({ display: "none" })}>
            <span>Mortgages</span>
            <SmallArrow />
            <div className="nav-menu" style={styleOfMortgages}>
              <div>Get the best price</div>
              <div>Mortgage calculator</div>
            </div>
          </div>
        </div>
        <div className="action">
          <div className="login-desktopview">Login</div>
          <div className="header-expand" onMouseOver={() => setStyleOfEn({ display: "block" })} onMouseLeave={() => setStyleOfEn({ display: "none" })}>
            <span>EN</span>
            <SmallArrow />
            <div className="nav-menu" style={styleOfEn}>
              <div>Français</div>
              <div>Italiano</div>
              <div>Deutsch</div>
            </div>
          </div>
        </div>
      </div>
    </Styles>
  );
}
