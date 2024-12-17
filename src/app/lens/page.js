'use client'
import React, { useState, useEffect, useCallback, useContext } from "react";
import Cropper from "react-easy-crop";
import { Upload } from 'lucide-react';
import { DataContext } from "../context/context";

export default function ImageAnalyzerApp() {
    const { googleLens } = useContext(DataContext);  // Get the image URL from context

    const [uploadedImage, setUploadedImage] = useState(googleLens);  // Set the image URL directly from the context
    const [cropPixels, setCropPixels] = useState(null);
    const [cropArea, setCropArea] = useState({ x: 0, y: 0 });
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [displayResults, setDisplayResults] = useState(false);
    const [productList, setProductList] = useState([]);

    const handleCropCompletion = useCallback((_, croppedPixels) => {
        setCropPixels(croppedPixels);
        setIsProcessing(true);
        setDisplayResults(false);

        setTimeout(() => {
            setIsProcessing(false);
            setDisplayResults(true);
        }, 2000);
    }, []);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch("https://api.escuelajs.co/api/v1/products");
                const data = await response.json();
                setProductList(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };
        fetchProductData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 ">
            <div className="flex items-center justify-between max-full mx-auto border-b-2">
                <img
                    src="https://download.logo.wine/logo/Google/Google-Logo.wine.png"
                    alt="Google Logo"
                    width={100}
                    height={50}
                    className="cursor-pointer mb-4"
                />
                <div className="flex items-center space-x-4 mr-2">
                    <button className="flex items-center bg-transparent mr-2 hover:bg-[#f4f1f1] text-white py-2 px-4 rounded-md">
                        <Upload className="mr-2 text-[#a09c9c]" />
                        <h2 className="text-sm text-[#a09c9c]">Upload</h2>
                    </button>
                    <img src="https://cdn-icons-png.flaticon.com/256/17/17704.png" width={20} height={20} alt="Lens Icon" />
                    <div className="w-8 h-8  bg-blue-500 rounded-full flex items-center justify-center text-sm text-white">
                        A
                    </div>
                </div>
            </div>

            <div className="w-full mt-2  bg-white p-6 shadow-xl rounded-lg flex gap-4 h-[80vh]">
                <div className="w-full sm:w-1/2 bg-[#242527] p-4 rounded-md relative overflow-hidden h-full">
                    {uploadedImage ? (
                        <div className="relative w-full h-[90%]">
                            <Cropper
                                image={uploadedImage}
                                crop={cropArea}
                                zoom={zoomLevel}
                                aspect={7/5}
                                onCropChange={setCropArea}
                                onZoomChange={setZoomLevel}
                                onCropComplete={handleCropCompletion}
                            />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                            No image available.
                        </div>
                    )}

                    {isProcessing && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="flex space-x-2">
                                <div className="w-2 h-2 bg-gray-100 rounded-full animate-ping"></div>
                                <div className="w-2 h-2 bg-gray-100 rounded-full animate-ping"></div>
                                <div className="w-2 h-2 bg-gray-100 rounded-full animate-ping"></div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="w-full sm:w-1/2 relative overflow-y-auto h-full bg-[#F9F9F9] rounded-lg p-4">
                    {isProcessing ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <div className="relative w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
                            <p className="text-lg font-semibold text-gray-700">Analyzing Image...</p>
                        </div>
                    ) : displayResults ? (
                        <div className="grid grid-cols-2 gap-4">
                            {productList.map((product, index) => (
                                <div
                                    key={product.id}
                                    className="flex flex-col items-center bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                                >
                                    <img
                                        src={product.images}
                                        alt={product.title}
                                        className="w-24 h-24 object-contain mb-2"
                                    />
                                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 text-center mb-1">
                                        {product.title}
                                    </h3>

                                    {index % 2 === 0 ? (
                                        <p className="text-sm text-blue-500 font-medium">${product.price}</p>
                                    ) : (
                                        <p className="text-xs text-gray-600 text-center line-clamp-2">
                                            {product.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            Upload an image to search.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
