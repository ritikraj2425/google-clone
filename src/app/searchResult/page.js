"use client";
import React, { useContext, useState } from "react";
import {
    Search,
    MapPin,
    Settings,
    Menu,
    Mic,
    Image
} from "lucide-react";
import { DataContext } from "../context/context";

const GoogleSearchPage = () => {
    // const [searchQuery, setSearchQuery] = useState("next js");

    const {mockSearchResults,searchQuery} = useContext(DataContext);
    console.log(searchQuery,"dfsdfs")


    return (
        <div className="bg-[#202124] min-h-screen text-white">
            <header className="flex flex-wrap justify-between items-center p-4  border-gray-700">
                <div className="flex items-center space-x-4 w-full md:w-auto">
                    <img
                        src="https://white.logodownload.org/wp-content/uploads/2020/11/google-white-logo.png"
                        alt="Google Logo"
                        className="h-6 md:h-9"
                    />
                    <div className="relative w-full md:w-[700px] lg:w-[800px]">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-[#494c4b] border border-gray-700 rounded-full px-4 py-2 pl-10 w-full focus:outline-none "
                        />
                        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                        <div className="absolute right-3 top-3 flex space-x-2">
                            <Mic className="text-gray-400 cursor-pointer" size={20} />
                            <Image className="text-gray-400 cursor-pointer" size={20} />
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-6 w-full md:w-auto mt-4 md:mt-0">


                <img className="h-6 w-6  cursor-pointer" src="/menu.png"></img>
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-md">
                        A
                    </div>
                </div>
            </header>

            <nav className="flex text-md md:ml-32 ml-2 text-gray-400 mt-2 px-4 py-2 border-b border-gray-700 space-x-4 md:space-x-6 flex-wrap">
                <button className="flex items-center space-x-3 border-b-2 border-white text-white pb-2">
                    <Search size={16} /> All
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <Image size={16} /> Images
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <MapPin size={16} /> Maps
                </button>
                <button className="flex items-center space-x-2 hover:text-white">Videos</button>
                <button className="flex items-center space-x-2 hover:text-white">News</button>
                <button className="flex items-center space-x-2 hover:text-white">More</button>
                <div className="ml-auto flex items-center space-x-2">
                    <span>SafeSearch: On</span>
                    <Settings size={16} className="cursor-pointer" />
                </div>
            </nav>

            <main className="max-w-4xl px-4 py-6 mx-auto md:ml-32">
                <p className="text-gray-400 mb-4">About 13 results (0.42 seconds)</p>

                {mockSearchResults?.map((result, index) => (
                    <div key={index} className="mb-10">
                        <div className="text-sm text-gray-400 mb-1">
                            <a
                                href={result.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                {result.link}
                            </a>
                        </div>
                        <a
                            href={result.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#99C3FF] hover:underline text-2xl font-medium"
                        >
                            {result.title}
                        </a>
                        <p className="text-[#BFBFBF] text-sm font-sans mt-2">{result.snippet}</p>
                    </div>
                ))}
            </main>

            <footer className="bg-[#303134] py-4 flex justify-center space-x-4 flex-wrap">
                <button className="w-8 h-8 flex items-center justify-center bg-blue-400 text-white rounded-full mb-2">
                    1
                </button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-700 text-gray-400 rounded-full mb-2">
                    2
                </button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-700 text-gray-400 rounded-full mb-2">
                    3
                </button>
                <button className="px-4 py-2 flex items-center justify-center hover:bg-gray-700 text-gray-400 rounded-full mb-2">
                    Next
                </button>
            </footer>
        </div>
    );
};

export default GoogleSearchPage;
