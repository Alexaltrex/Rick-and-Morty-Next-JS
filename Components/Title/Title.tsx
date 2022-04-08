import style from "./Title.module.scss"
import {FC} from "react";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MapIcon from '@mui/icons-material/Map';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

interface ITitleBlock {
    title: "characters" | "locations" | "episodes";
}

export const TitleBlock:FC<ITitleBlock> = ({title}) => {
    return (
        <div className={style.titleBlock}>
            {title === "characters" && <AccountBoxIcon className={style.icon}/>}
            {title === "locations" && <MapIcon className={style.icon}/>}
            {title === "episodes" && <LocalMoviesIcon className={style.icon}/>}
            <h1 className={style.title}>{title}</h1>
        </div>
    )
}