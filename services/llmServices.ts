
// services/llmServices.ts 
import api from '@/lib/api';






// @hit- /api/v1/llm/response        {Content-Type}
//method - POST
//access - users
// /src/api/llm.ts or wherever you keep this
// /lib/getServerSideEvents.ts



export const getLLMResponse = async (
  token: string,
  prompt: string,
  threadId: string
): Promise<string> => {
  try {
    const res = await api.post(
      '/api/v1/llm/response',
      {
        prompt,
        thread_id: threadId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('✅ API response received:', res.data);
    return res.data || 'No response message found.';
  } catch (error: any) {
    console.error('❌ Error from LLM API:', error?.response || error);
    throw error;
  }
};

