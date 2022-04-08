import {GetStaticProps, NextPage} from "next";
import style from "./Characters.module.scss";
import {MainLayout} from "../../Layouts/MainLayout/MainLayout";
import Pagination from '@mui/material/Pagination';
import {charactersAPI} from "../../axios/characters.api";
import {IInfo} from "../../types/characters.types";

interface ICharacters {
    info: IInfo
}

const Characters: NextPage<ICharacters> = ({info}) => {
    console.log(info);

    return (
        <MainLayout headTitle="Rick and Morty | Characters">
            <section className={style.characters}>
                Characters

                <Pagination variant="outlined"
                            shape="rounded"
                            count={info.pages}
                            showFirstButton
                            showLastButton
                />

            </section>
        </MainLayout>

    )
}
export default Characters

export const getStaticProps: GetStaticProps = async (context) => {
    const response = await charactersAPI.getAll();
    const info = response.info;
    return {
        props: {
            info
        }
    }
}