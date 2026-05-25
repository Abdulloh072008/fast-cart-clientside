import { memo } from 'react'
import { useTranslation } from 'react-i18next';
import { NavLink } from "react-router";


const navLists = [
    {
        path: "/",
        title: "home",
    },
    {
        path: "/contact",
        title: "contact",
    },
    {
        path: "/about",
        title: "about",
    },
    {
        path: "/signup",
        title: "signup",
    },
];

interface INavList {
    setOpen?: (open: boolean) => void
}

const Navlist = memo(({ setOpen }: INavList) => {
    const { t } = useTranslation();

    return (
        <>
            <div className='flex lg:block lg:flex-row flex-col gap-4 lg:gap-0'>
                {navLists.map((navList) => (
                    <NavLink
                        style={({ isActive }) => ({
                            fontWeight: isActive ? "bold" : "normal",
                            borderBottom: isActive ? "2px solid currentColor" : "",

                        })}
                        className="py-2 px-5 w-full lg:w-auto lg:text-center hover:text-primary transition-colors text-foreground/70 active:text-foreground"
                        key={t(`nav.${navList.title}`)}
                        to={navList.path}
                        onClick={() => setOpen && setOpen(false)}
                    >
                        {t(`nav.${navList.title}`)}
                    </NavLink>
                ))}
            </div>
        </>
    )
})

export default Navlist