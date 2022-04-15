import { createToggleCellUseCase } from "../../use_cases/ToggleCellUseCase";
import boardRepository from "../repositories/boardRepository";

const toggleCell = createToggleCellUseCase({ boardRepository });

export default toggleCell;
