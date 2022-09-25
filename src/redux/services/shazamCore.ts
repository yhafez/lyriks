import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISong, SongData, Artist } from "../../types";

export const shazamCoreApi = createApi({
    reducerPath: "shazamCoreApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://shazam-core.p.rapidapi.com/v1",
        prepareHeaders: (headers) => {
            headers.set(
                "X-RapidAPI-Key",
                import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY
            );
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getSongsByGenre: builder.query<ISong[], string>({
            query: (genre) => `charts/genre-world?genre_code=${genre}`,
        }),
        getTopCharts: builder.query<ISong[], void>({
            query: () => "/charts/world",
        }),
        getSongDetails: builder.query<SongData, { songid: string }>({
            query: ({ songid }) => `/tracks/details?track_id=${songid}`,
        }),
        getSongRelated: builder.query<SongData[], { songid: string }>({
            query: ({ songid }) => `/tracks/related?track_id=${songid}`,
        }),
        getArtistDetails: builder.query<Artist, { artistId: string }>({
            query: ({ artistId }) => `/artists/details?artist_id=${artistId}`,
        }),
        getSongsByCountry: builder.query<ISong[], { countryCode: string }>({
            query: ({ countryCode }) =>
                `/charts/country?country_code=${countryCode}`,
        }),
        getSongsBySearch: builder.query<ISong[], { searchTerm: string }>({
            query: ({ searchTerm }) =>
                `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
        }),
    }),
});

export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetArtistDetailsQuery,
    useGetSongsByCountryQuery,
    useGetSongsByGenreQuery,
    useGetSongsBySearchQuery,
} = shazamCoreApi;
