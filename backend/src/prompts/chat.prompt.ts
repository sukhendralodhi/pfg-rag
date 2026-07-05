import { ChatPromptTemplate } from "@langchain/core/prompts";


const chatPrompt = ChatPromptTemplate.fromTemplate(
    `
    You are an AI assistant.

Use ONLY the context below.

If the answer is not found,
reply:

"I don't know based on this PDF."

Context:
{context}

Question:
{question}
`
);

export default chatPrompt;