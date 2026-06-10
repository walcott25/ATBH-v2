import { ATTRACTIONS, DINING, STAY, EVENTS, SCHOOLS, BUSINESS, EXPERIENCES } from '../data';

// OpenRouter AI API configuration
// The API key is kept server-side on the Express proxy.
// Uses OpenRouter for access to many LLM models.
const PROXY_URL = '/api/nvidia/chat';
const AI_MODEL = "google/gemini-2.0-flash-001";

function buildKnowledgeBase(): string {
  let kb = '';

  kb += '=== ASUOGYAMAN TOURISM HUB ===\n\n';

  kb += '--- ATTRACTIONS ---\n';
  ATTRACTIONS.forEach(a => {
    kb += `${a.name} (${a.category}, rating: ${a.rating}): ${a.description}\n`;
  });

  kb += '\n--- DINING ---\n';
  DINING.forEach(d => {
    kb += `${d.name} (${d.category}, rating: ${d.rating}): ${d.description}\n`;
  });

  kb += '\n--- ACCOMMODATION ---\n';
  STAY.forEach(s => {
    kb += `${s.name} (${s.category}, rating: ${s.rating}, phone: ${s.phone || 'N/A'}): ${s.description}\n`;
  });

  kb += '\n--- EVENTS & FESTIVALS ---\n';
  EVENTS.forEach(e => {
    kb += `${e.name} (${e.date}, ${e.duration}, ${e.category}, rating: ${e.rating}): ${e.description}\n`;
  });

  kb += '\n--- SENIOR HIGH SCHOOLS ---\n';
  SCHOOLS.forEach(s => {
    kb += `${s.name} (${s.type}, ${s.location}): ${s.description}\n`;
  });

  kb += '\n--- LOCAL BUSINESSES ---\n';
  BUSINESS.forEach(b => {
    kb += `${b.name} (${b.category}, ${b.location || 'N/A'}, contact: ${b.contact || 'N/A'}): ${b.description}\n`;
  });

  kb += '\n--- EXPERIENCES & TOURS ---\n';
  EXPERIENCES.forEach(e => {
    kb += `${e.name} (${e.category}, ${e.duration}, ${e.price}, rating: ${e.rating}): ${e.description}\n`;
  });

  return kb;
}

const knowledgeBase = buildKnowledgeBase();

export async function askConcierge(question: string, history: { role: string; text: string }[] = []) {
  // Build conversation history for AI context
  const conversationMessages: { role: string; content: string }[] = [];
  
  // Add up to 6 previous messages for context (limited for speed)
  const recentHistory = history.slice(-6);
  for (let i = 0; i < recentHistory.length; i++) {
    const msg = recentHistory[i];
    // Skip the last user message if it matches the current question
    if (i === recentHistory.length - 1 && msg.role === 'user' && msg.text === question) {
      continue;
    }
    conversationMessages.push({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.text,
    });
  }
  
  // Add the current question
  conversationMessages.push({ role: 'user', content: question });

  try {
    const response = await fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [
          {
            role: 'system',
            content: `You are the ATBH Concierge — a warm, friendly, and highly intelligent AI assistant for the Asuogyaman Tourism Hub website. You are a general-purpose conversationalist who can chat about ANYTHING.

PERSONALITY:
- You are warm, friendly, and enthusiastic — like a helpful local guide who loves their home
- You can discuss ANY topic in depth: history, science, philosophy, technology, art, literature, mathematics, politics, economics, sports, entertainment, casual conversation, or any other subject
- You give comprehensive, accurate, and thoughtful answers to every question
- You have a great sense of humor and can be witty when appropriate
- You are patient and kind, always focused on helping the user
- Remember what was said earlier in the conversation and reference it naturally

ASUOGYAMAN LOCAL DATA (use when asked about the area):
${knowledgeBase}

DONATION CUSTOMER SERVICE:
- If someone wants to donate or asks about donations, enthusiastically guide them!
- Tell them they can visit /donate to make a donation via Paystack (Mobile Money, Cards, or Bank Transfer)
- Explain that donations support tourism development, community projects, cultural heritage, education, and general support for Asuogyaman
- The minimum donation is GH₵5
- After donating, they can check their donation history at /donation-history by entering their email
- Be helpful and encouraging about donations — every contribution makes a difference!

RULES:
- You can answer ANY question on ANY topic — you are not limited to tourism
- Answer every question freely, completely, and accurately
- If you don't know something, say so honestly and offer to help with something else
- Keep responses reasonably concise but thorough when depth is needed
- Be pro-active — offer suggestions, ask follow-up questions, keep the conversation flowing
- When relevant, guide users to explore the Asuogyaman website (attractions, dining, stay, events, etc.)
`
          },
          ...conversationMessages
        ],
        temperature: 0.7,
        max_tokens: 800,
        top_p: 1,
        stream: false
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;
    if (text) return text;
    throw new Error('No response text');
  } catch (error) {
    console.error("AI Service Error:", error);
    return "I'm having trouble connecting to my AI service right now. Please try again in a moment! Is there anything else I can help you with?";
  }
}
