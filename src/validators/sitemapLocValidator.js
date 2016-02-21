import validUrl from 'valid-url';

export default class SitemapUrlLocValidator {

  static validate(item) {
    let result = {
      status: true
    };
    const requiredResult = this._required(item.loc);

    if (requiredResult.status) {
      const rules = [this._validateLength,
        this._isWebUri];

      rules.forEach(rule => {
        const ruleResult = rule(item.loc);

        if (!ruleResult.status) {
          result.status = false;
          result.messages = result.messages || [];
          result.messages.push(ruleResult.message);
        }
      });
    } else {
      result.status = false;
      result.messages = [requiredResult.message];
    }

    return result;
  }

  static _required(loc) {
    return loc ?
      {
        status: true
      } :
      {
        status: false,
        message: 'Loc is not defined, this property is required'
      };
  }

  static _isWebUri(loc) {
    let result = {
      status: true
    };

    if (!validUrl.isWebUri(loc)) {
      result.status = false;
      result.message = `Loc value ${loc} is not a valid web uri`;
    }

    return result;
  }

  static _validateLength(loc) {
    const sizeLimit = 2048;
    const rule = loc.length <= sizeLimit;

    return rule ?
      {
        status: true,
        message: ''
      } :
      {
        status: false,
        message: `Loc size limit is ${sizeLimit}`
      };
  }
}
