import { CutterService } from "./cutter/cutter.service";
import { CutBoxDto } from "./dto/CutBox.dto";
import { ValidationService } from "./validation/validation.service";
export declare class AppController {
    private readonly validationService;
    private readonly cutterService;
    constructor(validationService: ValidationService, cutterService: CutterService);
    cutBox(boxDto: CutBoxDto): {
        success: boolean;
        amount: number;
        program: import("./Commands/Commands").Command[];
    };
}
