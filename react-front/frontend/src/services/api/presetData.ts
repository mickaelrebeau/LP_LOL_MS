/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "../../hooks/useApi";

const api = useApi();

export async function getAll() {
    try {
        const data = await api.get("/preset-data")
        return data;
    } catch (err) {
        console.log(err);
    }
}