import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { Song } from "../types";

interface IPlayPause {
    isPlaying: boolean;
    activeSong: Song | null;
    song: Song;
    handlePause: () => void;
    handlePlay: () => void;
}

const PlayPause = ({
    isPlaying,
    activeSong,
    song,
    handlePause,
    handlePlay,
}: IPlayPause) =>
    isPlaying && activeSong?.title === song.title ? (
        <FaPauseCircle
            onClick={handlePause}
            size={35}
            className="text-gray-300"
        />
    ) : (
        <FaPlayCircle
            onClick={handlePlay}
            size={35}
            className="text-gray-300"
        />
    );

export default PlayPause;
