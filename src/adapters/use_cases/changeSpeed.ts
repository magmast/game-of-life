import { createChangeSpeedUseCase } from "../../use_cases/ChangeSpeedUseCase";
import playerRepository from "../repositories/playerRepository";
import pause from "./pause";
import play from "./play";

const changeSpeed = createChangeSpeedUseCase({ playerRepository, play, pause });

export default changeSpeed;
