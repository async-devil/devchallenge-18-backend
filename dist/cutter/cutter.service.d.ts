import { Command } from "../Commands/Commands";
import { CutBoxDto } from "../dto/CutBox.dto";
export declare class CutterService {
    getNumberOfNormalAndRotatedBoxes(cutBoxDto: CutBoxDto): {
        amount: number;
        normalBoxes: {
            horizontal: number;
            vertical: number;
        };
        rotatedBoxes: {
            horizontal: number;
            vertical: number;
        };
    };
    getBoxStartPoints(cutBoxDto: CutBoxDto, normalBoxes: {
        horizontal: number;
        vertical: number;
    }, rotatedBoxes: {
        horizontal: number;
        vertical: number;
    }): {
        x: number;
        y: number;
        rotated: boolean;
    }[];
    getCutCommandsAndAmmount(cutBoxDto: CutBoxDto): {
        success: boolean;
        amount: number;
        program: Command[];
    };
}
