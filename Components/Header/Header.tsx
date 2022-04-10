import style from "./Header.module.scss"
import Link from "next/link";
import {useRouter} from "next/router";
import clsx from "clsx";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectShowBurgerMenu, setShowBurgerMenu} from "../../store/appSlice";
import Image from "next/image";
import logo from "../../public/logo.png";

export const links = [
    {label: "characters", href: "/characters/1", slug: "characters"},
    {label: "locations", href: "/locations", slug: "locations"},
    {label: "episodes", href: "/episodes", slug: "episodes"},
];

export const Header = () => {
    const router = useRouter();

    const dispatch = useAppDispatch();
    const showBurgerMenu = useAppSelector(selectShowBurgerMenu);

    return (
        <header className={clsx({
            [style.header]: true,
            [style.header_showMenu]: showBurgerMenu,
        })}>
            <Link href="/">
                <a className={style.logo}
                   onClick={() => dispatch(setShowBurgerMenu(false))}
                >
                    <Image src={logo}
                           layout="fill"
                           objectFit="fill"
                           width={600}
                           height={190}
                    />
                </a>
            </Link>

            <IconButton size="small"
                        className={clsx({
                            [style.burgerBtn]: true,
                            [style.burgerBtn_showBurgerMenu]: showBurgerMenu,
                        })}
                        onClick={() => dispatch(setShowBurgerMenu(!showBurgerMenu))}
            >
                {showBurgerMenu ? <CloseIcon/> : <MenuIcon/>}
            </IconButton>


            <nav className={style.links}>
                {
                    links.map(({label, href, slug}, index) => (
                        <Link key={index} href={href}>
                            <a className={clsx({
                                [style.link]: true,
                                [style.link_active]: router.pathname.includes(slug),
                            })}>
                                {label}
                            </a>
                        </Link>
                    ))
                }
            </nav>

        </header>
    )
}