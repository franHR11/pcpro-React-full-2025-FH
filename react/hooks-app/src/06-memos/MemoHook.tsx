import { useCallback, useState } from "react"
import { MyTitle } from "./ui/MyTitle"
import { MySubTitle } from "./ui/MySubTitle"

export const MemoHook = () => {

    const [title, setTitle] = useState('Hola')
    const [subTitle, setSubTitle] = useState('Adios')

    const handleMyAPICall = useCallback(() => {
        console.log('Llamando a la API - ', subTitle)
    }, [subTitle])


    return (
        <div className="bg-gradient flex flex-col gap-4">

            <h1 className="text-2xl font-thin text-white">MemoApp</h1>

            <MyTitle title={title} />
            <MySubTitle subtitle={subTitle} callMyAPI={handleMyAPICall} />

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                onClick={() => setTitle('Hello, ' + new Date().getTime())}
            >
                cambiar Titulo
            </button>

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                onClick={() => setSubTitle('Bay Bay')}
            >
                cambiar Subtitulo

            </button>


        </div>
    )
}
