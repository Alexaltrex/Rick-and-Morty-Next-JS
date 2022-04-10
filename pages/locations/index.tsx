import {GetStaticProps, NextPage} from "next";
import {MainLayout} from "../../Layouts/MainLayout/MainLayout";
import style from "./Locations.module.scss";
import {locationsAPI} from "../../axios/locations.api";
import {ILocation, ILocationsResponse} from "../../types/locations.types";
import {LocationsTable} from "../../Components/LocationsTable/LocationsTable";
import {TitleBlock} from "../../Components/Title/Title";

interface ILocations {
    data: ILocationsResponse
}

const Locations: NextPage<ILocations> = ({data}) => {
    //console.log(data);

    return (
        <MainLayout headTitle="Rick and Morty | Locations">
            <section className={style.locations}>
                <TitleBlock title="locations"/>
                <LocationsTable data={data}/>
            </section>
        </MainLayout>
    )

}
export default Locations;

///////////////////////////////////////////////////////////
export const getStaticProps: GetStaticProps = async (context) => {
    // 1 - получение числа страниц totalPagesCount
    const resultWithTotalPageCount = await locationsAPI.getAll();
    const totalPagesCount = resultWithTotalPageCount.info.pages;
    // 2 - получение ВСЕХ локаций
    let arrPages = [];
    for (let i = 1; i <= totalPagesCount; i++) {
        arrPages.push(i)
    }
    const arrayOfRequests = arrPages.map(pageNumber => locationsAPI.getAll(pageNumber))
    let results = await Promise.all(arrayOfRequests);
    let data = {} as ILocationsResponse;
    data.info = results[0].info;
    let resultsArray = [] as ILocation[];
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