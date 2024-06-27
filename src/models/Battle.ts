import { Torneio } from "./Torneio";
import { User } from "./User";

export interface Battle{
    battleId?: string;
    userId?: string;
    torneioId?: string;
    jogada: string;
    user: User;
    torneio: Torneio;
    criadoEm?: string;
}