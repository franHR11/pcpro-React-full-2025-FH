import { useCounter } from "@/hooks/useCounter"
import { useMemo } from "react"

const heavystuff = (iterationNumber: number) => {
    console.time('heavy_stuff_started')

    for (let index = 0; index < iterationNumber; index++) {
        console.log('ahi vamos')

    }


    console.timeEnd('heavy_stuff_started')

    return `${iterationNumber} interaciones realizadas`
}

export const MemoCounter = () => {

    const { counter, increment } = useCounter(40_000)
    const { counter: counter2, increment: increment2 } = useCounter(10)

    const myHeavyValue = useMemo(() => heavystuff(counter), [counter])

    return (
        <div className="bg-gradient flex flex-col gap-4">
            <h1 >Memo - useMemo</h1>
            <hr />

            <h4 className="text-2xl font-bold">
                Counter: {counter}
            </h4>

            <h4 className="text-2xl font-bold">
                Counter: {counter2}
            </h4>

            <button
                className="bg-indigo-500 text-white p-2 rounded-lg cursor-pointer"
                onClick={increment}>
                +1
            </button>


            <button
                className="bg-indigo-500 text-white p-2 rounded-lg cursor-pointer"
                onClick={increment2}>
                +1 - al counter2
            </button>

        </div>
    )
}
