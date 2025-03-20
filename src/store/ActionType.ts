import { Statistic } from "./gameState";
import { State } from "./gameState";
import { TileProps } from "../components/Tile/Tile";
export type Action = {
  toggleLaunch: (launch: boolean) => void;
  setDifficulty: (userChoice: State["difficulty"]) => void;
  addTiles: (tiles: State["tiles"]) => void;
  toggleReveal: (tileId: number | null) => void;
  toggleMatching: (id: number | null) => void;
  replaceMatchedImages: (image: string) => void;
  setPrevTile: (tile: State["currentTile"]) => void;
  setShuffledTiles: (numOfTiles: number) => void;
  setCurrentTile: (
    tile: TileProps["tile"] | { id: number | null; gameId: number | null }
  ) => void;
  setIsComparing: (isComparing: boolean) => void;
  setAttempts: (value: number) => void;
  setTime: () => void;
  resetTime: () => void;
  setEndGame: (value: boolean) => void;
  resetGame: () => void;
  setStatistics: (stats: Statistic["attempt"]) => void;
  removeSelectedTiles: (tileId: number) => void;
};
