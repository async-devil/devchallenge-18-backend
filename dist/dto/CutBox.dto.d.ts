export declare type SheetSize = {
    w: number;
    l: number;
};
export declare type BoxSize = {
    w: number;
    d: number;
    h: number;
};
export declare class CutBoxDto {
    readonly sheetSize: SheetSize;
    readonly boxSize: BoxSize;
}
