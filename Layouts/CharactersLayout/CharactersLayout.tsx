import {TitleBlock} from "../../Components/Title/Title";
import Pagination from "@mui/material/Pagination";
import {FC, ReactNode} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectCurrentPage, setCurrentPage} from "../../store/characterSlice";
import {useRouter} from "next/router";

interface ICharactersLayout {
    pages: number
    id: string
    children: ReactNode
}

export const CharactersLayout: FC<ICharactersLayout> = ({
                                                            pages,
                                                            id,
                                                            children
                                                        }) => {
    const router = useRouter()

    const dispatch = useAppDispatch();
    const onChangeHandler = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(setCurrentPage(page));
        router.push(`/characters/${page}`)
    }
    const currentPage = useAppSelector(selectCurrentPage);

    return (
        <>
            <TitleBlock title="characters"/>

            <Pagination variant="outlined"
                        size="small"
                        shape="rounded"
                        count={pages}
                        //page={currentPage}
                        page={Number(id)}
                        showFirstButton
                        showLastButton
                        onChange={onChangeHandler}
                        sx={{
                            marginTop: "10px",
                            alignSelf: "center",
                            "& .Mui-selected": {
                                "background-color": "rgba(0, 0, 0, 0.3)!important"
                            }
                        }}
            />
            <>
                {children}
            </>
        </>
    )
}