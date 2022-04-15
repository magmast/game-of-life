import { createPauseUseCase } from "../../use_cases/PauseUseCase";
import playerRepository from "../repositories/playerRepository";

const pause = createPauseUseCase({ playerRepository });

export default pause;
