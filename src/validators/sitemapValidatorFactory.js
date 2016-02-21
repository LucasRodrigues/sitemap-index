import SitemapLocValidator from './sitemapLocValidator';

export default class UrlValidatorFactory {
  static get() {
    return [
      SitemapLocValidator
    ];
  }
}
