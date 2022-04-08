import {NextPage} from "next";
import style from "./Episodes.module.scss";
import {MainLayout} from "../../Layouts/MainLayout/MainLayout";

const Episodes: NextPage = () => {
    return (
        <MainLayout headTitle="Rick and Morty | Episodes">
            <section className={style.episodes}>
                Episodes
            </section>
        </MainLayout>

    )
}
export default Episodes