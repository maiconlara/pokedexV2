import { Team, TeamDraft } from "@/types/team";

export const TEAM_SIZE = 6;
export const TEAM_NAME_MAX_LENGTH = 30;
export const DEFAULT_TEAM_NAME = "Meu time";

const DATABASE_NAME = "pokeapp";
const DATABASE_VERSION = 1;
const TEAM_STORE = "teams";

let databasePromise: Promise<IDBDatabase> | null = null;

const openDatabase = () => {
  if (databasePromise) return databasePromise;

  databasePromise = new Promise<IDBDatabase>((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB is not available in this browser."));
      return;
    }

    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

    request.onupgradeneeded = () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(TEAM_STORE)) {
        database.createObjectStore(TEAM_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => {
      const database = request.result;

      database.onversionchange = () => {
        database.close();
        databasePromise = null;
      };

      resolve(database);
    };

    request.onerror = () => {
      databasePromise = null;
      reject(request.error);
    };
  });

  return databasePromise;
};

/**
 * Runs a single request against the teams store and waits for the
 * transaction to commit, so writes are durable before the promise resolves.
 *
 * @param mode - Transaction mode.
 * @param operation - Builds the request from the teams store.
 * @returns The request result.
 */
const runTransaction = async <T>(
  mode: IDBTransactionMode,
  operation: (store: IDBObjectStore) => IDBRequest<T>
) => {
  const database = await openDatabase();

  return new Promise<T>((resolve, reject) => {
    const transaction = database.transaction(TEAM_STORE, mode);
    const request = operation(transaction.objectStore(TEAM_STORE));

    transaction.oncomplete = () => resolve(request.result);
    transaction.onerror = () => reject(transaction.error ?? request.error);
    transaction.onabort = () => reject(transaction.error);
  });
};

const sanitizeDraft = (draft: TeamDraft): TeamDraft => ({
  name:
    draft.name.trim().slice(0, TEAM_NAME_MAX_LENGTH) || DEFAULT_TEAM_NAME,
  pokemonIds: draft.pokemonIds.slice(0, TEAM_SIZE),
});

export const listTeams = async () => {
  const teams = await runTransaction<Team[]>("readonly", (store) =>
    store.getAll()
  );

  return teams.sort((a, b) => b.updatedAt - a.updatedAt);
};

export const getTeam = async (id: number) => {
  const team = await runTransaction<Team | undefined>("readonly", (store) =>
    store.get(id)
  );

  return team ?? null;
};

export const createTeam = async (draft: TeamDraft) => {
  const now = Date.now();
  const id = await runTransaction("readwrite", (store) =>
    store.add({ ...sanitizeDraft(draft), createdAt: now, updatedAt: now })
  );

  return Number(id);
};

export const updateTeam = (team: Team) =>
  runTransaction("readwrite", (store) =>
    store.put({ ...team, ...sanitizeDraft(team), updatedAt: Date.now() })
  );

export const deleteTeam = (id: number) =>
  runTransaction("readwrite", (store) => store.delete(id));
