"use client";

import React, { useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import Video from "../common/Video";
import HeaderVideo from "../HeaderVideo/HeaderVideo";
import AboutUs from "../AboutUs/AboutUs";
import ContactAdmin from "../ContactAdmin/ContactAdmin";
import InfluencerAdmin from "../InfluencerAdmin/InfluencerAdmin";
import Traking from "../Traking/traking";



const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Toggle for mobile menu
  const [activeComponent, setActiveComponent] = useState("Header Video"); // Default active component
  const [dropdownStates, setDropdownStates] = useState({}); // Track dropdown states for all components

  // Toggle the menu for mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle menu item click and set the active component
  const handleMenuClick = (componentName) => {
    setActiveComponent(componentName);
    setIsMenuOpen(false); // Close menu for mobile
    setDropdownStates({}); // Close all dropdowns
  };

  // Toggle dropdown for a specific component
  const toggleDropdown = (componentName) => {
    setDropdownStates((prev) => ({
      ...prev,
      [componentName]: !prev[componentName],
    }));
  };

  // Dynamic styling for menu items
  const getMenuItemClass = (componentName) => {
    return activeComponent === componentName
      ? "w-full px-4 py-2 text-left text-primary rounded-full bg-[#FDE8E9]" // Active state styles
      : "w-full px-4 py-2 text-left text-[#444955] hover:text-primary rounded-full hover:bg-[#FDE8E9]"; // Default styles
  };

  // Dynamic styling for dropdown items
  const getDropdownItemClass = (componentName) => {
    return activeComponent === componentName
      ? "w-full px-4 py-2 text-left text-primary rounded-full bg-[#FDE8E9]" // Active dropdown item styles
      : "w-full px-4 py-2 text-left text-[#444955] hover:text-primary rounded-full hover:bg-[#FDE8E9]"; // Default styles
  };

  return (
    <div className="w-full px-5">

      <div className="flex flex-col min-h-screen lg:flex-row">
        {/* Sidebar */}
        {/* Sidebar */}
        <div
          className={`fixed lg:relative inset-y-0 left-0 w-64 bg-white border-r transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 transition-transform duration-300 ease-in-out z-20`}
        >
          {/* Make the menu scrollable */}
          <div className="h-full max-h-screen overflow-y-auto">
            <ul className="flex flex-col p-4 space-y-4">
              {/* Mobile close button */}
              <li className="flex justify-end lg:hidden">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 border rounded-full cursor-pointer hover:btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </li>

              {/* Menu Items with Dropdowns */}
              {[
                { name: "Header Video", dropdownItems: [] },
                { name: "About Us", dropdownItems: [] },
                { name: "Video & Shorts", dropdownItems: [] },
                { name: "Contract", dropdownItems: [] },
                // { name: "Daily Earn List", dropdownItems: ["Daily list"] },
                { name: "Influencer", dropdownItems: [] },
                { name: "Traking", dropdownItems: [] },
              ].map((menu) => (
                <li key={menu.name}>
                  <button
                    className={`${getMenuItemClass(menu.name)} flex items-center justify-between`}
                    onClick={() => {
                      if (menu.dropdownItems.length > 0) toggleDropdown(menu.name);
                      else handleMenuClick(menu.name);
                    }}
                  >
                    <span>{menu.name}</span>
                    {/* Conditionally render dropdown icon only if dropdownItems exist */}
                    {menu.dropdownItems.length > 0 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-4 h-4 transform transition-transform ${dropdownStates[menu.name] ? "rotate-180" : ""
                          }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </button>
                  {dropdownStates[menu.name] && (
                    <ul className="pl-6 mt-2 space-y-2">
                      {menu.dropdownItems.map((item) => (
                        <li key={item}>
                          <button
                            className={getDropdownItemClass(item)}
                            onClick={() => handleMenuClick(item)}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 p-0 lg:p-5">
          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="p-1 my-1 text-3xl border rounded-lg shadow-md lg:hidden hover:text-primary hover:bg-[#FDE8E9]"
          >
            <BsFilterLeft />
          </button>

          {/* Dynamic Content Area */}
          <div className="w-full bg-white">
            {/* Dynamic content based on activeComponent */}
         
            {activeComponent === "" && <div>   <h1>Welcome to admin page</h1></div>}
            {activeComponent === "Header Video" && <div><HeaderVideo></HeaderVideo></div>}
            {activeComponent === "Video & Shorts" && <div> <Video></Video> </div>}
           
            {activeComponent === "About Us" && <div> <AboutUs></AboutUs> </div>}
            {activeComponent === "Contract" && <div> <ContactAdmin></ContactAdmin> </div>}
            {activeComponent === "Influencer" && <div> <InfluencerAdmin></InfluencerAdmin> </div>}
            {activeComponent === "Traking" && <div> <Traking></Traking> </div>}


          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;