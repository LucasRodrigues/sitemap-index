import SitemapValidatorFactory from './sitemapValidatorFactory';

export default class SitemapValidator {

  static validate(item) {
    const validators = SitemapValidatorFactory.get();
    const result = {
      status: true,
      messages: []
    };

    validators.forEach(validator => {
      const validatorResult = validator.validate(item);

      if (!validatorResult.status) {
        result.status = false;
        result.messages.push(validatorResult.messages);
      }
    });

    return result;
  }
}
