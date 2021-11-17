import { Command } from "../Commands/Commands";
import { CutBoxDto } from "../dto/CutBox.dto";
export declare class Box {
    readonly data: CutBoxDto;
    constructor(cutBoxDto: CutBoxDto);
    getBox2DValues(rotate?: boolean): {
        w: number;
        h: number;
    };
    checkIfBoxFits(): boolean;
    private cutHalfWidthStartingFromBottom;
    private cutHalfWidthStartingFromRight;
    private move;
    cutNormalBoxFromCoordinates(startCoord: {
        x: number;
        y: number;
    }): Command[];
    cutRotatedBoxFromCoordinates(startCoord: {
        x: number;
        y: number;
    }): Command[];
}
