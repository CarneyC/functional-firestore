import { Firestore } from '@google-cloud/firestore';

/**
 * @internal
 * @type {FirebaseFirestore.Firestore}
 */
const firestore = new Firestore({
  projectId: 'gcloud-project',
});

/**
 * ```
 * getFirestore :: () -> Firestore
 * ```
 */
export const getFirestore: () => Firestore = () => firestore;

/**
 * ```
 * clearFirestore :: () -> Promise
 * ```
 */
export const clearFirestore: () => Promise<void> = () => Promise.resolve();

/**
 * ```
 * clearFirebase :: () -> Promise
 * ```
 */
export const clearEmulator: () => Promise<void> = () => Promise.resolve();
