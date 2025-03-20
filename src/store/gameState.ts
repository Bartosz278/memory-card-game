import type { TileProps } from "../components/Tile/Tile";

export interface Attempt {
  id: number;
  timeDuration: number;
  numOfAttempts: number;
  date: string;
}

export interface Statistic {
  attempt: Attempt;
}

export interface State {
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
}

export const initialState: State = {
  difficulty: "easy",
  tiles: [],
  shuffledTiles: [],
  isGameLaunched: false,
  endGame: true,
  currentTile: { id: null, gameId: null },
  prevTile: { id: null, gameId: null },
  isComparing: false,
  attempts: 0,
  timeDuration: 0,
  statistics: [],
};
