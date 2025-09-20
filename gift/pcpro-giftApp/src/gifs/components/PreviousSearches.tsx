import type { FC } from "react"

interface Props {
    searches: string[]
    onLaberCicked: (term: string) => void
}


export const PreviousSearches: FC<Props> = ({ searches, onLaberCicked }) => {
    return (
        <div className="previous-searches">
            <h2>Busquedas Previas</h2>

            <ul className="previous-searches-list">
                {
                    searches.map(term => (
                        <li key={term}
                            onClick={() => onLaberCicked(term)}
                        >{term}</li>
                    ))
                }
            </ul>
        </div>
    )
}
