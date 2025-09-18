import { ok } from "node:assert/strict";
import { test } from "node:test";
import { ZombieRoom } from "./ZombieRoom";
import { strictEqual, throws } from "node:assert";

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

// TEST 7: Method 'getZombies' returns empty array on new room
test("method 'getZombies' returns empty array on new room", () => {
  const room = new ZombieRoom(3);
  strictEqual(room.getZombies().length, 0, "New room should have no zombies");
});

// Test 8: Adding zombies up to capacity keeps them all
test("adding zombies up to capacity keeps them all", () => {
  const room = new ZombieRoom(3);
  room.addZombie("Vickan");
  room.addZombie("Calle");
  room.addZombie("Gunnar");

  const zombies = room.getZombies();
  strictEqual(zombies.length, 3, "Room should contain three zombies");
  ok(zombies.includes("Vickan"), "Room should contain Vickan");
  ok(zombies.includes("Calle"), "Room should contain Calle");
  ok(zombies.includes("Gunnar"), "Room should contain Gunnar");
});

// TEST 9: Error is thrown when zombie's name is null, undefined or empty
test("error is thrown when zombie's name is null, undefined or empty", () => {
  const room = new ZombieRoom(2);

  // Test for empty name
  throws(() => room.addZombie(""), {
    message: "Zombie name cannot be null, undefined, or empty",
  });

  // Test for null name
  throws(() => room.addZombie(null as unknown as string), {
    message: "Zombie name cannot be null, undefined, or empty",
  });

  // Test for undefined name
  throws(() => room.addZombie(undefined as unknown as string), {
    message: "Zombie name cannot be null, undefined, or empty",
  });
});
