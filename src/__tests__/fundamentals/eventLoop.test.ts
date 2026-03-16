import { describe, expect, it } from "vitest";
import { eventLoopRunner } from "../../fundamentals/eventLoop.ts";

async function flushMicrotasks() {
  await Promise.resolve();
}
async function flushMacrotasks() {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe("Event Loop", () => {
  const callStackQueueFlushed = [
    "start",
    "regular",
    "arrow",
    "nested start",
    "iife arrow var: 0",
    "iife arrow var: 1",
    "end",
  ];

  const microTasksQueueFlushed = [
    ...callStackQueueFlushed,
    "promise var: 2",
    "promise var: 2",
  ];

  const macroTasksQueueFlushed = [
    ...microTasksQueueFlushed,
    "timeout regular var: 2",
    "timeout arrow let: 0",
    "timeout regular var: 2",
    "timeout arrow let: 1",
  ];

  it("only callStack queue should clear", () => {
    const output = eventLoopRunner();
    expect(output).toEqual(callStackQueueFlushed);
  });

  it("callStack and microTask queues should clear", async () => {
    const output = eventLoopRunner();
    expect(output).toEqual(callStackQueueFlushed);

    await flushMicrotasks();
    expect(output).toEqual(microTasksQueueFlushed);
  });

  it("callStack, microTask and macroTask queues should clear", async () => {
    const output = eventLoopRunner();

    await flushMicrotasks();
    expect(output).toEqual(microTasksQueueFlushed);

    await flushMacrotasks();
    expect(output).toEqual(macroTasksQueueFlushed);
  });
});
