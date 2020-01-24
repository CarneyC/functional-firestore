import fc, { Arbitrary } from 'fast-check';
import { Model } from './index';

export const id = (): Arbitrary<string> => fc.hexaString(16, 16);

export const nonModelObject = (): Arbitrary<unknown> =>
  fc.anything().filter((object: any) => !object || !object.id);

export const modelBase = (): Arbitrary<Model> =>
  fc.record<Model>({
    id: id(),
  });

export const modelData = (): Arbitrary<object> =>
  fc.object({
    maxDepth: 1,
    key: fc.hexaString(1, 16),
    values: [fc.string(), fc.integer()],
  });

export const model = (): Arbitrary<Model> =>
  fc
    .tuple(modelBase(), modelData())
    .map(([base, content]) => ({ ...base, ...content }));

export const models = (): Arbitrary<Array<Model>> => fc.array(model(), 2, 16);

export const table = (): Arbitrary<string> => id();
