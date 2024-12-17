
export default function Navbar() {

    return (
        <div className="h-14 text-[15px] font-sans font-semibold">
            <div className="flex text-[#FFFFFF]  relative p-4">
                <div className="flex gap-4 absolute mt-1">
                    <a className="hover:underline cursor-pointer">About</a>
                    <a className="hover:underline cursor-pointer"> Store</a>
                </div>
                <div className="flex gap-4 absolute right-0 mr-4">
                    <div className="mt-1 flex gap-4">
                    <a className="hover:underline cursor-pointer">Gmail</a>
                    <a className="hover:underline cursor-pointer">Images</a>
                    </div>
                    <div className="flex items-center justify-center rounded-full h-8 w-8 relative hover:bg-[#444746]">
                        <img className="h-4 w-4  cursor-pointer" src="/menu.png"></img>
                    </div>
                    <div className="flex items-center justify-center rounded-full h-8 w-8 relative hover:bg-[#444746]">
                    <div className="w-10 md:mt-0.5 h-8 cursor-pointer bg-blue-500 rounded-full flex items-center justify-center text-lg">
                        A
                    </div>                    </div>

                </div>
            </div>
        </div>
    )
}