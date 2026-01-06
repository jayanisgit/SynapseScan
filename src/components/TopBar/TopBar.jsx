import React from "react";
import { NavLink } from "react-router-dom";
import { Brain, Info, Activity } from "lucide-react";
import "./TopBar.css";
import Brand from "../../assets/synapsescan-logo.svg"

export default function TopBar() {
  return (
    <header className="topbar">
      <div className="topbarInner">
        <div className="brand">
          <div className="brandIcon">
            <img src={Brand} alt="" />
          </div>
          <div className="brandText">
            <div className="brandTitle">Synapsescan</div>
            <div className="brandSub">Clinical + MRI Prediction</div>
          </div>
        </div>

        <nav className="nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `navLink ${isActive ? "active" : ""}`}
          >
            <Activity size={16} />
            <span>Predict</span>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => `navLink ${isActive ? "active" : ""}`}
          >
            <Info size={16} />
            <span>About</span>
          </NavLink>
        </nav>

        <div className="rightSlot">
          {/* Optional: add user/profile later */}
        </div>
      </div>
    </header>
  );
}
