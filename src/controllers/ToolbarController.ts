import changeSpeed from "../adapters/use_cases/changeSpeed";
import clearBoard from "../adapters/use_cases/clearBoard";
import pause from "../adapters/use_cases/pause";
import play from "../adapters/use_cases/play";
import tick from "../adapters/use_cases/tick";
import Player from "../entities/Player";
import { State, useStore } from "../store";
import ChangeSpeedUseCase from "../use_cases/ChangeSpeedUseCase";
import ClearBoardUseCase from "../use_cases/ClearBoardUseCase";
import PauseUseCase from "../use_cases/PauseUseCase";
import PlayUseCase from "../use_cases/PlayUseCase";
import TickUseCase from "../use_cases/TickUseCase";

export default interface ToolbarController {
  tick: TickUseCase;
  clearBoard: ClearBoardUseCase;

  player: Player;
  play: PlayUseCase;
  pause: PauseUseCase;
  changeSpeed: ChangeSpeedUseCase;
}

const selector = ({ player }: State) => player;

export const useToolbarController = (): ToolbarController => ({
  tick,
  clearBoard,

  player: useStore(selector),
  play,
  pause,
  changeSpeed,
});
