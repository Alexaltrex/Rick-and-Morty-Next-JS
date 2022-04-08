import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {MainLayout} from "../../Layouts/MainLayout/MainLayout";
import {charactersAPI} from "../../axios/characters.api";
import {ParsedUrlQuery} from "querystring";
import {ICharacter} from "../../types/characters.types";
import style from "./Character.module.scss";
import {InfoItem} from "../../Components/InfoItem/InfoItem";
import {Button} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {useRouter} from "next/router";
import {NavigateBlock} from "../../Components/NavigateBlock/NavigateBlock";

interface ICharacterItem {
    character: ICharacter
    count: number
}

const CharacterItem: NextPage<ICharacterItem> = ({
                                                     character,
                                                     count
                                                 }) => {
    console.log(character);
    console.log(count);
    const router = useRouter();

    const originId = character.origin.url.split('https://rickandmortyapi.com/api/location/')[1];
    const locationId = character.location.url.split('https://rickandmortyapi.com/api/location/')[1];

    return (
        <MainLayout headTitle={`Rick and Morty | ${character.name}`}>
            <section className={style.character}>

                <NavigateBlock onPrevClick={() => router.push(`/character/${character.id - 1}`)}
                               onNextClick={() => router.push(`/character/${character.id + 1}`)}
                               prevDisabled={character.id <= 1}
                               nextDisabled={character.id >= count}
                               btnLabel="character"
                />

                <div className={style.content}>
                    <img src={character.image} alt=""/>
                    <div className={style.info}>
                        <InfoItem label="name" value={character.name}/>
                        <InfoItem label="gender" value={character.gender}/>
                        <InfoItem label="species" value={character.species}/>
                        <InfoItem label="status" value={character.status}/>
                        {character.type && <InfoItem label="type" value={character.type}/>}
                        <InfoItem label="location" value={character.location.name} href={`/location/${locationId}`}/>
                        <InfoItem label="origin" value={character.origin.name} href={`/location/${originId}`}/>
                    </div>
                </div>

            </section>
        </MainLayout>
    )
}
export default CharacterItem

///////////////////////////////////////////////////////////
export const getStaticPaths: GetStaticPaths = async () => {
    const response = await charactersAPI.getAll();
    const ids = [];
    for (let i = 1; i <= response.info.count; i++) {
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
    const character = await charactersAPI.getById(id);
    const {info} = await charactersAPI.getAll();
    return {
        props: {
            character,
            count: info.count
        }
    }
}