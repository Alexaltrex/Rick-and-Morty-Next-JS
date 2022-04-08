import '../assets/styles/globals.css'
import type {AppProps} from 'next/app'
import {Provider} from "react-redux";
import {store} from "../store/store";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import style from "./app.module.scss"
import {Preloader} from "../Components/Preloader/Preloader";

function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url: string) => {
            //console.log("start");
            setLoading(true);
        }
        const handleStop = () => {
            //console.log("stop")
            setLoading(false);
        }

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleStop)
        router.events.on('routeChangeError', handleStop)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleStop)
            router.events.off('routeChangeError', handleStop)
        }
    }, [router])

    return (
        <Provider store={store}>
            <div className={style.app}>
                <Component {...pageProps} />
                {loading && <Preloader/>}
            </div>
        </Provider>

    )
}

export default MyApp
