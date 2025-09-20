import GifList from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import CustomHeader from "./shared/components/CustomHeader"
import SearchBar from "./shared/components/SearchBar"
import { useGifs } from "./gifs/hooks/useGifs"

export const GifsApp = () => {
    const {
        gifs,
        previousTerm,
        handleTermClicked,
        handleSearch,
    } = useGifs()

    return (
        <>
            {/* Header */}

            <CustomHeader
                title="Buscador de Gifs"
                description="Descubre y comparte el Gif perfecto"
            />

            {/* Search */}

            <SearchBar
                placeholder="Busca tu Gif"
                onQuery={handleSearch}
            />
            {/* Busquedas Previas */}

            <PreviousSearches
                searches={previousTerm}
                onLaberCicked={handleTermClicked}
            />

            {/* Mostrar Gift*/}

            <GifList
                gifs={gifs}
            />
        </>
    )
}




