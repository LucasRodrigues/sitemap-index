import objectSizeOf from 'object-sizeof';

export default class SiteMapGenerator {

  static generate(items) {
    const sizeLimitInBytes = 9e+6;
    const sizeLimit = 50000;
    const results = [];
    let urls = '';
    let countUrls = 0;

    items.forEach((item, index) => {
      urls += this._generateSitemap(item);

      const isOnLimitSize = (objectSizeOf(urls) >= sizeLimitInBytes);
      const isOnLimitUrlsLength = (sizeLimit === countUrls);
      const isLastItem = (index === items.length - 1);
      const isCutRule = isOnLimitSize || isLastItem || isOnLimitUrlsLength;
      if (isCutRule) {
        results.push(urls);
        urls = '';
        countUrls = 0;
      }
    });

    return results;
  }

  static _generateSitemap(item) {
    const contentUrl = this._generatLoc(item) +
      this._generateChangeFreq(item) + this._generateLastMod(item) +
      this._generatePriority(item);

    const template = `<sitemap>${contentUrl}</sitemap>`;

    return template;
  }

  static _generateLastMod(item) {
    return item.lastMod ? `<lastmod>${item.lastMod}</lastmod>` : '';
  }

  static _generatLoc(item) {
    return `<loc>${item.loc}</loc>`;
  }
}
