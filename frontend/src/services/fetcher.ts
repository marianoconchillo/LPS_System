import { Fetcher } from "openapi-typescript-fetch";
import { paths } from "./schema";

const fetcher = Fetcher.for<paths>();

fetcher.configure({
    baseUrl: "https://lps-system.herokuapp.com"
});