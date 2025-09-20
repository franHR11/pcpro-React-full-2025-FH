const Nombre = 'Francisco josé'
const Apellido = 'Herreros'

const juegosFavoritos = ['Mario', 'zelda']



export default function MyAwesomeApp() {

    return (
        <>
            <h1>{Nombre}</h1>
            <h3>{Apellido}</h3>
            <p>{juegosFavoritos.join(',')}</p>
        </>
    )
}
