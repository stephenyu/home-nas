"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const express_1 = __importDefault(require("express"));
const ReactDOMServer = __importStar(require("react-dom/server"));
const homepage_1 = require("pages/homepage");
const file_system_1 = require("services/file_system");
const app = express_1.default();
const port = 8080; // default port to listen
const flavor = process.env.FLAVOR;
app.use(express_1.default.static(path.join(__dirname, 'public')));
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileSystem = (flavor === "production")
        ? new file_system_1.LinuxFileSystem()
        : new file_system_1.FakeFileSystem();
    const Page = yield homepage_1.HomePage(fileSystem);
    res.send(ReactDOMServer.renderToStaticMarkup(Page));
}));
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
