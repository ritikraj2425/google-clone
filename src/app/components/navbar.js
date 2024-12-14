
export default function Navbar() {

    return (
        <div className="h-14">
            <div className="flex text-[#E8EAED]  relative p-4">
                <div className="flex gap-4 absolute ">
                    <a className="hover:underline cursor-pointer">About</a>
                    <a className="hover:underline cursor-pointer"> Store</a>
                </div>
                <div className="flex gap-4 absolute right-0 mr-4">
                    <a className="hover:underline cursor-pointer">Gmail</a>
                    <a className="hover:underline cursor-pointer">Images</a>
                    <div className="flex items-center justify-center rounded-full h-8 w-8 relative hover:bg-[#444746]">
                        <img className="h-4 w-4  cursor-pointer" src="/menu.png"></img>
                    </div>
                    <div className="flex items-center justify-center rounded-full h-8 w-8 relative hover:bg-[#444746]">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm">
                        A
                    </div>                    </div>

                </div>
            </div>
        </div>
    )
}