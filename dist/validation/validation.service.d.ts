import { CutBoxDto } from "../dto/CutBox.dto";
import { ErrorsService } from "../errors.service";
export declare class ValidationService {
    private readonly errorsServise;
    constructor(errorsServise: ErrorsService);
    private checkIfObject;
    private checkIfValidNumber;
    checkIfCutBoxDtoValid(checkSubject: CutBoxDto): boolean;
    checkIfBoxFits(data: CutBoxDto): boolean;
}
