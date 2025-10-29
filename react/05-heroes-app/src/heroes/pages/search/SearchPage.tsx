import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { SearchControl } from "./ui/SearchControl"
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"


export const SearchPage = () => {
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
      <SearchControl/>
    </>
  )
}



export default SearchPage