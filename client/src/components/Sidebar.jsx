/* eslint-disable react/display-name, jsx-a11y/click-events-have-key-events */
import { Navigation } from "react-minimal-side-navigation";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "awesome-react-icons";
import React, { useState } from "react";
import {TbTree} from "react-icons/tb"

import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

import logo from '../img/icon.png'

export const NavSidebar = () => {
  const history = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <React.Fragment>
      {/* Sidebar Overlay */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 z-20 block transition-opacity bg-black opacity-50 lg:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      />

      <div>
        <button
          className="btn-menu"
          onClick={() => setIsSidebarOpen(true)}
          type="button"
        >
          <Icon name="burger" className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
        }`}
      >
        <div className="flex items-center justify-center mt-10 text-center py-6">
          
            <img src={logo} width='50%'/>

        </div>

        {/* https://github.com/abhijithvijayan/react-minimal-side-navigation */}
        <Navigation
          activeItemId={location.pathname}
          onSelect={({ itemId }) => {
            history(itemId);
          }}
          items={[
            {
              title: "Home",
              itemId: "/home",
              // Optional
              elemBefore: () => <TbTree />
            },
            {
              title: "About",
              itemId: "/about",
              elemBefore: () => <Icon name="user" />,
              subNav: [
                {
                  title: "Projects",
                  itemId: "/about/projects",
                  // Optional
                  elemBefore: () => <Icon name="cloud-snow" />
                },
                {
                  title: "Members",
                  itemId: "/about/members",
                  elemBefore: () => <Icon name="coffee" />
                }
              ]
            }
          ]}
        />

        <div className="absolute bottom-0 w-full my-8">
          <Navigation
            activeItemId={location.pathname}
            items={[
              {
                title: "Settings",
                itemId: "/settings",
                elemBefore: () => <Icon name="activity" />
              }
            ]}
            onSelect={({ itemId }) => {
              history(itemId);
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
