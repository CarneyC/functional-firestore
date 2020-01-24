import { Firestore } from '@google-cloud/firestore';

/**
 * @internal
 * @type {FirebaseFirestore.Firestore}
 */
const firestore = new Firestore({
  projectId: 'gcloud-project',
});

/**
 * ```haskell
 * getFirestore :: () -> Firestore
 * ```
 */
export const getFirestore: () => Firestore = () => firestore;

/**
 * ```haskell
 * clearFirestore :: () -> Promise
 * ```
 */
export const clearFirestore: () => Promise<void> = () => Promise.resolve();

/**
 * ```haskell
 * clearFirebase :: () -> Promise
 * ```
 */
export const clearEmulator: () => Promise<void> = () => Promise.resolve();
