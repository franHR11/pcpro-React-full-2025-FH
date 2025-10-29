import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"
import { useSearchParams } from "react-router"
import { use, useMemo } from "react"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedhero } from "@/heroes/hooks/usePaginatedhero"
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"


export const HomePage = () => {


  const [serchParams, setSearchParams] = useSearchParams();
  const { favoriteCount, favorites } = use(FavoriteHeroContext)


  const activeTab = serchParams.get('tab') ?? 'all';
  const page = serchParams.get('page') ?? '1';
  const limit = serchParams.get('limit') ?? '6';
  const category = serchParams.get('category') ?? 'all';

  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains']
    return validTabs.includes(activeTab) ? activeTab : 'all'
  }, [activeTab])



  const { data: heroesResponse } = usePaginatedhero(+page, +limit, category)
  const { data: summary } = useHeroSummary()

  return (
    <>
      <>
        <CustomBreadcrumbs currentPage="Super Hèroes" />
        {/* Header */}
        <CustomJumbotron
          title='Universo de Superheroes'
          descripcion='Descubre, explora y gestiona a tus superhéroes y villanos favoritos.'
        />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'all')
                prev.set('category', 'all')
                prev.set('page', '1')
                return prev
              })}
            >Todos los personajes ({summary?.totalHeroes})</TabsTrigger>
            <TabsTrigger value="favorites"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'favorites')
                return prev
              })}
              className="flex items-center gap-2">

              Favoritos ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger value="heroes"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'heroes')
                prev.set('category', 'hero')
                prev.set('page', '1')
                return prev
              })}
            >Héroes ({summary?.heroCount})</TabsTrigger>
            <TabsTrigger value="villains"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'villains')
                prev.set('category', 'villain')
                prev.set('page', '1')
                return prev
              })}
            >Villanos ({summary?.villainCount})</TabsTrigger>
          </TabsList>

          <TabsContent value='all'>
            {/* Todos los personajes */}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value='favorites'>
            {/* Todos los personajes Favoritos */}
            <HeroGrid heroes={favorites} />
          </TabsContent>
          <TabsContent value='heroes'>
            {/* Todos los Heroes */}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>

          <TabsContent value='villains'>
            {/* Todos los Villanos */}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>

        </Tabs>



        {/* Character Grid */}

        {/* <HeroGrid /> */}

        {/* Pagination */}

        {
          selectedTab !== 'favorites' && (
            <CustomPagination totalPage={heroesResponse?.pages ?? 1} />
          )
        }


      </>
    </>
  )
}