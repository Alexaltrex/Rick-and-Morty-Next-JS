import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {MainLayout} from "../../Layouts/MainLayout/MainLayout";
import React from "react";
import {IEpisode} from "../../types/episodes.api";
import {ICharacter} from "../../types/characters.types";
import {NavigateBlock} from "../../Components/NavigateBlock/NavigateBlock";
import {useRouter} from "next/router";
import {InfoItem} from "../../Components/InfoItem/InfoItem";
import {episodesAPI} from "../../axios/episodes.api";
import {ParsedUrlQuery} from "querystring";
import {charactersAPI} from "../../axios/characters.api";
import {ListOfResidents} from "../../Components/ListOfResidents/ListOfResidents";
import style from "./EpisodeItem.module.scss";

interface IEpisodeItem {
    episode: IEpisode
    count: number
    charactersOfEpisode: ICharacter[]
}
const EpisodeItem: NextPage<IEpisodeItem> = ({
                                                 episode,
                                                 count,
                                                 charactersOfEpisode,
                                             }) => {
    const router = useRouter();

    return (
        <MainLayout headTitle={`Rick and Morty | ${episode.episode} - ${episode.name}`}>
            <div className={style.episodeItem}>

                <NavigateBlock onPrevClick={() => router.push(`/episode/${episode.id - 1}`)}
                               onNextClick={() => router.push(`/episode/${episode.id + 1}`)}
                               prevDisabled={episode.id <= 1}
                               nextDisabled={episode.id >= count}
                               btnLabel="episode"
                />

                <div className={style.content}>
                    <InfoItem label="name" value={episode.name}/>
                    <InfoItem label="episode" value={episode.episode}/>
                    <InfoItem label="air date" value={episode.air_date}/>
                </div>

                <ListOfResidents residents={charactersOfEpisode} label="episode"/>

            </div>
        </MainLayout>
    )
}
export default EpisodeItem

///////////////////////////////////////////////////////////
export const getStaticPaths: GetStaticPaths = async () => {
    const response = await episodesAPI.getAll();
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
    const episode = await episodesAPI.getById(Number(id));
    const {info} = await episodesAPI.getAll();

    // получение всех характеров в эпизоде
    const arrayOfIds = episode.characters.map(character => character.split("https://rickandmortyapi.com/api/character/")[1]);
    const arrayOfRequests = arrayOfIds.map(characterId => charactersAPI.getById(characterId));
    const charactersOfEpisode = await Promise.all(arrayOfRequests);

    return {
        props: {
            episode,
            count: info.count,
            charactersOfEpisode
        }
    }
}