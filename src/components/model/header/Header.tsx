import { Heart, Search, ShoppingCart, User, Languages } from "lucide-react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import logo from "../../../assets//img/Group 1116606595-1.png"
import type { RootState } from "../../../store/store"
import Navlist from "../../shared/Navlist"
import { ModeToggle } from "../../shared/theme-provider/ModeToggle"
import { Input } from "../../ui/input"
import MobileNav from "./MobileNav"
import UserMenu from "../../shared/Usermenue"
import { useTranslation } from "react-i18next"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const Header = () => {
  const { t, i18n } = useTranslation();
  const totalItems = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <header className="border-b border-black/30 dark:border-zinc-800 fixed bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 z-50 right-0 left-0 top-0 transition-colors duration-200">
        <nav className="max-w-[1170px] m-auto w-[90%]">
          <div className="hidden lg:flex items-center justify-between py-3">
            <div>
              <Link to={"/"}>
                <img src={logo} alt="Exclusive" className="dark:invert" />
              </Link>
            </div>
            <div>
              <Navlist />
            </div>
            <div className="flex items-center gap-5">
              <div className="lg:w-[243px] flex items-center gap-6 bg-[#F5F5F5] dark:bg-zinc-900 px-3 py-1 rounded-md">
                <Input 
                  className="border-none bg-transparent shadow-none focus-visible:ring-0 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500" 
                  placeholder={t('header.search_placeholder')} 
                />
                <Search className="text-zinc-500 dark:text-zinc-400" />
              </div>
              <div className="flex items-center gap-4 text-zinc-900 dark:text-zinc-50">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Languages className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => changeLanguage('en')}>
                      English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage('ru')}>
                      Русский
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <ModeToggle />
                <Link to={"/wishlist"}>
                  <button className="relative">
                    <Heart className="cursor-pointer hover:text-[#DB4444] transition-colors" />
                    
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
          </div>

          <MobileNav />
        </nav>
      </header>
    </>
  )
}

export default Header