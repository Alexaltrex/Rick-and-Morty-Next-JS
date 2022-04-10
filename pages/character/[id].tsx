import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {MainLayout} from "../../Layouts/MainLayout/MainLayout";
import {charactersAPI} from "../../axios/characters.api";
import {ParsedUrlQuery} from "querystring";
import {ICharacter} from "../../types/characters.types";
import style from "./Character.module.scss";
import {InfoItem} from "../../Components/InfoItem/InfoItem";
import {useRouter} from "next/router";
import {NavigateBlock} from "../../Components/NavigateBlock/NavigateBlock";
import {episodesAPI} from "../../axios/episodes.api";
import {IEpisode} from "../../types/episodes.api";
import {EpisodesOfCharacter} from "../../Components/EpisodesOfCharacter/EpisodesOfCharacter";
import Image from "next/image";

interface ICharacterItem {
    character: ICharacter
    count: number
    episodesOfCharacter: IEpisode[]
}

const CharacterItem: NextPage<ICharacterItem> = ({
                                                     character,
                                                     count,
                                                     episodesOfCharacter
                                                 }) => {
    // console.log(character);
    // console.log(count);
    const router = useRouter();

    const originId = character.origin.url.split('https://rickandmortyapi.com/api/location/')[1];
    const locationId = character.location.url.split('https://rickandmortyapi.com/api/location/')[1];

    return (
        <MainLayout headTitle={`Rick and Morty | ${character.name}`}>
            <section className={style.character}>
                <div className={style.inner}>
                    <NavigateBlock onPrevClick={() => router.push(`/character/${character.id - 1}`)}
                                   onNextClick={() => router.push(`/character/${character.id + 1}`)}
                                   prevDisabled={character.id <= 1}
                                   nextDisabled={character.id >= count}
                                   btnLabel="character"
                    />

                    <div className={style.content}>
                        <div className={style.imageWrapper}>
                            <Image src={character.image}
                                   layout="fill"
                                   objectFit="fill"
                                   width={300}
                                   height={300}
                                   alt={character.name}
                            />
                        </div>

                        <div className={style.info}>
                            <InfoItem label="name" value={character.name}/>
                            <InfoItem label="gender" value={character.gender}/>
                            <InfoItem label="species" value={character.species}/>
                            <InfoItem label="status" value={character.status}/>
                            {character.type && <InfoItem label="type" value={character.type}/>}
                            <InfoItem label="location" value={character.location.name}
                                      href={character.location.url ? `/location/${locationId}` : ""}/>
                            <InfoItem label="origin" value={character.origin.name}
                                      href={character.origin.url ? `/location/${originId}` : ""}/>

                            <EpisodesOfCharacter episodesOfCharacter={episodesOfCharacter}/>
                        </div>
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

    // получение всех эпизодов для персонажа
    const arrayOfIds = character.episode.map(episode => episode.split("https://rickandmortyapi.com/api/episode/")[1]);
    const arrayOfRequests = arrayOfIds.map(episodeId => episodesAPI.getById(Number(episodeId)));
    const episodesOfCharacter = await Promise.all(arrayOfRequests);

    return {
        props: {
            character,
            count: info.count,
            episodesOfCharacter
        }
    }
}