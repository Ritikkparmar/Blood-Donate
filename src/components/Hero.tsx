"use client";

import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import ShinyButton from "@/components/ui/shiny-button";
import OurMission from "./OurMission";
import GetBlood from "./GetBlood";

const Hero = () => {
  return (
    <>
      <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 mb-10">
        <div className="mx-4 mb-20 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out bg-gradient-to-br from-red-50 via-white to-red-100 p-4 border border-red-200">
          <Alert>
            <div className="flex items-center space-x-4">
              <div className="bg-red-100 p-2 rounded-full">
                <Terminal className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <AlertTitle className="text-red-700 text-lg font-semibold">
                  Heads up!
                </AlertTitle>
                <AlertDescription className="text-red-600 mt-1">
                  Your blood donation can save a life and help others.
                </AlertDescription>
              </div>
            </div>
          </Alert>
        </div>

        <ShinyButton
          text="Donate Now"
          className="font-bold shadow-md text-white bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 hover:from-rose-500 hover:via-rose-600 hover:to-rose-700 transition-all duration-300 ease-in-out px-6 py-2 rounded-full hover:scale-105 ring-2 ring-rose-200 hover:ring-rose-300"
        />

        <div className="mt-8 ">
          <h1 className="max-w-4xl text-5xl md:text-6xl lg:text-6xl font-bold mb-4 sm:mb-5 text-center mt-3">
            Save Life
            <span className="block sm:inline sm:ml-3 bg-gradient-to-r from-red-500 via-red-600 to-red-800 bg-clip-text text-transparent">
              Donate Blood
            </span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg mb-6 font-normal text-center max-w-2xl">
            Donate blood to save lives. Your blood donation can save a life and
            help others to live a better life and make a better future for their
            families.
          </p>
        </div>
      </div>
      <OurMission />
      <GetBlood />
    </>
  );
};

export default Hero;
