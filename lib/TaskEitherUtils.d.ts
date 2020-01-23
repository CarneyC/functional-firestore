import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';
export declare const fromTask: <A>(thunk: T.Task<A>) => TE.TaskEither<Error, A>;
