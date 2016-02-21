import Validator from './validators/validator';
import Generator from './generators/generator';

export default class Orchestrator {

  static do(items) {
    return new Promise((resolve, rejected) => {
      const itemsValidator = Validator.validate(items);

      if (itemsValidator.status) {
        resolve(Generator.generate(items));
      } else {
        rejected(itemsValidator.messages);
      }
    });
  }
}
