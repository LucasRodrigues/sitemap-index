import SitemapValidatorFactory from './sitemapValidatorFactory';

export default class SitemapValidator {

  static validate(item) {
    const validators = SitemapValidatorFactory.get();
    const result = {
      status: true
    };

    validators.forEach(validator => {
      const validatorResult = validator.validate(item);

      if (!validatorResult.status) {
        result.status = false;
        result.messages = result.messages || [];
        result.messages.concat(validatorResult.messages);
      }
    });

    return result;
  }
}
