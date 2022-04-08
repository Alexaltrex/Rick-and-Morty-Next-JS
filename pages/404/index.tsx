import style from "./Custom404.module.scss"
import Link from "next/link";
import Image from 'next/image';
import src404 from "../../public/404.png"

export default function Custom404() {
    return (
        <div className={style.custom404}>
            <div className={style.content}>
                <div className={style.imgWrapper}>
                    <Image src={src404}
                           alt="404"
                           placeholder="blur"
                        //layout="fill"
                        //objectFit="cover"
                    />
                </div>

                <h1>Page Not Found</h1>
                <Link href="/"><a>Back to home</a></Link>
            </div>

        </div>

    )
}