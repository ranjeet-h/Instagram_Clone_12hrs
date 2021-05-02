import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// import Header from '../components/header';
import * as ROUTES from "../constants/routes";

export default function NotFound() {
  useEffect(() => {
    document.title = "Not Found - Instagram";
  });
  return (
    // <div className="bg-gray-background">
    //     <div className="mx-auto max-w-screen-lg">
    //         <p className="text-center text-2xl">Not Found</p>
    //     </div>
    // </div>
    <>
      {/* <Header/> */}
      <div class="gradient text-white min-h-screen flex items-center">
        <div class="container mx-auto p-4 flex flex-wrap items-center">
          <div class="w-full md:w-5/12 text-center p-4">
            <img
              src="https://themichailov.com/img/not-found.svg"
              alt="Not Found"
            />
          </div>
          <div class="w-full md:w-7/12 text-center md:text-left p-4">
            <div class="text-6xl font-medium">404</div>
            <div class="text-xl md:text-3xl font-medium mb-4">
              Oops. This page has gone missing.
            </div>
            <div class="text-lg mb-8">
              You may have mistyped the address or the page may have moved.
            </div>
            <Link to={ROUTES.DASHBOARD}>
              <p class="border border-white rounded p-4">Go Home</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
