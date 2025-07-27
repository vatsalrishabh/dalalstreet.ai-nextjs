export type LLMResponse = {
  action_type: 'llm_response';
  stream_id: string;
  message: string;
};

export type ScreenStockResponse = {
  action_type: 'screen_stock';
  query: string;
  columns: string[];
};

export type ChatResponse = LLMResponse | ScreenStockResponse;

export type ChatMessage = {
  role: 'user' | 'bot';
  content: string;
};
