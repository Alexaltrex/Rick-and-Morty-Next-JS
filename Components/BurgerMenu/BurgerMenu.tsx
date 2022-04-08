import style from "./BurgerMenu.module.scss"
import {FC} from "react";
import clsx from "clsx";
import Link from "next/link";
import {links} from "../Header/Header";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectShowBurgerMenu, setShowBurgerMenu} from "../../store/appSlice";

export const BurgerMenu = () => {
    const router = useRouter();
    const showBurgerMenu = useAppSelector(selectShowBurgerMenu);
    const dispatch = useAppDispatch();

    return (
        <div className={clsx({
            [style.burgerMenu]: true,
            [style.burgerMenu_show]: showBurgerMenu
        })}>
            <div className={style.links}>
                {
                    links.map(({label, href}, index) => (
                        <Link key={index}
                              href={href}
                        >
                            <a className={clsx({
                                [style.link]: true,
                                [style.link_active]: router.pathname === href,
                            })}
                               onClick={() => dispatch(setShowBurgerMenu(false))}
                            >
                                {label}
                            </a>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}