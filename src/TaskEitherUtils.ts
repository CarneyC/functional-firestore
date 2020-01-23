import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';

// fromThunk :: Task -> TaskEither
export const fromTask: <A>(thunk: T.Task<A>) => TE.TaskEither<Error, A> = (
  task
) => TE.tryCatch(task, E.toError);
