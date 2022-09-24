/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from "react";

export interface IPlayer {
    activeSong: any;
    isPlaying: boolean;
    volume: number;
    seekTime: number;
    onEnded: () => void;
    onTimeUpdate: (event: React.FormEvent) => void;
    onLoadedData: (event: React.FormEvent) => void;
    repeat: boolean;
}

const Player = ({
    activeSong,
    isPlaying,
    volume,
    seekTime,
    onEnded,
    onTimeUpdate,
    onLoadedData,
    repeat,
}: IPlayer) => {
    const ref = useRef<HTMLAudioElement>(null);
    if (ref.current) {
        if (isPlaying) {
            ref.current.play();
        } else {
            ref.current.pause();
        }
    }

    useEffect(() => {
        if (ref.current) ref.current.volume = volume;
    }, [volume]);
    // updates audio element only on seekTime change (and not on each rerender):
    useEffect(() => {
        if (ref.current) ref.current.currentTime = seekTime;
    }, [seekTime]);

    return (
        <audio
            src={activeSong?.hub?.actions[1]?.uri}
            ref={ref}
            loop={repeat}
            onEnded={onEnded}
            onTimeUpdate={onTimeUpdate}
            onLoadedData={onLoadedData}
        />
    );
};

export default Player;
