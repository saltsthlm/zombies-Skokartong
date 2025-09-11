import { ok } from "node:assert/strict";
import { test } from "node:test";
import { Zombie } from "../src/Zombie";
import { ZombieRoom } from "../src/ZombieRoom";
import { strictEqual } from "node:assert";

test("room is full", () => {
  const room = new ZombieRoom(0); // Room with 0 capacity is always full
  strictEqual(room.isFull(), true, "Room with 0 capacity should be full");
});

test("empty room that fits one zombie is not full", () => {
  const room = new ZombieRoom(1); // Room with capacity of 1
  strictEqual(
    room.isFull(),
    false,
    "Empty room with capacity of 1 should not be full"
  );
});

test("room with no capacity cannot fit any zombies", () => {
  const room = new ZombieRoom(0); // Room with 0 capacity
  const zombie = new Zombie("Greta"); // Create a zombie

  // Try to add the zombie to the room
  room.addZombie(zombie);

  // Ensure the room still has no zombies (since capacity is 0)
  strictEqual(room.getZombies().length, 0, "Room should not fit any zombies");

  // Ensure that the zombie was not added
  const zombies = room.getZombies();
  strictEqual(
    zombies.includes(zombie),
    false,
    "The zombie should not be in the room"
  );
});

test("one-roomer becomes full when a zombie is added", () => {
  const room = new ZombieRoom(1);
  const zombie = new Zombie("Hans");
  room.addZombie(zombie);
  strictEqual(
    room.isFull(),
    true,
    "Room should be full after adding one zombie"
  );
});

test("two-roomer is not full when a zombie is added", () => {
  const room = new ZombieRoom(2);
  const zombie = new Zombie("Maj-Britt");
  room.addZombie(zombie);
  strictEqual(
    room.isFull(),
    false,
    "Room with capacity of 2 should not be full after adding one zombie"
  );
});

test("second zombie consumes first zombie when added to a one-roomer", () => {
  const room = new ZombieRoom(1);
  const firstZombie = new Zombie("Lars");
  const secondZombie = new Zombie("Eva");

  // Add zombies to the room
  room.addZombie(firstZombie);
  room.addZombie(secondZombie);

  const zombies = room.getZombies();
  strictEqual(zombies.length, 1, "Room should only contain one zombie");
  strictEqual(
    zombies[0].getName(),
    "Eva",
    "The remaining zombie should be the second one added"
  );
});
