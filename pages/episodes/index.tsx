import {GetStaticProps, NextPage} from "next";
import style from "./Episodes.module.scss";
import {MainLayout} from "../../Layouts/MainLayout/MainLayout";
import {TitleBlock} from "../../Components/Title/Title";
import {episodesAPI} from "../../axios/episodes.api";
import {IEpisode, IEpisodesResponse} from "../../types/episodes.api";
import Link from "next/link";

interface IEpisodes {
    data: IEpisodesResponse
}

const Episodes: NextPage<IEpisodes> = ({data}) => {
    console.log(data);

    return (
        <MainLayout headTitle="Rick and Morty | Episodes">
            <section className={style.episodes}>
                <TitleBlock title="episodes"/>

                <div className={style.episodesList}>
                    {
                        data.results.map(episode => (
                            <Link href={`/episode/${episode.id}`}>
                                <a className={style.episodesListItem}>
                                    {`${episode.episode} - ${episode.name}`}
                                </a>
                            </Link>
                        ))
                    }
                </div>
            </section>
        </MainLayout>
    )
}
export default Episodes

///////////////////////////////////////////////////////////
export const getStaticProps: GetStaticProps = async (context) => {
    // 1 - получение числа страниц totalPagesCount
    const resultWithTotalPageCount = await episodesAPI.getAll();
    const totalPagesCount = resultWithTotalPageCount.info.pages;
    // 2 - получение ВСЕХ эпизодов
    let arrPages = [];
    for (let i = 1; i <= totalPagesCount; i++) {
        arrPages.push(i)
    }
    const arrayOfRequests = arrPages.map(episodeId => episodesAPI.getAll(episodeId))
    let results = await Promise.all(arrayOfRequests);
    let data = {} as IEpisodesResponse;
    data.info = results[0].info;
    let resultsArray = [] as IEpisode[];
    for (let i = 0; i < totalPagesCount; i++) {
        resultsArray = [...resultsArray, ...results[i].results]
    }
    data.results = resultsArray;
    return {
        props: {
            data
        }
    }
}