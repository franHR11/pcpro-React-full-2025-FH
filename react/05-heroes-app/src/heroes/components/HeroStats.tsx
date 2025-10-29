import { Badge } from "@/components/ui/badge"
import { Users, Heart, Zap, Trophy, } from "lucide-react"
import { HeroStatCard } from "./HeroStatCard"
import { useHeroSummary } from "../hooks/useHeroSummary"
import { FavoriteHeroContext } from "../context/FavoriteHeroContext"
import { use } from "react"

// Componente que muestra estadísticas resumidas de los héroes
export const HeroStats = () => {

    // Hook personalizado para obtener el resumen de los héroes
    const { data: summary } = useHeroSummary()
    const { favoriteCount } = use(FavoriteHeroContext)

    if (!summary) {
        return <div>Loading...</div>
    }

    return (
        <>
            {/* Grid que contiene las tarjetas de estadísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">


                {/* Tarjeta que muestra el total de personajes (héroes y villanos) */}
                <HeroStatCard
                    cardTitle='Total de Personajes'
                    icon={<Users className="h-4 w-4 text-muted-foreground" />}
                >
                    <div className="text-2xl font-bold">
                        {summary?.totalHeroes}
                    </div>
                    <div className="flex gap-1 mt-2">
                        <Badge variant="secondary" className="text-xs">
                            {summary?.heroCount} Heroes
                        </Badge>
                        <Badge variant="destructive" className="text-xs">
                            {summary?.villainCount} Villains
                        </Badge>
                    </div>
                </HeroStatCard>


                {/* Tarjeta que muestra información sobre favoritos (aunque parece incompleta) */}
                <HeroStatCard
                    cardTitle='Favoritos'
                    icon={<Heart className="h-4 w-4 text-muted-foreground" />}
                >
                    <div className="text-2xl font-bold text-red-600">
                        {favoriteCount}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {((favoriteCount / summary.totalHeroes) * 100)} % del total
                    </p>
                </HeroStatCard>


                {/* Tarjeta que muestra el héroe más fuerte */}
                <HeroStatCard
                    cardTitle='Fuerza'
                    icon={<Zap className="h-4 w-4 text-muted-foreground" />}
                >
                    <div className="text-lg font-bold">
                        {summary?.strongestHero.alias}
                    </div>
                    <p className="text-xs text-muted-foreground">Strength: {summary?.strongestHero.strength}/10</p>
                </HeroStatCard>

                {/* Tarjeta que muestra el héroe más inteligente */}
                <HeroStatCard
                    cardTitle='inteligencia'
                    icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
                >
                    <div className="text-lg font-bold">

                        {summary?.smartestHero.alias}
                    </div>
                    <p className="text-xs text-muted-foreground">Intelligence: {summary?.smartestHero.intelligence}/10</p>
                </HeroStatCard>


            </div>
        </>
    )
}
