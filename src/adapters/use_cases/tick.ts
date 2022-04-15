import { createTickUseCase } from "../../use_cases/TickUseCase";
import boardRepository from "../repositories/boardRepository";

const tick = createTickUseCase({ boardRepository });

export default tick;
