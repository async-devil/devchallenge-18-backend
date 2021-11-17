export type SheetSize = {
	w: number;
	l: number;
};

export type BoxSize = {
	w: number;
	d: number;
	h: number;
};

export class CutBoxDto {
	readonly sheetSize: SheetSize;

	readonly boxSize: BoxSize;
}
