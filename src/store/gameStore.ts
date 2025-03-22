import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import arrayShuffle from "array-shuffle";
import { initialTiles } from "./tiles";
import { State, Action } from "./gameState";

export const useGameStore = create<State & Action>()(
  persist(
    devtools((set, get) => ({
      currentRevealedTile: { id: null, gameId: null },
      prevRevealedTile: { id: null, gameId: null },
      matchedPairs: [],
      attempts: 0,
      timeDuration: 0,

      difficulty: "easy",
      tiles: initialTiles,
      shuffledTiles: [],
      isGameLaunched: false,
      endGame: true,
      isComparing: false,
      statistics: [],

      setEndGame: (value) => set(() => ({ endGame: value })),
      toggleLaunch: (launch) => set(() => ({ isGameLaunched: launch })),
      setDifficulty: (userChoice) => set(() => ({ difficulty: userChoice })),
      addTiles: (tiles) =>
        set((state) => {
          const newTiles = [...state.tiles, ...tiles];
          return { tiles: newTiles };
        }),
      setprevRevealedTile: () =>
        set((state) => ({ prevRevealedTile: state.currentRevealedTile })),
      setcurrentRevealedTile: (tile) =>
        set(() => ({
          currentRevealedTile: { id: tile.id, gameId: tile.gameId },
        })),
      setIsComparing: (isComparing) => set({ isComparing }),
      setAttempts: (value) => set(() => ({ attempts: value })),
      resetTime: () => set({ timeDuration: 0 }),
      setStatistics: (attempt) =>
        set((state) => ({ statistics: [...state.statistics, attempt] })),
      setTime: () => {
        const { timeDuration } = get();
        set({ timeDuration: timeDuration + 1 });
      },
      resetGame: () =>
        set(() => ({
          prevRevealedTile: { id: null, gameId: null },
          currentRevealedTile: { id: null, gameId: null },
          attempts: 0,
          endGame: false,
          isComparing: false,
          isGameLaunched: false,
          shuffledTiles: [],
          timeDuration: 0,
        })),

      toggleReveal: (tileId) =>
        set((state) => {
          const tile = state.shuffledTiles.find((tile) => tile.id === tileId);

          if (!tile) return state;

          return {
            ...state,
            shuffledTiles: state.shuffledTiles.map((tile) =>
              tile.id === tileId
                ? { ...tile, isRevealed: !tile.isRevealed }
                : tile
            ),
          };
        }),

      toggleMatching: (id) =>
        set((state) => {
          const updatedTiles = state.shuffledTiles.map((tile) => {
            if (tile.gameId === id) {
              return { ...tile, isMatched: true };
            }
            return tile;
          });
          const matchedTile = state.shuffledTiles.find(
            (tile) => tile.gameId === id
          );
          const updatedMatchedPairs = matchedTile
            ? [...state.matchedPairs, matchedTile]
            : state.matchedPairs;

          return {
            ...state,
            shuffledTiles: updatedTiles,
            matchedPairs: updatedMatchedPairs,
          };
        }),

      replaceMatchedImages: (newImage: string) =>
        set((state) => {
          const updatedTiles = state.shuffledTiles.map((tile) => {
            if (tile.isMatched) {
              return { ...tile, image: newImage };
            }
            return tile;
          });

          return { ...state, shuffledTiles: updatedTiles };
        }),

      setShuffledTiles: (pairCount) =>
        set((state) => {
          const allTiles = state.tiles;
          const userTiles = allTiles.filter((tile) => tile.isUserAdded);
          const defaultTiles = allTiles.filter((tile) => !tile.isUserAdded);
          const userPairs = [];
          const usedIds = new Set();

          for (const tile of userTiles) {
            if (!usedIds.has(tile.gameId)) {
              const pair = userTiles.filter((t) => t.gameId === tile.gameId);
              if (pair.length === 2) {
                userPairs.push(...pair);
                usedIds.add(tile.gameId);
              }
            }
          }

          const missingPairs = pairCount - userPairs.length / 2;

          const defaultPairs = [];
          if (missingPairs > 0) {
            const shuffledDefaults = arrayShuffle(defaultTiles);
            const addedDefaultIds = new Set();

            for (const tile of shuffledDefaults) {
              if (!addedDefaultIds.has(tile.gameId)) {
                const pair = shuffledDefaults.filter(
                  (t) => t.gameId === tile.gameId
                );
                if (pair.length === 2) {
                  defaultPairs.push(...pair);
                  addedDefaultIds.add(tile.gameId);
                }
              }
              if (defaultPairs.length / 2 >= missingPairs) break;
            }
          }

          const finalTiles = arrayShuffle([...userPairs, ...defaultPairs]);

          return { shuffledTiles: finalTiles };
        }),
    })),
    {
      name: "game-store",
      partialize: (state) => ({ statistics: state.statistics }),
    }
  )
);
