import { products } from "@/mocks/products.mock";
import { Button } from "@/components/ui/button";
import { Link, useParams, useSearchParams } from "react-router";

export const ProductPage = () => {
    // Parametro de ruta: /product/:idSlug
    const { idSlug } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedSize = searchParams.get("size") ?? "";
    const selectedColor = searchParams.get("color") ?? "";

    const product = products.find((item) => item.id === idSlug);

    const handleSelectSize = (size: string) => {
        const next = new URLSearchParams(searchParams);
        if (size === selectedSize) {
            next.delete("size");
        } else {
            next.set("size", size);
        }
        setSearchParams(next);
    };

    const handleSelectColor = (color: string) => {
        const next = new URLSearchParams(searchParams);
        if (color === selectedColor) {
            next.delete("color");
        } else {
            next.set("color", color);
        }
        setSearchParams(next);
    };

    if (!product) {
        return (
            <main className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="max-w-xl text-center space-y-4">
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                        Producto no encontrado
                    </h1>
                    <p className="text-muted-foreground text-sm md:text-base">
                        El producto que estás buscando no existe o ya no está disponible.
                    </p>
                    <Button asChild className="mt-2">
                        <Link to="/">
                            Volver a la tienda
                        </Link>
                    </Button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-[70vh] px-4 py-8 md:py-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                {/* Imagen principal */}
                <section className="w-full">
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </section>

                {/* Información del producto */}
                <section className="space-y-6">
                    <div className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            {product.category}
                        </p>
                        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                            {product.name}
                        </h1>
                    </div>

                    <p className="text-base text-muted-foreground leading-relaxed">
                        {product.description}
                    </p>

                    <div className="flex items-center gap-4 pt-2">
                        <p className="text-2xl font-semibold">${product.price}</p>
                        <span className="text-xs text-muted-foreground">
                            IVA incluido
                        </span>
                    </div>

                    {/* Tallas */}
                    <div className="space-y-3">
                        <h2 className="text-sm font-medium tracking-tight uppercase text-muted-foreground">
                            Tallas disponibles
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {product.sizes.map((size) => {
                                const isActive = size === selectedSize;
                                return (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => handleSelectSize(size)}
                                        className={`px-3 py-1.5 text-xs border rounded-full transition-colors ${
                                            isActive
                                                ? "bg-primary text-primary-foreground border-primary"
                                                : "hover:bg-primary hover:text-primary-foreground"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Colores */}
                    <div className="space-y-3">
                        <h2 className="text-sm font-medium tracking-tight uppercase text-muted-foreground">
                            Colores
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {product.colors.map((color) => {
                                const isActive = color === selectedColor;
                                return (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => handleSelectColor(color)}
                                        className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                                            isActive
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted text-foreground hover:bg-primary hover:text-primary-foreground"
                                        }`}
                                    >
                                        {color}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="w-full sm:w-auto">
                            Agregar al carrito
                        </Button>

                        <Button asChild variant="outline" className="w-full sm:w-auto">
                            <Link to="/">
                                Seguir comprando
                            </Link>
                        </Button>
                    </div>
                </section>
            </div>
        </main>
    );
};
