'use client'
import './style.css'
import { Search, TrendingUp, X } from 'lucide-react'
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataContext } from '../context/context';


export default function Main() {
    const [isFocused, setIsFocused] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lens, setLens] = useState(false);
    const searchData = ["update aadhar card", "geminids meteor showers", "fourever you episode 11 eng sub",
        "gemini 2.0 ai model", "hanuman jayanti", "delhi pollution", "zero se restart movie release date", "movie trailers",
        "pi network mainnet launch"
    ];
    const [imageLink, setImageLink] = useState("");
    const [uploadedImage, setUploadedImage] = useState(null);
    const [search, setSearch] = useState('');

    const router = useRouter();
    const { setSearchQuery, setMockSearchResults, setGoogleLens } = useContext(DataContext);



    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsFocused(false);
        }
    };

    const handleMic = () => {
        router.push('/voice');
    }




    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== "") {
                fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        setData(data);
                    })
                    .catch((err) => {
                        console.log(err, "err");
                    });
            } else {
                setData([]);
            }
        }, 300)

        return () => clearTimeout(timer);
    }, [search]);

    const handleGoogleSearch = async (text) => {
        setLoading(true);
        const res = await fetch(
            `https://serpapi.com/search?engine=duckduckgo&q=${text}&api_key=e9d5ccb6650b9085b0bdd6883432d326f3c6cd675f1009138486523af97fa5e9`
        );
        const data = await res.json();
        setMockSearchResults(data.organic_results);
        setLoading(false)
        router.push('/searchResult');
    }



    const handleFileUpload = (fileOrEvent) => {
        let file;

        if (fileOrEvent instanceof File) {
            file = fileOrEvent;
        } else {
            file = fileOrEvent?.target?.files?.[0];
        }

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64Image = reader.result;
                console.log("Image Loaded:", base64Image);
                setGoogleLens(base64Image);
                router.push("/lens");
            };
            reader.readAsDataURL(file);
        } else {
            console.log("No file uploaded or invalid event.");
        }
    };


    const handleFileChange = (e) => {
        handleFileUpload(e);
    };



    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        handleFileUpload(file);
    };


    const handleSearchClick = () => {
        if (imageLink) {
            window.open(imageLink, "_blank");
        }
    };



    return (
        <>
            {
                loading ?
                    <div className="min-h-screen flex justify-center items-center">
                        <div className="flex items-center mb-20 space-x-2 text-white text-3xl">
                            <div className="relative w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
                            <span>Loading...</span>
                        </div>
                    </div>
                    :
                    <div className="text-[#E8EAED] relative mt-9 z-50">
                        <div className="relative min-h-[150px] h-[calc(100%-560px)] max-h-[290px] mt-3 flex justify-center items-center">
                            <img
                                className="w-auto md:h-[102px] h-20"
                                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png"
                                alt="Google Logo"
                            />

                            {/* <h1 className="text-center text-[#e8e8e8] md:text-8xl text-[14px] font-medium  roboto ">Googl
                                <span>
                                e
                                </span>
                                </h1> */}
                        </div>
                        {
                            lens ?
                                <div
                                    className={`flex z-20 text-[#E8EAED] flex-col justify-center items-center`}
                                >
                                    <div className={`md:w-[40rem] rounded-3xl bg-[#303134] py-4 px-6`}>
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold text-lg text-center flex-grow">
                                                Search any image with Google Lens
                                            </p>
                                            <button
                                                onClick={() => {
                                                    setLens(false);
                                                    setIsFocused(false);
                                                    setUploadedImage(null);
                                                    setImageLink("");
                                                }}
                                                className="font-thin text-2xl"
                                            >
                                                <X />
                                            </button>
                                        </div>

                                        <div
                                            className="md:h-80 h-48 rounded-md border-2 border-dotted border-[#37383a] bg-[#202124] mt-4 flex flex-col justify-between items-center space-y-4 p-4"
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={handleDrop}
                                        >
                                            <div className="flex md:mt-20 mt-4 gap-4">
                                                <img
                                                    src="/lens.png"
                                                    alt="Upload Icon"
                                                    className="w-16 h-12"
                                                />
                                                <p className="text-gray-400 text-center mt-2 font-medium text-sm md:text-base">
                                                    Drag an image here or{" "}
                                                    <label
                                                        htmlFor="fileInput"
                                                        className="text-blue-400 cursor-pointer hover:underline"
                                                    >
                                                        upload a file
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="fileInput"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={(e) => handleFileChange(e)}
                                                    />

                                                </p>
                                            </div>

                                            <div className="w-full flex flex-col items-center space-y-4">
                                                <div className="flex items-center justify-center w-full">
                                                    <div className="flex-1 h-px bg-[#37383a]"></div>
                                                    <span className="mx-4 text-gray-500 text-sm font-medium">
                                                        OR
                                                    </span>
                                                    <div className="flex-1 h-px bg-[#37383a]"></div>
                                                </div>

                                                <div className="flex items-center w-[95%] space-x-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Paste image link"
                                                        value={imageLink}
                                                        onChange={(e) => setImageLink(e.target.value)}
                                                        className="w-full px-4 py-2 bg-[#303134] text-gray-300 rounded-full placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-300"
                                                    />
                                                    <button
                                                        className="px-4 py-2 bg-[#3c4043] text-blue-500 font-medium rounded-full hover:bg-[#4d5256]"
                                                        onClick={handleSearchClick}
                                                    >
                                                        Search
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div
                                    className={`flex flex-col justify-center items-center  ${isFocused ? '' : 'space-y-4'}`}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    tabIndex={-1}
                                >
                                    <div className={`md:w-[40rem] flex-col ${isFocused ? 'rounded-3xl' : 'rounded-full'} ${isFocused ? 'bg-[#303134]' : 'bg-[#4D5156] hover:bg-[#626467]'} `}>
                                        <div className="flex h-[3rem] ">
                                            <Search className="ml-4 scale-75 mt-3 text-[#9c9898]" />
                                            <input type="text"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleGoogleSearch(search), setSearchQuery(search)
                                                    }
                                                }}
                                                value={search}
                                                onChange={(e) => {
                                                    setSearch(e.target.value);
                                                }}
                                                className="ml-3 bg-transparent md:w-[30rem] w-[12rem] h-12 focus:outline-none"
                                            />
                                            {
                                                search.length > 0 ?
                                                    <div className='flex gap-3'>
                                                        <button className='text-[#d2d4d6] font-medium text-xl'
                                                            onClick={() => setSearch('')}
                                                        >
                                                            <X/>
                                                        </button>
                                                        <p className='mt-3 scale-y-150 text-[#444746]'>|</p>
                                                    </div>
                                                    : <></>
                                            }
                                            {/* <Link href='/voice'> */}
                                            <img onClick={() => handleMic()} src="/google-voice.png" className="scale-75 cursor-pointer" alt="Google Voice" />
                                            {/* </Link> */}
                                            <img onClick={() => setLens(true)} src="/googlelens.png" className="scale-75 cursor-pointer" alt="Google Lens" />
                                        </div>
                                        {isFocused && (
                                            <div className="relative">
                                                <div className="flex justify-center">
                                                    <hr className="w-[95%] border-t-1 border-[#5f6368] font-light" />
                                                </div>
                                                <div className=''>
                                                    {
                                                        data.length > 0 ?
                                                            data?.map((item, index) => {
                                                                return (
                                                                    <div onClick={() => { handleGoogleSearch(item.show.name), setSearchQuery(item.show.name) }} className='flex roboto pl-4 pt-1 gap-2 mt-1 text-[17px] font-semibold cursor-pointer  hover:bg-[#E8EAED]' key={index}>
                                                                        <Search className='text-[#9E9E9E] scale-75 font-thin mt-1 ' /> {item.show.name}
                                                                    </div>
                                                                )
                                                            })
                                                            :
                                                            <>
                                                            <p className='text-[#9E9E9E] pt-4 pl-4'>Trending Searches</p>
                                                            {searchData?.map((item, index) => {
                                                                return (
                                                                    <div onClick={() => { handleGoogleSearch(item), setSearchQuery(item) }} className='flex roboto pl-4 pt-1 gap-2 mt-1 text-[19px] cursor-pointer  hover:bg-[#444746]' key={index}>
                                                                        <TrendingUp className='text-[#9E9E9E] mt-1 font-thin ' /> {item}
                                                                    </div>
                                                                )
                                                            })}
                                                            </>
                                                    }
                                                    <div className='relative'>
                                                        <div className='p-4 flex justify-center '>
                                                            <button className='bg-[#303134] text-[#E8EAED] rounded-md p-2 ml-2 border border-transparent hover:border-[#5f5c5c]'>Google Search</button>
                                                            <button className='bg-[#303134] text-[#E8EAED] rounded-md p-2 ml-2 border border-transparent hover:border-[#5f5c5c]'>I'm Feeling Lucky</button>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-end mr-5 mb-1">
                                                        <p className="italic cursor-pointer text-[12px] text-[#9E9E9E]">
                                                            Report inappropriate predictions
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {
                                        !isFocused ?
                                            <div className="w-full">
                                                <div className="p-4 flex justify-center flex-wrap space-x-2">
                                                    <button className="bg-[#303134] text-[#E8EAED] p-2 rounded-md border border-transparent hover:border-[#5f5c5c]">Google Search</button>
                                                    <button className="bg-[#303134] text-[#E8EAED] p-2 rounded-md border border-transparent hover:border-[#5f5c5c]">I'm Feeling Lucky</button>
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
                                            : <></>
                                    }
                                </div>
                        }
                        {/* ----- */}
                    </div>

            }
        </>
    );
}
