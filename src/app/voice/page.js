'use client'
import './voice.css'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react';

export default function GoogleVoice() {
    const router = useRouter();

    const handleCross = () => {
        router.push('/');
    };

    return (
        <div className="flex bg-[#202124] gap-8 md:gap-60 items-center justify-center min-h-screen relative p-4">
            {/* Close Button */}
            <button
                onClick={handleCross}
                className="absolute top-4 right-4 text-2xl md:text-3xl text-[#E8EAED] hover:text-white transition duration-200"
            >
                <X/>
            </button>

            {/* Listening Text with Animation */}
            <h1 className="text-2xl md:text-5xl text-[#97999b] mb-4 flex items-center justify-center">
                Listening
                <span className="dot-animation ml-2 mt-4">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </span>
            </h1>

            {/* Microphone Icon */}
            <div className="bg-[#E8EAED] p-8 md:p-12 rounded-full flex justify-center items-center">
                <img src="/mic.png" className="text-gray-600 w-10 h-10 md:w-14 md:h-14" alt="Microphone" />
            </div>
        </div>
    );
}




// https://serpapi.com/search?engine=duckduckgo&q=newtonschool