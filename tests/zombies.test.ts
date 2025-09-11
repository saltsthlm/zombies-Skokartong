import { ok } from "node:assert/strict";
import { test } from "node:test";

const createRoom = (capacity: number) => {
  const _capacity = capacity;

  return {
    isFull: () => true,
  };
};

test("room is full", () => {
  const room = createRoom(0);

  const isRoomFull = room.isFull();

  ok(isRoomFull);
});

test.skip("empty room that fits one zombie is not full", () => {});

test.skip("room with no capacity cannot fit any zombies", () => {});

test.skip("one-roomer becomes full when a zombie is added", () => {});

test.skip("two-roomer is not full when a zombie is added", () => {});

test.skip("second zombie consumes first zombie when added to a one-roomer", () => {});

// TODO: 
// 1. Test to check if room is full 
// 2. Test to check if empty room that fits one zombie is not full
// 3. Test to consume first zombie if room is full (FIFO)
// 4. Test to check that zombie is added to room if not full
// 5. Test to check that room with capacity of 2 is not full when one zombie is added
// 6. Test to check that room with capacity of 2 is full when two zombies are added
// 7. Test to check that second zombie consumes first zombie when added to a one-roomer