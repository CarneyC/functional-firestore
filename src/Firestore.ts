import * as R from 'fp-ts/lib/Reader';
import * as RT from 'fp-ts/lib/ReaderTask';
import * as RTE from 'fp-ts/lib/ReaderTaskEither';
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';
import * as TEUtils from './TaskEitherUtils';
import * as E from 'fp-ts/lib/Either';
import { allPass, ifElse, is, pipe, prop, propIs } from 'ramda';
import {
  Firestore,
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
} from '@google-cloud/firestore';

export interface Model {
  id: string;
}

/**
 * ```haskell
 * isModel :: a -> bool
 * ```
 */
export const isModel = (a: unknown): a is Model =>
  allPass([is(Object), propIs(String, 'id')])(a);

/**
 * ```haskell
 * getCollectionFromFirestore :: Firestore -> Reader String Collection
 * ```
 */
export const getCollectionFromFirestore: (
  firestore: Firestore
) => R.Reader<string, CollectionReference> = (firestore) => (
  table: string
): CollectionReference => firestore.collection(table);

/**
 * ```haskell
 * getDocumentFromCollection :: Collection -> Reader Model Document
 * ```
 */
export const getDocumentFromCollection: (
  collection: CollectionReference
) => R.Reader<Model, DocumentReference> = (collection) => (
  model: Model
): DocumentReference => collection.doc(model.id);

/**
 * @internal
 * ```haskell
 * storeModelToDocumentTask :: Document -> Reader Model (Task Model)
 * ```
 */
const storeModelToDocumentTask: (
  document: DocumentReference
) => RT.ReaderTask<Model, Model> = (document) => (
  model: Model
) => async (): Promise<Model> => {
  await document.set(model);
  return model;
};

/**
 * ```haskell
 * storeModelToDocument :: Document -> ReaderTaskEither Model Model Error
 * ```
 */
export const storeModelToDocument: (
  document: DocumentReference
) => RTE.ReaderTaskEither<Model, Error, Model> = pipe(
  storeModelToDocumentTask,
  R.map(TEUtils.fromTask)
);

/**
 * ```haskell
 * storeModelToCollection :: Collection -> String -> ReaderTaskEither Model Model Error
 * ```
 */
export const storeModelToCollection: (
  collection: CollectionReference
) => RTE.ReaderTaskEither<Model, Error, Model> = pipe(
  getDocumentFromCollection,
  R.chain(storeModelToDocument)
);

/**
 * ```haskell
 * storeModelToFirestore :: Firestore -> Reader String (ReaderTaskEither Model Model Error)
 * ```
 */
export const storeModelToFirestore: (
  firestore: Firestore
) => R.Reader<string, RTE.ReaderTaskEither<Model, Error, Model>> = pipe(
  getCollectionFromFirestore,
  R.map(storeModelToCollection)
);

/**
 * ```haskell
 * storeModelToFirestoreWith :: Firestore -> Reader String (ReaderTaskEither (() -> Model) Model Error)
 * ```
 */
export const storeModelToFirestoreWith: <A>(
  firestore: Firestore
) => R.Reader<
  string,
  R.Reader<(a: A) => Model, RTE.ReaderTaskEither<A, Error, Model>>
> = <A>(firestore) => (table) => (
  fn: (a: A) => Model
): RTE.ReaderTaskEither<A, Error, Model> =>
  pipe(fn, storeModelToFirestore(firestore)(table));

/**
 * ```haskell
 * getSnapshotFromDocumentTask :: Document -> Task Snapshot
 * ```
 */
export const getSnapshotFromDocumentTask: (
  document: DocumentReference
) => T.Task<DocumentSnapshot> = (document) => (): Promise<DocumentSnapshot> =>
  document.get();

/**
 * ```haskell
 * getSnapshotFromDocument :: Document -> TaskEither Snapshot Error
 * ```
 */
export const getSnapshotFromDocument: (
  document: DocumentReference
) => TE.TaskEither<Error, DocumentSnapshot> = pipe(
  getSnapshotFromDocumentTask,
  TEUtils.fromTask
);

/**
 * @internal
 * ```haskell
 * getSnapshotFromCollection :: Collection -> ReaderTaskEither Model Snapshot Error
 * ```
 */
const getSnapshotFromCollection: (
  collection: CollectionReference
) => RTE.ReaderTaskEither<Model, Error, DocumentSnapshot> = pipe(
  getDocumentFromCollection,
  R.map(getSnapshotFromDocument)
);

/**
 * @internal
 * ```haskell
 * getDataFromSnapshot :: Snapshot -> a
 * ```
 */
const getDataFromSnapshot: (snapshot: DocumentSnapshot) => unknown = (
  snapshot
) => snapshot.data();

/**
 * ```haskell
 * validateSnapshotExistence :: snapshot -> Either a Error
 * ```
 */
export const validateSnapshotExistence: (
  snapshot: DocumentSnapshot
) => E.Either<Error, DocumentSnapshot> = ifElse(prop('exists'), E.right, () =>
  E.left(new Error('Item does not exist.'))
);

/**
 * ```haskell
 * validateModel :: a -> Either Model Error
 * ```
 */
export const validateModel: (
  a: unknown
) => E.Either<Error, Model> = ifElse(isModel, E.right, () =>
  E.left(new Error('Item is not a valid model.'))
);

/**
 * ```haskell
 * getModelFromSnapshot :: Snapshot -> Either Model Error
 * ```
 */
const getModelFromSnapshot: (
  snapshot: DocumentSnapshot
) => E.Either<Error, Model> = pipe(
  validateSnapshotExistence,
  E.map(getDataFromSnapshot),
  E.chain(validateModel)
);

/**
 * ```haskell
 * getModelFromCollection :: Collection -> ReaderTaskEither Model Model Error
 * ```
 */
export const getModelFromCollection: (
  collection: CollectionReference
) => RTE.ReaderTaskEither<Model, Error, Model> = pipe(
  getSnapshotFromCollection,
  RTE.chainEitherK(getModelFromSnapshot)
);

/**
 * ```haskell
 * getModelFromFirestore :: Firestore -> Reader String (ReaderTaskEither Model Model Error)
 * ```
 */
export const getModelFromFirestore: (
  firestore: Firestore
) => R.Reader<string, RTE.ReaderTaskEither<Model, Error, Model>> = pipe(
  getCollectionFromFirestore,
  R.map(getModelFromCollection)
);

/**
 * ```haskell
 * listCollectionsInFirestore :: Firestore -> Task [Collection]
 * ```
 */
export const listCollectionsInFirestore: (
  firestore: Firestore
) => T.Task<CollectionReference[]> = (firestore) => (): Promise<
  CollectionReference[]
> => firestore.listCollections();
