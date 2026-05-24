import { Heart, Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/Group 1116606595-1.png";
import type { RootState } from "../../../store/store";
import Navlist from "../../shared/Navlist";
import UserMenu from "../../shared/Usermenue";

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const totalItems = useSelector((state: RootState) =>
        state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
    );
    return (
        <div className="lg:hidden px-4">
            <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                    <button onClick={() => setIsOpen(true)} className="cursor-pointer">
                        <Menu size={24} />
                    </button>
                    <Link to="/" className="text-xl font-bold">
                        Exclusive
                    </Link>
                </div>
                <div className="flex items-center gap-3">

                    <Link to={"/wishlist"}>
                        <button className="relative">
                            <Heart className="cursor-pointer hover:text-[#DB4444] transition-colors" />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#DB4444] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </Link>
                    <Link to={"/cart"}>
                        <button className="relative">
                            <ShoppingCart className="w-6 h-6" />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#DB4444] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </Link>
                    <UserMenu/>
                </div>
            </div>

            {
                isOpen && (
                    <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
                )
            }

            <div
                className={`fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:hidden`}
            >
                <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-10">
                        <Link to="/" onClick={() => setIsOpen(false)}>
                            <img src={logo} alt="Exclusive" className="h-6" />
                        </Link>
                        <button onClick={() => setIsOpen(false)} className="cursor-pointer">
                            <X size={24} />
                        </button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Navlist setOpen={setIsOpen} />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default MobileNav;
