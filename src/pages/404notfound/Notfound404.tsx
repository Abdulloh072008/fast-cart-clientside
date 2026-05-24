
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Notfound404 = () => {
    return (
        <div className="w-full min-h-[70vh] flex flex-col bg-background text-foreground font-sans mt-20">

            <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 md:py-28 max-w-[1170px] w-full mx-auto">
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-wider text-black dark:text-white select-none">
                    404 Not Found
                </h1>

                <p className="mt-6 md:mt-8 text-sm sm:text-base text-black dark:text-zinc-300 font-normal">
                    Your visited page not found. You may go home page.
                </p>

                <div className="mt-10 md:mt-12">
                    <Link to="/">
                        <Button className="bg-[#DB4444] hover:bg-[#E05353] text-white font-medium text-sm sm:text-base px-10 py-6 sm:px-12 sm:py-7 rounded transition-colors duration-200 shadow-none border-none cursor-pointer">
                            Back to home page
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Notfound404;
