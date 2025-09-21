import { describe, expect, test, vi } from "vitest";
import { internal } from "./_generated/api";
import { setupTest } from "./test.setup";

global.fetch = vi.fn();

describe("listModels", () => {
  test("should fetch and return models from OpenRouter", async () => {
    const t = setupTest();

    const mockModels = [{ id: "openai/gpt-5", name: "GPT-5" }];
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockModels }),
    } as Response);

    const result = await t.action(internal.openrouter.listModels, {
      apiKey: "test-key",
    });

    expect(fetch).toHaveBeenCalledWith("https://openrouter.ai/api/v1/models", {
      method: "GET",
      headers: {
        Authorization: "Bearer test-key",
      },
    });

    expect(result).toEqual(mockModels);
  });
});
