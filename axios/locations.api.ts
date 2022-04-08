import {instance} from "./axios";
import {ILocation, ILocationsResponse} from "../types/locations.types";

export const locationsAPI = {
    async getAll(currentPage = 1) {
        let response = await instance.get<ILocationsResponse>(`location/?page=${currentPage}`);
        return response.data
    },
    async getById(id: number) {
        let response = await instance.get<ILocation>(`location/${id}`);
        return response.data
    },
}