import React, { Component } from "react";
import "./css/Header.css";

export class Header extends Component {
  render() {
    return (
      <header>
        <div className="menu" onClick={this.menuToggle}></div>
        <div>
          <img
            src="https://static-fastly.hackerearth.com/static/hackerearth/images/logo/HE_logo.png"
            alt=""
            style={{ width: "250px", height: "49px" }}
          />
        </div>
      </header>
    );
  }
}

export default Header;
