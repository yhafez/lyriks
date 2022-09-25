import { useState, useEffect } from "react";
import axios from "axios";
import { useAppSelector } from "../hooks";

import { Error, Loader, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";
import { ISong } from "../types";

const AroundYou = () => {
    const [countryCode, setCountryCode] = useState("");
    const [loading, setLoading] = useState(true);
    const { activeSong, isPlaying } = useAppSelector((state) => state.player);
    const { data, isFetching, error } = useGetSongsByCountryQuery({
        countryCode,
    });

    useEffect(() => {
        //at_V6NLZ6eBxwQFqyqY3cyKn3wQjX0Az
        axios
            .get(
                `https://geo.ipify.org/api/v2/country?apiKey=${
                    import.meta.env.VITE_GEO_API_KEY
                }`
            )
            .then((res) => setCountryCode(res?.data?.location?.country))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [countryCode]);

    if (isFetching && loading)
        return <Loader title="Loading songs around you" />;

    if (error && countryCode) return <Error />;

    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
                Around You <span className="font-black">{countryCode}</span>
            </h2>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((song: ISong, i: number) => (
                    <SongCard
                        key={song.key}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                        index={i}
                    />
                ))}
            </div>
        </div>
    );
};

export default AroundYou;
