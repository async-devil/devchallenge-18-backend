"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
const Commands_1 = require("../Commands/Commands");
class Box {
    constructor(cutBoxDto) {
        this.data = cutBoxDto;
    }
    getBox2DValues(rotate = false) {
        const width = 2 * (this.data.boxSize.w + this.data.boxSize.h);
        const height = this.data.boxSize.w + this.data.boxSize.d;
        return { w: rotate ? height : width, h: rotate ? width : height };
    }
    checkIfBoxFits() {
        const normalBoxValues = this.getBox2DValues();
        const normalBoxFits = normalBoxValues.w <= this.data.sheetSize.w && normalBoxValues.h <= this.data.sheetSize.l;
        const rotatedBoxValues = this.getBox2DValues(true);
        const rotatedBoxFits = rotatedBoxValues.w <= this.data.sheetSize.w && rotatedBoxValues.h <= this.data.sheetSize.l;
        return normalBoxFits || rotatedBoxFits;
    }
    cutHalfWidthStartingFromBottom(commands, currPos, halfWidth, reverse = false) {
        if (!reverse) {
            Commands_1.Commands.goto(commands, this.move(currPos, currPos.x, currPos.y + halfWidth));
            Commands_1.Commands.up(commands);
            Commands_1.Commands.goto(commands, this.move(currPos, currPos.x, currPos.y - halfWidth));
            Commands_1.Commands.down(commands);
        }
        else {
            Commands_1.Commands.goto(commands, this.move(currPos, currPos.x, currPos.y - halfWidth));
            Commands_1.Commands.up(commands);
            Commands_1.Commands.goto(commands, this.move(currPos, currPos.x, currPos.y + halfWidth));
            Commands_1.Commands.down(commands);
        }
    }
    cutHalfWidthStartingFromRight(commands, currPos, halfWidth, reverse = false) {
        if (!reverse) {
            Commands_1.Commands.goto(commands, this.move(currPos, currPos.x - halfWidth, currPos.y));
            Commands_1.Commands.up(commands);
            Commands_1.Commands.goto(commands, this.move(currPos, currPos.x + halfWidth, currPos.y));
            Commands_1.Commands.down(commands);
        }
        else {
            Commands_1.Commands.goto(commands, this.move(currPos, currPos.x + halfWidth, currPos.y));
            Commands_1.Commands.up(commands);
            Commands_1.Commands.goto(commands, this.move(currPos, currPos.x - halfWidth, currPos.y));
            Commands_1.Commands.down(commands);
        }
    }
    move(currPos, x, y) {
        const position = { x, y };
        currPos.x = position.x;
        currPos.y = position.y;
        return position;
    }
    cutNormalBoxFromCoordinates(startCoord) {
        const { w, h, d } = this.data.boxSize;
        const currPos = { x: startCoord.x, y: startCoord.y };
        const halfWidth = w / 2;
        const commands = [];
        Commands_1.Commands.up(commands);
        Commands_1.Commands.goto(commands, startCoord);
        Commands_1.Commands.down(commands);
        for (let i = 0; i < 2; i++) {
            Commands_1.Commands.goto(commands, this.move(currPos, currPos.x + w, currPos.y));
            this.cutHalfWidthStartingFromBottom(commands, currPos, halfWidth);
            Commands_1.Commands.goto(commands, this.move(currPos, currPos.x + h, currPos.y));
            this.cutHalfWidthStartingFromBottom(commands, currPos, halfWidth);
        }
        Commands_1.Commands.goto(commands, this.move(currPos, currPos.x, currPos.y + w + d));
        for (let i = 0; i < 2; i++) {
            Commands_1.Commands.goto(commands, this.move(currPos, currPos.x - h, currPos.y));
            this.cutHalfWidthStartingFromBottom(commands, currPos, halfWidth, true);
            Commands_1.Commands.goto(commands, this.move(currPos, currPos.x - w, currPos.y));
            this.cutHalfWidthStartingFromBottom(commands, currPos, halfWidth, true);
        }
        Commands_1.Commands.goto(commands, this.move(currPos, currPos.x, currPos.y - w - d));
        return commands;
    }
    cutRotatedBoxFromCoordinates(startCoord) {
        const { w, h, d } = this.data.boxSize;
        const currPos = { x: startCoord.x, y: startCoord.y };
        const halfWidth = w / 2;
        const commands = [];
        Commands_1.Commands.up(commands);
        Commands_1.Commands.goto(commands, startCoord);
        Commands_1.Commands.down(commands);
        Commands_1.Commands.goto(commands, this.move(currPos, currPos.x + w + d, currPos.y));
        for (let i = 0; i < 2; i++) {
            Commands_1.Commands.goto(commands, this.move(currPos, currPos.x, currPos.y + w));
            this.cutHalfWidthStartingFromRight(commands, currPos, halfWidth);
            Commands_1.Commands.goto(commands, this.move(currPos, currPos.x, currPos.y + h));
            this.cutHalfWidthStartingFromRight(commands, currPos, halfWidth);
        }
        Commands_1.Commands.goto(commands, this.move(currPos, currPos.x - w - d, currPos.y));
        for (let i = 0; i < 2; i++) {
            Commands_1.Commands.goto(commands, this.move(currPos, currPos.x, currPos.y - h));
            this.cutHalfWidthStartingFromRight(commands, currPos, halfWidth, true);
            Commands_1.Commands.goto(commands, this.move(currPos, currPos.x, currPos.y - w));
            this.cutHalfWidthStartingFromRight(commands, currPos, halfWidth, true);
        }
        return commands;
    }
}
exports.Box = Box;
//# sourceMappingURL=Box.js.map