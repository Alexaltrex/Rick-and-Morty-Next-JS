import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import style from "./Characters.module.scss";
import {MainLayout} from "../../Layouts/MainLayout/MainLayout";
import Pagination from '@mui/material/Pagination';
import {charactersAPI} from "../../axios/characters.api";
import {ICharactersResponse, IInfo} from "../../types/characters.types";
import {TitleBlock} from "../../Components/Title/Title";
import {CharactersLayout} from "../../Layouts/CharactersLayout/CharactersLayout";
import {ParsedUrlQuery} from "querystring";
import {CharacterCard} from "../../Components/CharacterCard/CharacterCard";

interface ICharacters {
    response: ICharactersResponse,
    id: string
}

const Characters: NextPage<ICharacters> = ({
                                               response,
                                               id
                                           }) => {
    //console.log(response);
    //console.log(id);
    return (
        <MainLayout headTitle="Rick and Morty | Characters">
            <section className={style.characters}>
                <CharactersLayout pages={response.info.pages}
                                  id={id}
                >

                    <div className={style.cards}>
                        {
                            response.results.map(character => (
                                    <CharacterCard key={character.id}
                                                   character={character}
                                    />
                                )
                            )
                        }
                    </div>
                </CharactersLayout>
            </section>
        </MainLayout>
    )
}
export default Characters

///////////////////////////////////////////////////////////
export const getStaticPaths: GetStaticPaths = async () => {
    const response = await charactersAPI.getAll();
    const ids = [];
    for (let i = 1; i <= response.info.pages; i++) {
        ids.push(i);
    }
    const paths = ids.map(id => ({
        params: {
            id: String(id)
        },
    }));
    return {
        paths,
        fallback: false
    }
}
interface IParams extends ParsedUrlQuery {
    id: string
}
export const getStaticProps: GetStaticProps = async (context) => {
    const {id} = context.params as IParams;
    const response = await charactersAPI.getAll(id);
    return {
        props: {
            response,
            id
        }
    }
}