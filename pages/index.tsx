import type {NextPage} from 'next'
import {MainLayout} from "../Layouts/MainLayout/MainLayout";
import style from "./index.module.scss";
import Image from 'next/image';
import src0 from "../public/links/characters.jpg";
import src1 from "../public/links/locations.jpg";
import src2 from "../public/links/episodes.jpg";
import {links} from "../Components/Header/Header";
import Link from "next/link";

const srcs = [src0, src1, src2]
const indexLinks = links.map(({label, href}, index) => ({
    label,
    href,
    src: srcs[index]
}))

const Index: NextPage = () => {

    return (
        <MainLayout>
            <div className={style.index}>
                {
                    indexLinks.map(({label, href, src}, index) => (
                        <Link href={href}
                              key={index}
                        >
                            <a className={style.link}>
                                <div className={style.imageWrapper}>
                                    <Image src={src}
                                           layout="fill"
                                           objectFit="fill"
                                           width={400}
                                           height={400}
                                    />
                                </div>
                                <p>{label}</p>
                            </a>


                        </Link>
                    ))
                }



            </div>
        </MainLayout>

    )
}

export default Index
