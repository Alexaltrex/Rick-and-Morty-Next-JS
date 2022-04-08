import {FC} from "react";
import {ICharacter} from "../../types/characters.types";
import style from "./ListOfResidents.module.scss"
import clsx from "clsx";
import Link from "next/link";

interface IListOfResidents {
    residents: ICharacter[]
    label: string
    className?: string
}

export const ListOfResidents: FC<IListOfResidents> = ({
                                                          residents,
                                                          label,
                                                          className
                                                      }) => {
    return (
        <div className={clsx(style.listOfResidents, className && className)}>
            <div className={style.info}>
                <p className={style.label}>{`List of characters who have been seen in the ${label}:`}</p>
                <p className={style.count}>{residents.length}</p>
            </div>

            <div className={style.residents}>
                {
                    residents.map(character => (
                        <Link href={`/character/${character.id}`}
                              key={character.id}
                        >
                            <a className={style.characterChip}>
                                <div className={style.imgWrapper}>
                                    <img src={character.image} alt=""/>
                                </div>
                                <p>{character.name}</p>
                            </a>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}