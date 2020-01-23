import * as R from 'fp-ts/lib/Reader';
import * as RTE from 'fp-ts/lib/ReaderTaskEither';
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import {
  Firestore,
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
} from '@google-cloud/firestore';
export interface Model {
  id: string;
}
export interface Table {
  name: string;
}
export declare const isModel: (a: unknown) => a is Model;
export declare const getCollectionFromFirestore: (
  firestore: Firestore
) => R.Reader<Table, CollectionReference>;
export declare const getDocumentFromCollection: (
  collection: CollectionReference
) => R.Reader<Model, DocumentReference>;
export declare const storeModelToCollection: (
  collection: CollectionReference
) => RTE.ReaderTaskEither<Model, Error, Model>;
export declare const storeModelToFirestore: (
  firestore: Firestore
) => R.Reader<Table, RTE.ReaderTaskEither<Model, Error, Model>>;
export declare const storeModelToFirestoreWith: <A>(
  firestore: Firestore
) => R.Reader<
  Table,
  R.Reader<(a: A) => Model, RTE.ReaderTaskEither<A, Error, Model>>
>;
export declare const getSnapshotFromDocumentTask: (
  document: DocumentReference
) => T.Task<DocumentSnapshot>;
export declare const getSnapshotFromDocument: (
  document: DocumentReference
) => TE.TaskEither<Error, DocumentSnapshot>;
export declare const validateSnapshotExistence: (
  snapshot: DocumentSnapshot
) => E.Either<Error, DocumentSnapshot>;
export declare const validateModel: (a: unknown) => E.Either<Error, Model>;
export declare const getModelFromCollection: (
  collection: CollectionReference
) => RTE.ReaderTaskEither<Model, Error, Model>;
export declare const getModelFromFirestore: (
  firestore: Firestore
) => R.Reader<Table, RTE.ReaderTaskEither<Model, Error, Model>>;
export declare const listCollectionsInFirestore: (
  firestore: Firestore
) => T.Task<CollectionReference[]>;
