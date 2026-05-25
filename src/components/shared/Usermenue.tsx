import { LogOut, UserCircle, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { logout } from "../../reducer/Myaccountslice";
import type { AppDispatch, RootState } from "../../store/store";
import { getImageUrl } from "../../lib/utils";

const UserMenu = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { token, profile } = useSelector((state: RootState) => state.auth);

    const isLoggedIn = !!token;

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const getInitials = () => {
        if (profile?.firstName && profile?.lastName)
            return `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase();
        if (profile?.userName) return profile.userName[0].toUpperCase();
        return "U";
    };

    const Avatar = () => {
        if (!isLoggedIn) return <User className="w-6 h-6" />;
        if (profile?.image)
            return (
                <img
                    src={getImageUrl(profile.image)}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover border-2 border-[#DB4444]"
                />
            );
        return (
            <div className="w-8 h-8 rounded-full bg-[#DB4444] text-white flex items-center justify-center text-sm font-semibold">
                {getInitials()}
            </div>
        );
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="focus:outline-none" aria-label="User menu">
                    <Avatar />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
                {isLoggedIn ? (
                    <>
                        <div className="px-2 py-1.5">
                            <p className="text-xs text-muted-foreground truncate">
                                {profile?.email}
                            </p>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link to="/myaccount" className="flex items-center gap-2 cursor-pointer">
                                <UserCircle className="w-4 h-4" />
                                My Account
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-red-500 focus:text-red-500 cursor-pointer"
                        >
                            <LogOut className="w-4 h-4" />
                            Log Out
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem asChild>
                            <Link to="/login" className="cursor-pointer">Sign In</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link to="/signup" className="cursor-pointer">Sign Up</Link>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserMenu;