import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {MainLayout} from "../../Layouts/MainLayout/MainLayout";
import {charactersAPI} from "../../axios/characters.api";
import {locationsAPI} from "../../axios/locations.api";
import {ParsedUrlQuery} from "querystring";
import {ILocation} from "../../types/locations.types";
import style from "./LocationItem.module.scss";
import React from "react";
import {InfoItem} from "../../Components/InfoItem/InfoItem";
import {NavigateBlock} from "../../Components/NavigateBlock/NavigateBlock";
import {useRouter} from "next/router";
import {ListOfResidents} from "../../Components/ListOfResidents/ListOfResidents";
import {ICharacter} from "../../types/characters.types";

interface ILocationItem {
    location: ILocation
    count: number
    charactersOfLocation: ICharacter[]
}

const LocationItem: NextPage<ILocationItem> = ({
                                                   location,
                                                   count,
                                                   charactersOfLocation
}) => {
    const router = useRouter();
    // console.log(location);
    // console.log(count);

    return (
        <MainLayout headTitle={`Rick and Morty | ${location.name}`}>
            <div className={style.locationItem}>

                <NavigateBlock onPrevClick={() => router.push(`/location/${location.id - 1}`)}
                               onNextClick={() => router.push(`/location/${location.id + 1}`)}
                               prevDisabled={location.id <= 1}
                               nextDisabled={location.id >= count}
                               btnLabel="location"
                />

                <div className={style.content}>
                    <InfoItem label="name" value={location.name}/>
                    {location.dimension && <InfoItem label="dimension" value={location.dimension}/>}
                    {location.type && <InfoItem label="type" value={location.type}/>}
                </div>

                <ListOfResidents residents={charactersOfLocation} label="location"/>

            </div>

        </MainLayout>
    )
}
export default LocationItem

///////////////////////////////////////////////////////////
export const getStaticPaths: GetStaticPaths = async () => {
    const response = await locationsAPI.getAll();
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
    const location = await locationsAPI.getById(Number(id));
    const {info} = await locationsAPI.getAll();

    // получение всех характеров в локации
    const arrayOfIds = location.residents.map(resident => resident.split("https://rickandmortyapi.com/api/character/")[1]);
    const arrayOfRequests = arrayOfIds.map(characterId => charactersAPI.getById(characterId));
    const charactersOfLocation = await Promise.all(arrayOfRequests);

    return {
        props: {
            location,
            count: info.count,
            charactersOfLocation
        }
    }
}