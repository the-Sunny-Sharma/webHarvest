import React, { useEffect, useState } from 'react';
import './Header.css'; // Import component-specific CSS
import $ from 'jquery'; // Import jQuery
import { ReactComponent as Cart } from '../../assets/shoppingCart.svg';
import { ReactComponent as UserProfile } from '../../assets/userProfile.svg'; // Correct import path
function Header() {

  // useEffect(() => {
  //   // jQuery code to handle click event
  //   $(".bars").click(() => {
  //     $(".mobile__nav__fade__and__show__circle").toggleClass("open");
  //     $(".mobile__nav__fade__and__show").toggleClass("open");
  //     $(".bars").toggleClass("toggle");
  //   } , [] );
  // }); 
  
  return (
    <>
      <header>
        <nav>
          <div className="logo">
            <h1>WebHarvest</h1>
          </div>
          <div className="search__bar__header">
            <input type="text" />
            <input type="button" value="search" />
          </div>
          <div className="cart__header__desktop">
            <a href="" className="cart__header__desktop anchor__remains__same" style={{ fontWeight: 'bold' }}>
              <Cart width="32" height="32" /><span>50</span>
            </a>
          </div>
        </nav>
      </header>
      <div className="main__navigations">
        <div className="main__navigations__div">
          <ul className="main__navigations__div__ul">
            <li className="main__navigations__div__li on__mobile_d_none" style={{ fontWeight: 'bold' }}>
              <a href="">Home</a>
            </li>
            <li className="main__navigations__div__li on__mobile_d_none" style={{ fontWeight: 'bold' }}>
              <a href="">Your Grocery</a>
            </li>
            <li className="main__navigations__div__li on__mobile_d_none">
              <a className="categ" style={{ fontWeight: 'bold' }}>Categories <i className="fas fa-caret-down"></i></a>
              <div className="div__categories__items">
                <p><a href="">Category 1</a></p>
                <p><a href="">Category 2</a></p>
                <p><a href="">Category 3</a></p>
                <p><a href="">Category 4</a></p>
                <p><a href="">Category 5</a></p>
              </div>
            </li>
            <li className="main__navigations__div__li save__from__left">
              <a href="" className="anchor__remains__same" style={{ fontWeight: 'bold' }}>
              <UserProfile width="32" height="32" /> Hello, Sunny Sharma.
              </a>
            </li>
            <li className="main__navigations__div__li on__mobile_d_none" style={{ fontWeight: 'bold' }}>
              <a href="">Setting</a>
            </li>
            <li className="main__navigations__div__li">
              <a href="" className="anchor__remains__same" style={{ paddingBottom: 0, fontWeight: 'bold' }}>
                Logout <i className="fas fa-sign-out-alt"></i>
              </a>
            </li>
            <div className="bars save__from__right">
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </div>
          </ul>
        </div>
      </div>

      <div className="mobile__nav__fade__and__show">
        <div className="mobile__nav__fade__and__show__text">
          <li><a href="">Home</a></li>
          <li>
            <a href="">Categories</a>
            <div>
              <p><a href="">Category 1</a></p>
              <p><a href="">Category 2</a></p>
              <p><a href="">Category 3</a></p>
              <p><a href="">Category 4</a></p>
              <p><a href="">Category 5</a></p>
            </div>
          </li>
        </div>
      </div>
      <div className="mobile__nav__fade__and__show__circle"></div>
    </>
  );
}

export default Header;
