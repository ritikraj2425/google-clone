'use client'
import './style.css'
import { Search, TrendingUp ,X} from 'lucide-react'
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataContext } from '../context/context';


export default function Main() {
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();
    const { setSearchQuery, setMockSearchResults, setGoogleLens } = useContext(DataContext);


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lens, setLens] = useState(false);
    const searchData = ["update aadhar card", "geminids meteor showers", "fourever you episode 11 eng sub",
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


    const handleMic = () => {
        router.push('/voice');
    }




    useEffect(() => {


        const timer = setTimeout(() => {
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

    const [uploadedImage, setUploadedImage] = useState(null);
    const [imageLink, setImageLink] = useState("");


    const handleFileUpload = (fileOrEvent) => {
        let file;
    
        if (fileOrEvent instanceof File) {
            // If a File object is passed (drag-and-drop)
            file = fileOrEvent;
        } else {
            // If an event object is passed (file input)
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
                            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                            <span>Loading...</span>
                        </div>
                    </div>
                    :
                    <div className="text-[#E8EAED] relative mt-6 z-50">
                        <div className="min-h-[150px] h-[calc(100%-560px)] max-h-[290px] mt-3">
                            <h1 className="text-center md:text-8xl text-7xl font-semibold  roboto ">Google</h1>
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
                                                <X/>
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
                                    <div className={`md:w-[40rem] flex-col ${isFocused ? 'rounded-3xl' : 'rounded-full'} ${isFocused ? 'bg-[#28292a]' : 'bg-[#444746] hover:bg-[#525353]'} `}>
                                        <div className="flex h-12">
                                            <Search className="ml-4 scale-105 mt-3 text-[#bfbfbf]" />
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
                                                        >X </button>
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
                                                    <hr className="w-[95%] border-t-1 border-[#444746] font-light" />
                                                </div>
                                                <div className=''>
                                                    <p className='text-[#9E9E9E] pt-4 pl-4'>Trending Searches</p>
                                                    {
                                                        data.length > 0 ?
                                                            data?.map((item, index) => {
                                                                return (
                                                                    <div onClick={() => { handleGoogleSearch(item.show.name), setSearchQuery(item.show.name) }} className='flex pl-4 pt-1 gap-2 mt-1 text-[19px] cursor-pointer roboto hover:bg-[#444746]' key={index}>
                                                                        <Search className='text-[#9E9E9E] font-thin mt-1' /> {item.show.name}
                                                                    </div>
                                                                )
                                                            })
                                                            :
                                                            searchData?.map((item, index) => {
                                                                return (
                                                                    <div onClick={() => { handleGoogleSearch(item), setSearchQuery(item) }} className='flex pl-4 pt-1 gap-2 mt-1 text-[19px] cursor-pointer roboto hover:bg-[#444746]' key={index}>
                                                                        <TrendingUp className='text-[#9E9E9E] mt-1' /> {item}
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
                                        !isFocused ?
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
