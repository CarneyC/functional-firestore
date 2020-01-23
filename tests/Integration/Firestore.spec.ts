import chai from 'chai';
import fc from 'fast-check';
import {
  getCollectionFromFirestore,
  getModelFromFirestore,
  Model,
  storeModelToFirestore,
  Table,
} from '../../src';
import { identity, map, pipe, thunkify } from 'ramda';
import * as E from 'fp-ts/lib/Either';
import * as A from 'fp-ts/lib/Array';
import * as T from 'fp-ts/lib/Task';
import * as Arb from '../Unit/arbitraries';
import { clearEmulator, clearFirestore, getFirestore } from './firebase';
import { TaskEither } from 'fp-ts/lib/TaskEither';
import { isLeft, isRight } from 'fp-ts/lib/Either';
import { Firestore } from '@google-cloud/firestore';

const { expect } = chai;

describe('Firestore -> Integration Test', function() {
  this.timeout(10000);

  let firestore: Firestore;

  beforeEach(async function() {
    firestore = getFirestore();
    await clearFirestore();
  });

  afterEach(clearEmulator);

  describe('#getCollectionFromFirestore()', function() {
    it('should run without errors', function() {
      const getCollectionFromTable = getCollectionFromFirestore(firestore);

      fc.assert(
        fc.property(Arb.table(), (table) => {
          const getCollection = thunkify(getCollectionFromTable)(table);
          expect(getCollection).to.not.throw();
        })
      );
    });
  });

  describe('#storeModelToFirestore()', function() {
    let storeModelToTable;

    beforeEach(function() {
      storeModelToTable = storeModelToFirestore(firestore);
    });

    it('should run without errors', function() {
      fc.assert(
        fc.asyncProperty(Arb.table(), Arb.model(), async (table, model) => {
          const store = storeModelToTable(table)(model);
          expect(store).to.not.throw();
        })
      );
    });

    it('should return given model after save', async function() {
      await fc.assert(
        fc.asyncProperty(Arb.table(), Arb.model(), async (table, model) => {
          const result = await storeModelToTable(table)(model)();
          const storedModel = E.getOrElse(identity)(result);

          expect(storedModel).to.deep.equals(model);
        })
      );
    });

    it('should save model to firestore', async function() {
      await fc.assert(
        fc.asyncProperty(
          Arb.table(),
          Arb.model(),
          async (table, sampleModel) => {
            await storeModelToTable(table)(sampleModel)();

            const document = firestore
              .collection(table.name)
              .doc(sampleModel.id);
            const snapshot = await document.get();
            const storedModel = snapshot.data();
            expect(storedModel).to.deep.equals(sampleModel);
          }
        )
      );
    });
  });

  describe('#getModelFromFirestore()', function() {
    let getModelFromTable: (
      table: Table
    ) => (model: Model) => TaskEither<Error, Model>;

    let storeModelToTable: (
      table: Table
    ) => (model: Model) => TaskEither<Error, Model>;

    beforeEach(function() {
      getModelFromTable = getModelFromFirestore(firestore);
      storeModelToTable = storeModelToFirestore(firestore);
    });

    it('should run without errors', function() {
      fc.assert(
        fc.property(Arb.table(), Arb.model(), (table, model) => {
          const getSnapshot = getModelFromTable(table)(model);
          expect(getSnapshot).to.not.throw();
        })
      );
    });

    it('should return "Item is not a valid model." when the queried item is not a model entity', async function() {
      await fc.assert(
        fc.asyncProperty(
          Arb.table(),
          Arb.modelBase(),
          Arb.modelData(),
          async (table, model, randomObject) => {
            await firestore
              .collection(table.name)
              .doc(model.id)
              .set(randomObject);

            const result = await getModelFromTable(table)(model)();
            const errorMessage = isRight(result) || result.left.message;
            expect(errorMessage).to.equal('Item is not a valid model.');
          }
        )
      );
    });

    it('should return "Item does not exist." when the queried item does not exist', async function() {
      await fc.assert(
        fc.asyncProperty(Arb.table(), Arb.models(), async (table, models) => {
          const [missingModel, ...modelsInFirestore] = models;

          const storeModels: (models: Array<Model>) => T.Task<unknown> = pipe(
            map(storeModelToTable(table)),
            A.array.sequence(T.task)
          );
          await storeModels(modelsInFirestore)();

          const result = await getModelFromTable(table)(missingModel)();
          const errorMessage = isRight(result) || result.left.message;
          expect(errorMessage).to.equal('Item does not exist.');
        })
      );
    });

    it('should get existing model from firestore', async function() {
      await fc.assert(
        fc.asyncProperty(
          Arb.table(),
          Arb.model(),
          async (table, sampleModel) => {
            await storeModelToTable(table)(sampleModel)();

            const result = await getModelFromTable(table)(sampleModel)();
            const retrievedModel = isLeft(result) || result.right;
            expect(retrievedModel).to.deep.equal(sampleModel);
          }
        )
      );
    });
  });
});
