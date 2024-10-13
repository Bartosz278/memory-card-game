import type { TileProps } from "../components/Tile/Tile";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import arrayShuffle from "array-shuffle";

import facebookMessengerImg from "../assets/images/facebook-messenger.svg";
import linkedinImg from "../assets/images/linkedin.svg";
import whatsappImg from "../assets/images/whatsapp.svg";
import youtubeImg from "../assets/images/youtube.svg";
import javaImg from "../assets/images/java.svg";
import androidImg from "../assets/images/android.svg";
import appleImg from "../assets/images/apple.svg";
import atomImg from "../assets/images/atom.svg";
import bitcoinImg from "../assets/images/bitcoin.svg";
import bluetoothImg from "../assets/images/bluetooth.svg";
import discordImg from "../assets/images/discord.svg";
import githubImg from "../assets/images/github.svg";
import photoshopImg from "../assets/images/photoshop.svg";
import pinterestImg from "../assets/images/pinterest.svg";
import redditImg from "../assets/images/reddit.svg";
import spotifyImg from "../assets/images/spotify.svg";

export interface Attempt {
  id: number;
  timeDuration: number;
  numOfAttempts: number;
  date: string;
}

export interface Statistic {
  attempt: Attempt;
}

interface State {
  difficulty: "easy" | "medium" | "hard";
  tiles: TileProps["tile"][];
  shuffledTiles: TileProps["tile"][];
  isGameLaunched: boolean;
  endGame: boolean;
  currentTile: { id: number | null; gameId: number | null };
  prevTile: { id: number | null; gameId: number | null };
  isComparing: boolean;
  attempts: number;
  timeDuration: number;
  statistics: Statistic["attempt"][];
  isStatsOpen: boolean;
}

type Action = {
  toggleLaunch: (launch: boolean) => void;
  setDifficulty: (userChoice: State["difficulty"]) => void;
  addTiles: (tiles: State["tiles"]) => void;
  toggleReveal: (tileId: number | null) => void;
  toggleMatching: (id: number | null) => void;
  replaceMatchedImages: (image: string) => void;
  setPrevTile: (tile: State["currentTile"]) => void;
  setShuffledTiles: (numOfTiles: number) => void;
  setCurrentTile: (tile: TileProps["tile"] | { id: number | null; gameId: number | null }) => void;
  setIsComparing: (isComparing: boolean) => void;
  setAttempts: (value: number) => void;
  setTime: () => void;
  resetTime: () => void;
  setEndGame: (value: boolean) => void;
  resetGame: () => void;
  setStatistics: (stats: Statistic["attempt"]) => void;
  setIsStatsOpen: (value: boolean) => void;
  removeSelectedTiles: (tileId: number) => void;
};

export const useGameStore = create<State & Action>()(
  persist(
    devtools((set, get) => ({
      difficulty: "easy",
      tiles: [
        {
          id: Date.now() + Math.random(),
          gameId: 1,
          image: facebookMessengerImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 1,
          image: facebookMessengerImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 2,
          image: linkedinImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 2,
          image: linkedinImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 3,
          image: whatsappImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 3,
          image: whatsappImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 4,
          image: youtubeImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 4,
          image: youtubeImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 5,
          image: androidImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 5,
          image: androidImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 6,
          image: javaImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 6,
          image: javaImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 7,
          image: appleImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 7,
          image: appleImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 8,
          image: atomImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 8,
          image: atomImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 9,
          image: bitcoinImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 9,
          image: bitcoinImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 10,
          image: bluetoothImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 10,
          image: bluetoothImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 11,
          image: discordImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 11,
          image: discordImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 12,
          image: githubImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 12,
          image: githubImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 13,
          image: photoshopImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 13,
          image: photoshopImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 14,
          image: pinterestImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 14,
          image: pinterestImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 15,
          image: redditImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 15,
          image: redditImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 16,
          image: spotifyImg,
          isRevealed: false,
          isMatched: false,
        },
        {
          id: Date.now() + Math.random(),
          gameId: 16,
          image: spotifyImg,
          isRevealed: false,
          isMatched: false,
        },
      ],
      shuffledTiles: [],
      isGameLaunched: false,
      endGame: true,
      currentTile: { id: null, gameId: null },
      prevTile: { id: null, gameId: null },
      isComparing: false,
      attempts: 0,
      timeDuration: 0,
      statistics: [],
      isStatsOpen: false,

      setIsStatsOpen: (value) => set(() => ({ isStatsOpen: value })),
      setEndGame: (value) => set(() => ({ endGame: value })),
      toggleLaunch: (launch) => set(() => ({ isGameLaunched: launch })),
      setDifficulty: (userChoice) => set(() => ({ difficulty: userChoice })),
      addTiles: (tiles) => set((state) => ({ tiles: [...state.tiles, ...tiles] })),
      setPrevTile: () => set((state) => ({ prevTile: state.currentTile })),
      setCurrentTile: (tile) => set(() => ({ currentTile: { id: tile.id, gameId: tile.gameId } })),
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
            shuffledTiles: state.shuffledTiles.map((tile) => (tile.id === tileId ? { ...tile, isRevealed: !tile.isRevealed } : tile)),
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
          const filteredTiles = tiles.filter(tile => tile.gameId !== tileId);
          if(tiles.length > 32){
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
