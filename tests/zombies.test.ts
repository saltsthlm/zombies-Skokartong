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

test("two-roomer is not full when a zombie is added", () => {});

test("second zombie consumes first zombie when added to a one-roomer", () => {});

// TODO:
// 1. Test to check if room is full
// 2. Test to check if empty room that fits one zombie is not full
// 3. Test to consume first zombie if room is full (FIFO)
// 4. Test to check that zombie is added to room if not full
// 5. Test to check that room with capacity of 2 is not full when one zombie is added
// 6. Test to check that room with capacity of 2 is full when two zombies are added
// 7. Test to check that second zombie consumes first zombie when added to a one-roomer
