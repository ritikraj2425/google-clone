export default function Footer() {
    return (
        <footer className="bg-[#171717] py-3 font-bold  bottom-0 w-full fixed">
            <div className="px-8 py-3 bg-[#171717] border-b border-[#303335]">
                <p className="text-[#e8e8e8] text-[15px]">India</p>
            </div>
            <div className="max-w-full  mx-8">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-8 sm:space-y-0">
                    <div className="flex space-x-6 p-2">
                        <div className="text-[15px] text-[#E8E8E8]  hover:underline">
                            About
                        </div>
                        <div className="text-[15px] text-[#E8E8E8]  hover:underline">
                            Advertising
                        </div>
                        <div className="text-[15px] text-[#E8E8E8]  hover:underline">
                            Business
                        </div>
                        <div className="text-[15px] text-[#E8E8E8]  hover:underline">
                            How Search Works
                        </div>
                    </div>
                    <div className="flex space-x-6 p-2">
                        <div className="text-[15px] text-[#E8E8E8] hover:underline">
                            Privacy
                        </div>
                        <div className="text-[15px] text-[#E8E8E8] hover:underline">
                            Terms
                        </div>
                        <div className="text-[15px] text-[#E8E8E8] hover:underline">
                            Settings
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    )
}