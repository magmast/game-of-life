import BoardRepository from "../../repositories/BoardRepository";
import { useStore } from "../../store";

const boardRepository: BoardRepository = {
  get: () => useStore.getState().board,
  set: (board) => useStore.setState({ board }),
};

export default boardRepository;
