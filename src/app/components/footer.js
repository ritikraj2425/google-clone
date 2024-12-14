export default function Footer() {
    return (
        <footer className="bg-[#1e1e1f] py-2  bottom-0 w-full fixed">
            <div className="px-8 py-3 bg-[#1e1e1f] border-b border-[#dadce0]">
                <p className="text-[#E8E8E8] text-[15px]">India</p>
            </div>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
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