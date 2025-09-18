export class ZombieRoom {
  private zombies: string[] = [];

  public constructor(private capacity: number) {}

  // Check if the room is full
  isFull(): boolean {
    return this.zombies.length >= this.capacity;
  }

  // Add a zombie to the room
  addZombie(zombieName: string): void {
    if (this.capacity === 0) return;

    if (this.isFull()) {
      this.zombies.shift(); // Remove the first zombie (FIFO)
    }

    if (!zombieName || zombieName.trim().length === 0) {
      throw new Error("Zombie name cannot be null, undefined, or empty");
    }

    this.zombies.push(zombieName);
  }

  // Get the list of zombies in the room
  getZombies(): string[] {
    return this.zombies;
  }
}
