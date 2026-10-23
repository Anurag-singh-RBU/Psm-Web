export const GLYPHS = {
    X: ['10001', '10001', '01010', '00100', '01010', '10001', '10001'],
    P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
    I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
    R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
    E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
} as const;

export const WORD = ['X', 'P', 'I', 'R', 'E'] as const;

export const CELL = 9;
export const COLS = 5;
export const ROWS = 7;
export const BAR_Y = ROWS * CELL + 6;
export const BAR_H = 5;
export const WIDTH = (WORD.length * COLS + (WORD.length - 1)) * CELL;
export const HEIGHT = BAR_Y + BAR_H;

export const PIXELS = WORD.flatMap((char, letter) =>
    GLYPHS[char].flatMap((row, y) =>
        [...row].flatMap((bit, x) =>
            bit === '1'
                ? [
                    {
                        id: `${letter}-${x}-${y}`,
                        x: (letter * (COLS + 1) + x) * CELL + 0.5,
                        y: y * CELL + 0.5,
                        accent: letter < 2,
                    },
                ]
                : [],
        ),
    ),
);
