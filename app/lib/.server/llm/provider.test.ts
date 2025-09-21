import { describe, expect, test, vi } from 'vitest';
import { getProvider } from './provider';
import { getEnv } from '~/lib/.server/env';

vi.mock('~/lib/.server/env', () => ({
  getEnv: vi.fn(),
}));

describe('getProvider for OpenRouter', () => {
  test('should return OpenRouter provider with the correct modelId', () => {
    // Mock the environment variables to ensure we are not relying on them
    vi.mocked(getEnv).mockReturnValue(undefined);

    // Call the function to test, simulating a user providing an API key
    // and selecting the "GPT-5 (via OpenRouter)" model.
    const provider = getProvider('user-provided-key', 'OpenRouter', 'openai/gpt-5');

    // Assertions
    expect(provider.model.modelId).toBe('openai/gpt-5');
    expect(provider.model.provider).toBe('openai.chat');
    expect(provider.maxTokens).toBe(24576);
  });

  test('should fall back to default model if modelChoice is not provided', () => {
    // Mock the environment variables
    vi.mocked(getEnv).mockImplementation((key) => {
      if (key === 'OPENROUTER_API_KEY') {
        return 'test-api-key';
      }
      return undefined;
    });

    // Call the function to test without a modelChoice
    const provider = getProvider(undefined, 'OpenRouter', undefined);

    // Assertions
    expect(provider.model.modelId).toBe('openai/gpt-4o');
  });
});
