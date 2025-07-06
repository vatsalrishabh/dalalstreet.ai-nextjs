export interface ChatMessageType {
  id: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: string; // ISO or formatted string
}
