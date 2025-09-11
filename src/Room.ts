import { Zombie } from "./Zombie"

export interface Room{
    isFull(): boolean;
    addZombie(zombie: Zombie): void;
    getZombies(): Zombie[];
}