export interface TileType {
  id: number;
  gameId: number;
  image: string;
  isRevealed: boolean;
  isMatched: boolean;
  isUserAdded: boolean;
}

export interface Attempt {
  id: number;
  timeDuration: number;
  numOfAttempts: number;
  date: string;
}

export interface Statistic {
  attempt: Attempt;
}
export type Difficulty = "easy" | "medium" | "hard";

export interface State {
  matchedPairs: TileType[];
  difficulty: Difficulty;
  tiles: TileType[];
  shuffledTiles: TileType[];
  isGameLaunched: boolean;
  endGame: boolean;
  currentRevealedTile: { id: number | null; gameId: number | null };
  prevRevealedTile: { id: number | null; gameId: number | null };
  isComparing: boolean;
  attempts: number;
  timeDuration: number;
  statistics: Statistic["attempt"][];
}

export const initialState: State = {
  matchedPairs: [],
  difficulty: "easy",
  tiles: [],
  shuffledTiles: [],
  isGameLaunched: false,
  endGame: true,
  currentRevealedTile: { id: null, gameId: null },
  prevRevealedTile: { id: null, gameId: null },
  isComparing: false,
  attempts: 0,
  timeDuration: 0,
  statistics: [],
};

export type Action = {
  toggleLaunch: (launch: boolean) => void;
  setDifficulty: (userChoice: State["difficulty"]) => void;
  addTiles: (tiles: State["tiles"]) => void;
  toggleReveal: (tileId: number | null) => void;
  toggleMatching: (id: number | null) => void;
  replaceMatchedImages: (image: string) => void;
  setprevRevealedTile: (tile: State["currentRevealedTile"]) => void;
  setShuffledTiles: (numOfTiles: number) => void;
  setcurrentRevealedTile: (
    tile: TileType | { id: number | null; gameId: number | null }
  ) => void;
  setIsComparing: (isComparing: boolean) => void;
  setAttempts: (value: number) => void;
  setTime: () => void;
  resetTime: () => void;
  setEndGame: (value: boolean) => void;
  resetGame: () => void;
  setStatistics: (stats: Statistic["attempt"]) => void;
};
