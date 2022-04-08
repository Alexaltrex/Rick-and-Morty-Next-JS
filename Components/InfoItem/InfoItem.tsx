import {FC} from "react";
import style from "./InfoItem.module.scss"
import clsx from "clsx";
import Link from "next/link";

interface IInfoItem {
    label: string
    value: string
    href?: string
}

export const InfoItem: FC<IInfoItem> = ({label, value, href}) => {
    return (
        <div className={style.infoItem}>
            <p className={(style.label)}>{label}</p>

            <div/>

            {
                href ? (
                    <Link href={href}>
                        <a className={clsx({
                            [style.value]: true,
                            [style.value_name]: label === "name",
                        })}>
                            {value}
                        </a>
                    </Link>

                ) : (
                    <p className={clsx({
                        [style.value]: true,
                        [style.value_name]: label === "name",
                    })}>
                        {value}
                    </p>
                )
            }

        </div>
    )
}