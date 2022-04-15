import { createClearBoardUseCase } from "../../use_cases/ClearBoardUseCase";
import boardRepository from "../repositories/boardRepository";

const clearBoard = createClearBoardUseCase({ boardRepository });

export default clearBoard;
