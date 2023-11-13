(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PLAYERS = exports.PLAYER_COLORS = void 0;
    exports.PLAYER_COLORS = [
        {
            name: 'red',
            hex: '#d80000'
        },
        {
            name: 'blue',
            hex: '#201cff'
        },
        {
            name: 'green',
            hex: '#19d400'
        },
        {
            name: 'yellow',
            hex: '#fff831'
        }
    ];
    exports.PLAYERS = [
        {
            userId: 1,
            color: 'red',
            active: true,
            figures: [
                {
                    position: 0,
                    config: {
                        stepOutPosition: 1,
                        positionType: 'IN_HOUSE'
                    }
                },
                {
                    position: 0,
                    config: {
                        stepOutPosition: 1,
                        positionType: 'IN_HOUSE'
                    }
                },
                {
                    position: 0,
                    config: {
                        stepOutPosition: 1,
                        positionType: 'IN_HOUSE'
                    }
                },
                {
                    position: 0,
                    config: {
                        stepOutPosition: 1,
                        positionType: 'IN_HOUSE'
                    }
                }
            ]
        },
        {
            userId: 2,
            color: 'blue',
            active: false,
            figures: [
                {
                    position: 0,
                    config: {
                        stepOutPosition: 5,
                        positionType: 'IN_HOUSE'
                    }
                },
                {
                    position: 0,
                    config: {
                        stepOutPosition: 5,
                        positionType: 'IN_HOUSE'
                    }
                },
                {
                    position: 0,
                    config: {
                        stepOutPosition: 5,
                        positionType: 'IN_HOUSE'
                    }
                },
                {
                    position: 0,
                    config: {
                        stepOutPosition: 5,
                        positionType: 'IN_HOUSE'
                    }
                }
            ]
        },
        {
            userId: 3,
            color: 'green',
            active: false,
            figures: [
                {
                    position: 0,
                    config: {
                        stepOutPosition: 9,
                        positionType: 'IN_HOUSE'
                    }
                },
                {
                    position: 0,
                    config: {
                        stepOutPosition: 9,
                        positionType: 'IN_HOUSE'
                    }
                },
                {
                    position: 0,
                    config: {
                        stepOutPosition: 9,
                        positionType: 'IN_HOUSE'
                    }
                },
                {
                    position: 0,
                    config: {
                        stepOutPosition: 9,
                        positionType: 'IN_HOUSE'
                    }
                }
            ]
        },
        {
            userId: 4,
            color: 'yellow',
            active: false,
            figures: [
                {
                    position: 0,
                    config: {
                        stepOutPosition: 13,
                        positionType: 'IN_HOUSE'
                    }
                },
                {
                    position: 0,
                    config: {
                        stepOutPosition: 13,
                        positionType: 'IN_HOUSE'
                    }
                },
                {
                    position: 0,
                    config: {
                        stepOutPosition: 13,
                        positionType: 'IN_HOUSE'
                    }
                },
                {
                    position: 0,
                    config: {
                        stepOutPosition: 13,
                        positionType: 'IN_HOUSE'
                    }
                }
            ]
        }
    ];
});
//# sourceMappingURL=playerConstants.js.map