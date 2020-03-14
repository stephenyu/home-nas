"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
exports.PercentageBar = ({ used, total, content }) => {
    const percentage = Math.floor((used / total) * 100);
    const style = { width: `${percentage}%` };
    const className = ["percentageBarInner"];
    if (percentage < 20) {
        className.push("usageOne");
    }
    else if (percentage < 40) {
        className.push("usageTwo");
    }
    else if (percentage < 60) {
        className.push("usageThree");
    }
    else if (percentage < 80) {
        className.push("usageFour");
    }
    else {
        className.push("usageFive");
    }
    return (React.createElement("div", { className: "percentageBar" },
        React.createElement("div", { className: className.join(" "), style: style },
            React.createElement("span", null, content))));
};
