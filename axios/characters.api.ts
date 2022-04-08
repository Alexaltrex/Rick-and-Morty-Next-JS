import {instance} from "./axios";
import {ICharacter, ICharactersResponse} from "../types/characters.types";

export const charactersAPI = {
    async getAll(currentPage = "1") {
        let response = await instance.get<ICharactersResponse>(`character/?page=${currentPage}`);
        return response.data
    },
    async getById(id: string) {
        let response = await instance.get<ICharacter>(`character/${id}`);
        return response.data
    },
}