"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ErrorsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorsService = exports.HttpError = void 0;
const common_1 = require("@nestjs/common");
class HttpError {
}
exports.HttpError = HttpError;
let ErrorsService = ErrorsService_1 = class ErrorsService {
    constructor() {
        this.logger = new common_1.Logger(ErrorsService_1.name);
    }
    throwInvalidInputError(message) {
        throw new common_1.HttpException({
            success: false,
            error: `Invalid input format. ${message}`,
        }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
    }
    throwInvalidSizeError() {
        throw new common_1.HttpException({
            success: false,
            error: `Invalid sheet size. Too small for producing at least one box`,
        }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
    }
};
ErrorsService = ErrorsService_1 = __decorate([
    (0, common_1.Injectable)()
], ErrorsService);
exports.ErrorsService = ErrorsService;
//# sourceMappingURL=errors.service.js.map