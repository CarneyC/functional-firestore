import chai from 'chai';
import fc from 'fast-check';
import { isModel } from '../../src';
import * as Arb from './arbitraries';
const { expect } = chai;

describe('Firestore', function() {
  describe('#isModel()', function() {
    it('should return true if given a Model object', function() {
      fc.assert(
        fc.property(Arb.model(), (model) => {
          const result = isModel(model);
          expect(result).to.be.true;
        })
      );
    });

    it('should return false if given an invalid object', function() {
      fc.assert(
        fc.property(Arb.nonModelObject(), (object: unknown) => {
          const result = isModel(object);
          expect(result).to.be.false;
        })
      );
    });

    it('should return false if given a path object with nil values', function() {
      const object = {
        id: undefined,
        created_at: null,
        updated_at: null,
      };
      const result = isModel(object);
      expect(result).to.be.false;
    });
  });
});
