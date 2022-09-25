import { SongData, ISong } from "../types";
import SongBar from "./SongBar";

const RelatedSongs = ({
    data,
    isPlaying,
    activeSong,
    handlePauseClick,
    handlePlayClick,
    artistId,
}: {
    data: ISong[] | undefined;
    isPlaying: boolean;
    activeSong: ISong;
    handlePauseClick: () => void;
    handlePlayClick: (song: ISong, index: number) => void;
    artistId: string | undefined;
}) => (
    <div className="flex flex-col">
        <h1 className="font-bold text-3xl text-white">Related Songs:</h1>
        <div className="mt-6 w-full flex flex-col">
            {data?.map((song: ISong, i: number) => (
                <SongBar
                    key={`${song.key}-${artistId}`}
                    song={song}
                    i={i}
                    artistId={artistId}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    handlePauseClick={handlePauseClick}
                    handlePlayClick={handlePlayClick}
                />
            ))}
        </div>
    </div>
);

export default RelatedSongs;
