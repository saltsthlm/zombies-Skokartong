import { ok } from "node:assert/strict";
import { test } from "node:test";
import { ZombieRoom } from "./ZombieRoom";
import { strictEqual } from "node:assert";

// TEST 1: A room with 0 capacity is always full
test("room is full", () => {
  const room = new ZombieRoom(0);
  strictEqual(room.isFull(), true, "Room with 0 capacity should be full");
});

// TEST 2: An empty room that fits one zombie is not full
test("empty room that fits one zombie is not full", () => {
  const room = new ZombieRoom(1);
  strictEqual(
    room.isFull(),
    false,
    "Empty room with capacity of 1 should not be full"
  );
});

// TEST 3: A room with no capacity cannot fit any zombies
test("room with no capacity cannot fit any zombies", () => {
  const room = new ZombieRoom(0);
  // Try to add the zombie to the room
  room.addZombie("Hans");

  // Ensure the room still has no zombies (since capacity is 0)
  strictEqual(room.getZombies().length, 0, "Room should not fit any zombies");

  // Ensure that the zombie was not added
  const zombies = room.getZombies();
  strictEqual(
    zombies.includes("Hans"),
    false,
    "The zombie should not be in the room"
  );
});

// TEST 4: A room with capacity of one becomes full when one zombie is added
test("one-roomer becomes full when a zombie is added", () => {
  const room = new ZombieRoom(1);
  room.addZombie("Lars");
  strictEqual(
    room.isFull(),
    true,
    "Room should be full after adding one zombie"
  );
});

// TEST 5: A room with capacity of two is not full when only one zombie is added
test("two-roomer is not full when a zombie is added", () => {
  const room = new ZombieRoom(2);
  room.addZombie("Maj-Britt");
  strictEqual(
    room.isFull(),
    false,
    "Room with capacity of 2 should not be full after adding one zombie"
  );
});

// TEST 6: A room with capacity of one replaces the first zombie when a second is added
test("second zombie consumes first zombie when added to a one-roomer", () => {
  const room = new ZombieRoom(1);

  // Add zombies to the room
  room.addZombie("Gunilla");
  room.addZombie("Göran");

  const zombies = room.getZombies();
  strictEqual(zombies.length, 1, "Room should only contain one zombie");
  strictEqual(
    zombies[0],
    "Göran",
    "The remaining zombie should be the second one added"
  );
});
