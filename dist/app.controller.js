"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const cutter_service_1 = require("./cutter/cutter.service");
const CutBox_dto_1 = require("./dto/CutBox.dto");
const validation_service_1 = require("./validation/validation.service");
let AppController = class AppController {
    constructor(validationService, cutterService) {
        this.validationService = validationService;
        this.cutterService = cutterService;
    }
    cutBox(boxDto) {
        this.validationService.checkIfCutBoxDtoValid(boxDto);
        this.validationService.checkIfBoxFits(boxDto);
        return this.cutterService.getCutCommandsAndAmmount(boxDto);
    }
};
__decorate([
    (0, common_1.Post)("/simple_box"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CutBox_dto_1.CutBoxDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "cutBox", null);
AppController = __decorate([
    (0, common_1.Controller)("api"),
    __metadata("design:paramtypes", [validation_service_1.ValidationService,
        cutter_service_1.CutterService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map