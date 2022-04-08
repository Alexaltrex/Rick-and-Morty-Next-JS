import {instance} from "./axios";
import {IEpisode, IEpisodesResponse} from "../types/episodes.api";

export const episodesAPI = {
    async getAll(currentPage = 1) {
        let response = await instance.get<IEpisodesResponse>(`episode/?page=${currentPage}`);
        return response.data
    },
    async getById(id: number) {
        let response = await instance.get<IEpisode>(`episode/${id}`);
        return response.data
    },
};