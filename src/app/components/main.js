'use client'
import './style.css'
import { Search, TrendingUp } from 'lucide-react'
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataContext } from '../context/context';

export default function Main() {
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();
    const {setSearchQuery,setMockSearchResults}= useContext(DataContext);
    
    const [data,setData] = useState([]);
    const searchData= ["update aadhar card", "geminids meteor showers", "fourever you episode 11 eng sub",
        "gemini 2.0 ai model", "hanuman jayanti", "delhi pollution", "zero se restart movie release date", "movie trailers",
        "pi network mainnet launch"
    ];


    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsFocused(false);
        }
    };

    const [search, setSearch] = useState('');

    const handleMic =()=>{
        router.push('/voice')
    }


    useEffect(() => {
        if (search !== "") {
            fetch(`http://api.tvmaze.com/search/shows?q=${search}`)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setData(data);
                })
                .catch((err) => {
                    console.log(err, "err");
                });
        }else{
            setData([]);
        }
    }, [search]);
    
    const handleGoogleSearch =async(text)=>{
        
        const res = await fetch(
            `https://serpapi.com/search?engine=duckduckgo&q=${text}&api_key=e9d5ccb6650b9085b0bdd6883432d326f3c6cd675f1009138486523af97fa5e9`
        );
        const data = await res.json();
        setMockSearchResults(data.organic_results);
        router.push('/searchResult');
    }

    return (
        <div className="text-[#E8EAED] relative mt-28 z-50">
            <div className="min-h-[150px] h-[calc(100%-560px)] max-h-[290px] mt-3">
                <h1 className="text-center md:text-9xl text-7xl font-bold roboto ">Google</h1>
            </div>

            <div
                className={`flex flex-col justify-center items-center md:mt-3 ${isFocused ? '' : 'space-y-4'}`}
                onFocus={handleFocus}
                onBlur={handleBlur}
                tabIndex={-1}
            >
                <div className={`md:w-[35rem] flex-col ${isFocused ? 'rounded-3xl' : 'rounded-full'} ${isFocused ? 'bg-[#28292a]' : 'bg-[#444746]'}`}>
                    <div className="flex h-12">
                        <Search className="ml-4 scale-105 mt-3 text-[#bfbfbf]" />
                        <input onChange={(e)=>{
                            setSearch(e.target.value);
                        }}
                            className="ml-3 bg-transparent md:w-[30rem] w-[12rem] h-12 focus:outline-none"
                        />
                        <img onClick={()=>handleMic()} src="/google-voice.png" className="scale-75 cursor-pointer" alt="Google Voice" />
                        <img src="/googlelens.png" className="scale-75 cursor-pointer" alt="Google Lens" />
                    </div>


                    {isFocused && (
                        <div className="relative">
                            <div className="flex justify-center">
                                <hr className="w-[95%] border-t-1 border-[#444746] font-light" />
                            </div>
                            <div className=''>
                                <p className='text-[#9E9E9E] pt-4 pl-4'>Trending Searches</p>
                                {
                                    data.length>0 ?
                                    data?.map((item, index) => {
                                        return (

                                            <div onClick={()=>{handleGoogleSearch(item.show.name),setSearchQuery(item.show.name)}} className='flex pl-4 pt-1 gap-2 mt-1 text-[19px] cursor-pointer roboto hover:bg-[#444746]' key={index}>
                                                <Search className='text-[#c9c5c5] font-thin mt-1' /> {item.show.name}
                                            </div>
                                        )
                                    })
                                    
                                    :
                                

                                    searchData?.map((item, index) => {
                                        return (

                                            <div onClick={()=>{handleGoogleSearch(item),setSearchQuery(item)}} className='flex pl-4 pt-1 gap-2 mt-1 text-[19px] cursor-pointer roboto hover:bg-[#444746]' key={index}>
                                                <TrendingUp className='text-[#bfbfbf] mt-1' /> {item}
                                            </div>
                                        )
                                    })
                                }
                                <div className='relative'>
                                    <div className='p-4 flex justify-center '>
                                        <button className='bg-[#444746] p-2'>Google Search</button>
                                        <button className='bg-[#444746] p-2 ml-2'>I'm Feeling Lucky</button>
                                    </div>
                                </div>



                            </div>
                        </div>


                    )}
                </div>
                {
                    !isFocused?
                    <div className="w-full">
                    <div className="p-4 flex justify-center flex-wrap space-x-2">
                        <button className="bg-[#303134] p-2 rounded-md">Google Search</button>
                        <button className="bg-[#303134] p-2 ml-2 rounded-md">I'm Feeling Lucky</button>
                    </div>
                    <div className="flex flex-wrap justify-center mt-4 space-x-2 text-center">
                        <p>Google offered in:</p>
                        <p className="pl-2 text-[#99C3FF] cursor-pointer hover:underline">हिन्दी</p>
                        <p className="pl-2 text-[#99C3FF] cursor-pointer hover:underline">বাংলা</p>
                        <p className="pl-2 text-[#99C3FF] cursor-pointer hover:underline">తెలుగు</p>
                        <p className="pl-2 text-[#99C3FF] cursor-pointer hover:underline">मराठी</p>
                        <p className="pl-2 text-[#99C3FF] cursor-pointer hover:underline">தமிழ்</p>
                        <p className="pl-2 text-[#99C3FF] cursor-pointer hover:underline">ગુજરાતી</p>
                        <p className="pl-2 text-[#99C3FF] cursor-pointer hover:underline">ಕನ್ನಡ</p>
                    </div>
                </div>
                :<></>
                }
            </div>
        </div>
    );
}
