import { useRef, useState } from "react"
import type { Gif } from "../interfaces/gif.interface"
import { getGifsByQuery } from "../components/actions/get-gifs-by-query.action"


// const gifsCache: Record<string, Gif[]> = {}

export const useGifs = () => {
    const [gifs, setGifs] = useState<Gif[]>([])
    const [previousTerm, setPreviousTerm] = useState<string[]>([])

    const gifsCache = useRef<Record<string, Gif[]>>({})

    const handleTermClicked = async (term: string) => {

        if (gifsCache.current[term]) {
            setGifs(gifsCache.current[term])
            return
        }

        const gifs = await getGifsByQuery(term)
        setGifs(gifs)
    }

    const handleSearch = async (query: string = '') => {
        query = query.trim().toLowerCase()
        if (query.length === 0) return
        if (previousTerm.includes(query)) return
        setPreviousTerm([query, ...previousTerm].slice(0, 8))

        const gifs = await getGifsByQuery(query)
        setGifs(gifs)

        gifsCache.current[query] = gifs
    }

    return {
        gifs,
        previousTerm,
        handleTermClicked,
        handleSearch,

    }


}
