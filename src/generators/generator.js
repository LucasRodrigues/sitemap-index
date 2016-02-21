import SitemapIndexGenerator from './sitemapIndexGenerator';
import SitemapGenerator from './sitemapGenerator';

export default class Generator {
  static generate(items) {
    let urlSets = [];
    const results = SitemapGenerator.generate(items);

    results.forEach(result => {
      urlSets.push(SitemapIndexGenerator.generate(result));
    });

    return urlSets;
  }
}
