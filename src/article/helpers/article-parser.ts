import * as readability from 'readability-node';
import { JSDOM } from 'jsdom';
const Readability = readability.Readability;

export const parseHTML = async (url: string) => {
  return await JSDOM.fromURL(url, {}).then(dom => {
    const loc = dom.window.location;
    const uri = {
      spec: loc.href,
      host: loc.host,
      prePath: loc.protocol + '//' + loc.host,
      scheme: loc.protocol.substr(0, loc.protocol.indexOf(':')),
      pathBase:
        loc.protocol +
        '//' +
        loc.host +
        loc.pathname.substr(0, loc.pathname.lastIndexOf('/') + 1),
    };
    return new Readability(uri, dom.window.document).parse();
  });
};
