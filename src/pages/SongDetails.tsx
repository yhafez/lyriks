import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
} from "../redux/services/shazamCore";
import { ISong } from "../types";

const SongDetails = () => {
    const dispatch = useAppDispatch();
    const { songid } = useParams<{ songid: string }>() as { songid: string };
    const { activeSong, isPlaying } = useAppSelector((state) => state.player);
    const { data: songData, isFetching: isFetchingSongDetails } =
        useGetSongDetailsQuery({ songid });
    const {
        data: relatedSongs,
        isFetching: isFetchingRelatedSongs,
        error,
    } = useGetSongRelatedQuery({ songid });

    const handlePauseClick = () => {
        dispatch(playPause(false));
    };
    const handlePlayClick = (song: ISong, index: number) => {
        dispatch(setActiveSong({ song, relatedSongs, index }));
        dispatch(playPause(true));
    };

    if (isFetchingSongDetails || isFetchingRelatedSongs)
        return <Loader title="Searching song details" />;

    if (error) return <Error />;

    return (
        <div className="flex flex-col">
            <DetailsHeader songData={songData} />
            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

                <div className="mt-5">
                    {songData?.sections[1].type === "LYRICS" ? (
                        songData?.sections[1].text?.map((line, i) => (
                            <p key={i} className="text-gray-400 text-base my-1">
                                {line}
                            </p>
                        ))
                    ) : (
                        <p>Sorry, no lyrics found!</p>
                    )}
                </div>
            </div>

            <RelatedSongs
                data={relatedSongs}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
            />
        </div>
    );
};

export default SongDetails;
