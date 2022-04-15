import { createPlayUseCase } from "../../use_cases/PlayUseCase";
import playerRepository from "../repositories/playerRepository";
import tick from "./tick";

const play = createPlayUseCase({ playerRepository, tick });

export default play;
