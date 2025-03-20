import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import arrayShuffle from "array-shuffle";
import { initialTiles } from "./tiles";
import { State } from "./gameState";
import { Action } from "./ActionType";

export interface Attempt {
  id: number;
  timeDuration: number;
  numOfAttempts: number;
  date: string;
}

export interface Statistic {
  attempt: Attempt;
}

export const useGameStore = create<State & Action>()(
  persist(
    devtools((set, get) => ({
      difficulty: "easy",
      tiles: initialTiles,
      shuffledTiles: [],
      isGameLaunched: false,
      endGame: true,
      currentTile: { id: null, gameId: null },
      prevTile: { id: null, gameId: null },
      isComparing: false,
      attempts: 0,
      timeDuration: 0,
      statistics: [],

      setEndGame: (value) => set(() => ({ endGame: value })),
      toggleLaunch: (launch) => set(() => ({ isGameLaunched: launch })),
      setDifficulty: (userChoice) => set(() => ({ difficulty: userChoice })),
      addTiles: (tiles) =>
        set((state) => {
          const newTiles = [...state.tiles.slice(2), ...tiles];
          return { tiles: newTiles };
        }),
      setPrevTile: () => set((state) => ({ prevTile: state.currentTile })),
      setCurrentTile: (tile) =>
        set(() => ({ currentTile: { id: tile.id, gameId: tile.gameId } })),
      setIsComparing: (isComparing) => set({ isComparing }),
      setAttempts: (value) => set(() => ({ attempts: value })),
      resetTime: () => set({ timeDuration: 0 }),
      setStatistics: (attempt) =>
        set((state) => ({
          statistics: [...state.statistics, attempt],
        })),
      resetGame: () =>
        set(() => ({
          prevTile: { id: null, gameId: null },
          currentTile: { id: null, gameId: null },
          attempts: 0,
          endGame: false,
          isComparing: false,
          isGameLaunched: false,
          shuffledTiles: [],
        })),
      setTime: () => {
        const { timeDuration } = get();
        set({ timeDuration: timeDuration + 1 });
      },
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

          return { ...state, shuffledTiles: updatedTiles };
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

      setShuffledTiles: (numOfTiles) =>
        set((state) => {
          const slicedTiles = state.tiles.slice(0, numOfTiles);
          const shuffled = arrayShuffle(slicedTiles);
          return { shuffledTiles: shuffled };
        }),
      removeSelectedTiles: (tileId: number) => {
        const { tiles } = get();
        const filteredTiles = tiles.filter((tile) => tile.gameId !== tileId);
        if (tiles.length > 32) {
          set({ tiles: filteredTiles });
        }
      },
    })),
    {
      name: "game-store",
      partialize: (state) => ({ statistics: state.statistics }),
    }
  )
);
