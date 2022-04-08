import {FC} from "react";
import {Button} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import style from "./NavigateBlock.module.scss"
import {useRouter} from "next/router";

interface INavigateBlock {
    onPrevClick: () => void
    onNextClick: () => void
    prevDisabled: boolean
    nextDisabled: boolean
    btnLabel: string

}

export const NavigateBlock: FC<INavigateBlock> = ({
                                                      onPrevClick,
                                                      onNextClick,
                                                      prevDisabled,
                                                      nextDisabled,
                                                      btnLabel,
                                                  }) => {
    return (
        <div className={style.navigateBlock}>
            <Button variant="outlined"
                    size="small"
                    startIcon={<ArrowBackIosIcon/>}
                    onClick={onPrevClick}
                    disabled={prevDisabled}
            >
                {`prev ${btnLabel}`}
            </Button>
            <Button variant="outlined"
                    size="small"
                    endIcon={<ArrowForwardIosIcon/>}
                    onClick={onNextClick}
                    disabled={nextDisabled}
            >
                {`next ${btnLabel}`}
            </Button>
        </div>
    )
}