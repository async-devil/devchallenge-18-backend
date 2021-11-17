"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CutterService = void 0;
const common_1 = require("@nestjs/common");
const Box_1 = require("../Box/Box");
const Commands_1 = require("../Commands/Commands");
let CutterService = class CutterService {
    getNumberOfNormalAndRotatedBoxes(cutBoxDto) {
        const box = new Box_1.Box(cutBoxDto);
        const normalBoxLayoutValues = box.getBox2DValues();
        const rotatedBoxLayoutValues = box.getBox2DValues(true);
        const normalBoxesHorizontal = cutBoxDto.sheetSize.w / normalBoxLayoutValues.w;
        const normalBoxesVertical = cutBoxDto.sheetSize.l / normalBoxLayoutValues.h;
        let normalBoxesHorizontalCount = Math.floor(normalBoxesHorizontal);
        let normalBoxesVerticalCount = Math.floor(normalBoxesVertical);
        normalBoxesHorizontalCount = normalBoxesVerticalCount === 0 ? 0 : normalBoxesHorizontalCount;
        normalBoxesVerticalCount = normalBoxesHorizontalCount === 0 ? 0 : normalBoxesVerticalCount;
        let rotatedBoxesHorizontalCount = 0;
        let rotatedBoxesVerticalCount = 0;
        if (normalBoxesHorizontal - normalBoxesHorizontalCount > 0) {
            const normalBoxesWidth = normalBoxLayoutValues.w * normalBoxesHorizontalCount;
            const remainingWidth = cutBoxDto.sheetSize.w - normalBoxesWidth;
            rotatedBoxesHorizontalCount = Math.floor(remainingWidth / rotatedBoxLayoutValues.w);
            rotatedBoxesVerticalCount =
                rotatedBoxesHorizontalCount === 0
                    ? 0
                    : Math.floor(cutBoxDto.sheetSize.l / rotatedBoxLayoutValues.h);
            rotatedBoxesHorizontalCount =
                rotatedBoxesVerticalCount === 0 ? 0 : rotatedBoxesHorizontalCount;
        }
        return {
            amount: normalBoxesHorizontalCount * normalBoxesVerticalCount +
                rotatedBoxesHorizontalCount * rotatedBoxesVerticalCount,
            normalBoxes: {
                horizontal: normalBoxesHorizontalCount,
                vertical: normalBoxesVerticalCount,
            },
            rotatedBoxes: {
                horizontal: rotatedBoxesHorizontalCount,
                vertical: rotatedBoxesVerticalCount,
            },
        };
    }
    getBoxStartPoints(cutBoxDto, normalBoxes, rotatedBoxes) {
        const box = new Box_1.Box(cutBoxDto);
        const normalBoxValues = box.getBox2DValues();
        const rotatedBoxValues = box.getBox2DValues(true);
        const startPoints = [];
        for (let i = 0; i < normalBoxes.vertical; i++) {
            for (let j = 0; j < normalBoxes.horizontal; j++) {
                startPoints.push({ x: j * normalBoxValues.w, y: i * normalBoxValues.h, rotated: false });
            }
        }
        for (let i = 0; i < rotatedBoxes.vertical; i++) {
            for (let j = 0; j < rotatedBoxes.horizontal; j++) {
                startPoints.push({
                    x: normalBoxes.horizontal * normalBoxValues.w + j * rotatedBoxValues.w,
                    y: rotatedBoxValues.h * i,
                    rotated: true,
                });
            }
        }
        return startPoints;
    }
    getCutCommandsAndAmmount(cutBoxDto) {
        const data = this.getNumberOfNormalAndRotatedBoxes(cutBoxDto);
        const startPoints = this.getBoxStartPoints(cutBoxDto, data.normalBoxes, data.rotatedBoxes);
        const box = new Box_1.Box(cutBoxDto);
        const program = [];
        Commands_1.Commands.start(program);
        startPoints.forEach((point) => {
            if (point.rotated) {
                program.push(...box.cutRotatedBoxFromCoordinates({ x: point.x, y: point.y }));
            }
            else {
                program.push(...box.cutNormalBoxFromCoordinates({ x: point.x, y: point.y }));
            }
        });
        Commands_1.Commands.stop(program);
        return { success: true, amount: data.amount, program };
    }
};
CutterService = __decorate([
    (0, common_1.Injectable)()
], CutterService);
exports.CutterService = CutterService;
//# sourceMappingURL=cutter.service.js.map