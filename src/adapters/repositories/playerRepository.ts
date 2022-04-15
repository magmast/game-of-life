import PlayerRepository from "../../repositories/PlayerRepository";
import { useStore } from "../../store";

const playerRepository: PlayerRepository = {
  get: () => useStore.getState().player,
  set: (player) => useStore.setState({ player }),
};

export default playerRepository;
