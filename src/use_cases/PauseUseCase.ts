import PlayerRepository from "../repositories/PlayerRepository";

type PauseUseCase = () => void;

export default PauseUseCase;

export interface PauseUseCaseOptions {
  playerRepository: PlayerRepository;
}

export const createPauseUseCase =
  ({ playerRepository }: PauseUseCaseOptions): PauseUseCase =>
  () => {
    const player = playerRepository.get();
    if (player.interval === null || !player.playing) {
      return;
    }
    clearInterval(player.interval);
    playerRepository.set({ ...player, playing: false });
  };
