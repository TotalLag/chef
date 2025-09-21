import { action } from "./_generated/server";
import { v } from "convex/values";

export const listModels = action({
  args: {
    apiKey: v.optional(v.string()),
  },
  handler: async (_, args) => {
    const response = await fetch("https://openrouter.ai/api/v1/models", {
      method: "GET",
      headers: {
        ...(args.apiKey && { Authorization: `Bearer ${args.apiKey}` }),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch models from OpenRouter.");
    }

    const data = await response.json();
    return data.data; // The models are in the 'data' property of the response
  },
});
