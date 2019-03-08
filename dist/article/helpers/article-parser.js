"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readability = require("readability-node");
const jsdom_1 = require("jsdom");
const metascraper = require('metascraper')([
    require('metascraper-image')(),
    require('metascraper-logo')(),
    require('metascraper-clearbit-logo')(),
]);
const Readability = readability.Readability;
exports.parseHTML = (url) => __awaiter(this, void 0, void 0, function* () {
    const parsed = yield jsdom_1.JSDOM.fromURL(url, {})
        .then(dom => {
        const loc = dom.window.location;
        const uri = {
            spec: loc.href,
            host: loc.host,
            prePath: loc.protocol + '//' + loc.host,
            scheme: loc.protocol.substr(0, loc.protocol.indexOf(':')),
            pathBase: loc.protocol +
                '//' +
                loc.host +
                loc.pathname.substr(0, loc.pathname.lastIndexOf('/') + 1),
        };
        return { uri, dom };
    })
        .then((payload) => __awaiter(this, void 0, void 0, function* () {
        return new Readability(payload.uri, payload.dom.window.document).parse();
        return parsed;
    }));
    const metadata = yield metascraper({
        html: parsed.content,
        url,
    });
    return {
        HTML: parsed && parsed.content,
        metadata: Object.assign({}, metadata, { byline: parsed && parsed.byline, excerpt: parsed && parsed.excerpt, title: parsed && parsed.title, length: parsed && parsed.length }),
    };
});
//# sourceMappingURL=article-parser.js.map