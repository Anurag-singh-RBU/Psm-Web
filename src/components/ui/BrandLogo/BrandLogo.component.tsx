import { WIDTH, HEIGHT, PIXELS } from "./Brandlogo.constants";

export function BrandLogo() {
    return (
        <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            aria-hidden="true"
            focusable="false"
            className="h-auto w-40 overflow-visible sm:w-44">
            {PIXELS.map((pixel) => (
                <rect
                    key={pixel.id}
                    x={pixel.x}
                    y={pixel.y}
                    width={6}
                    height={6}
                    rx={1.2}
                    className={pixel.accent ? 'fill-primary/80' : 'fill-destructive/70'}
                />
            ))}
        </svg>
    );
}
