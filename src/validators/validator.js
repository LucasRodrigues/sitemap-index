import SitemapValidator from './sitemapValidator';

export default class Validator {

  static validate(items) {
    let result = {
      status: true,
      messages: []
    };

    items.forEach((item, index) => {
      const itemResult = SitemapValidator.validate(item);

      if (!itemResult.status) {
        result.status = false;
        result.messages.push({
          index: index,
          messages: itemResult.messages
        });
      }
    });

    return result;
  }
}
