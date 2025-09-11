import { Zombie } from "./Zombie";
import {Room} from "./Room";

export class ZombieRoom implements Room {
    private zombies: Zombie[] = [];
    public constructor(private capacity: number) {}

      isFull(): boolean {
    return this.zombies.length >= this.capacity;
  }

  addZombie(zombie: Zombie): void {
    if (this.capacity === 0) return;

    if (this.isFull()) {
      this.zombies.shift(); // Remove the first zombie (FIFO)
    }

    this.zombies.push(zombie);
  }

  getZombies(): Zombie[] {
    return this.zombies;
  }
}