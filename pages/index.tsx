import type { NextPage } from 'next'
import {MainLayout} from "../Layouts/MainLayout/MainLayout";
import style from "./index.module.scss";
import img from "../public/404.png";
import Image from 'next/image';
import {useState} from "react";

const Index: NextPage = () => {

    return (
      <MainLayout>
          <div className={style.index}
          >
              <Image src={img}/>
          </div>
      </MainLayout>

  )
}

export default Index
