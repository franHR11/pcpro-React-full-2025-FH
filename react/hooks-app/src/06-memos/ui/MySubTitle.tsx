import { memo } from "react"

interface Props {
    subtitle: string

    callMyAPI: () => void

}



export const MySubTitle = memo(({ subtitle, callMyAPI }: Props) => {
    console.log('mi subtitle')
    return (
        <>
            <h6 className="text-2xl">{subtitle}</h6>


            <button
                className="bg-indigo-500 text-white p-2 rounded-lg cursor-pointer"
                onClick={callMyAPI}
            >LLamar a funcion</button>
        </>

    )
})
