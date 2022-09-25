import { useParams } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";
import { ISong } from "../types";

const ArtistDetails = () => {
    const { id: artistId } = useParams<{ id: string }>();
    const { activeSong, isPlaying } = useAppSelector((state) => state.player);
    console.log("artistId", artistId);
    const {
        data: artistData,
        isFetching: isFetchingArtistDetails,
        error,
    } = useGetArtistDetailsQuery({ artistId });

    if (isFetchingArtistDetails)
        return <Loader title="Loading artist details" />;

    if (error) return <Error />;

    return (
        <div className="flex flex-col">
            <DetailsHeader artistId={artistId} artistData={artistData} />

            <RelatedSongs
                data={Object.values(artistData?.songs)}
                artistId={artistId}
                isPlaying={isPlaying}
                activeSong={activeSong}
            />
        </div>
    );
};

export default ArtistDetails;
