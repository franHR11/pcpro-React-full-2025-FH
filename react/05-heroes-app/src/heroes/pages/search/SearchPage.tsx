import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { SearchControl } from "./ui/SearchControl"
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"
import { searchHeroesAction } from "@/heroes/actions/search-hero.action"


export const SearchPage = () => {

  const [searchParams] = useSearchParams()

  const name = searchParams.get('name') ?? undefined
  const fuerza = searchParams.get('fuerza') ?? undefined

  const { data: heroes = [] } = useQuery({
    queryKey: ['search', { name, fuerza }],
    queryFn: () => searchHeroesAction({ name, fuerza }),
    staleTime: 1000 * 60 * 5
  })



  return (
    <>
      <CustomBreadcrumbs currentPage="Buscar"
      // breadcrumbs={
      //   [
      //     {label: 'Home', to: '/'},
      //     {label: 'Home 1', to: '/'},
      //     {label: 'Home 2', to: '/'},
      //   ]
      // }

      />
      {/* Header */}
      <CustomJumbotron
        title='Busqueda de Superheroes'
        descripcion='Descubre, explora y gestiona a tus superhéroes y villanos favoritos.'
      />



      {/* Stats Dashboard */}
      <HeroStats />
      {/* Filter y Busquedas */}
      <SearchControl />


      <HeroGrid heroes={heroes} />

    </>
  )
}



export default SearchPage