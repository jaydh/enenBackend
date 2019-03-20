import * as readability from 'readability-node';
import { JSDOM } from 'jsdom';
import * as he from 'he';

// tslint:disable:no-var-requires
const metascraper = require('metascraper')([
  require('metascraper-image')(),
  require('metascraper-logo')(),
  require('metascraper-clearbit-logo')(),
]);
const Readability = readability.Readability;

export const parseHTML = async (url: string) => {
  console.log(url);
  const parsed = await JSDOM.fromURL(url, {})
    .then(dom => {
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
      return { uri, dom };
    })
    .then(async payload => {
      return new Readability(payload.uri, payload.dom.window.document).parse();

      return parsed;
    });

  const html = parsed && he.decode(parsed.content);
  const metadata = await metascraper({
    html,
    url,
  });
  return {
    HTML: parsed && parsed.content,
    metadata: {
      ...metadata,
      byline: parsed && parsed.byline,
      excerpt: parsed && parsed.excerpt,
      title: parsed && parsed.title,
      length: parsed && parsed.length,
    },
  };
};
