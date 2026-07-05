import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
import chatPrompt from "../prompts/chat.prompt.js";
import type { AskQuestionInput, AskQuestionResponse } from "../types/chat.js";
import vectorService from "./vector.service.js";
dotenv.config();



class RagService {
    private readonly model: ChatGoogleGenerativeAI;

    constructor() {
        this.model = new ChatGoogleGenerativeAI({
            model: "gemini-2.5-flash",
            apiKey: process.env.GOOGLE_API_KEY!,
            temperature: 0,
        })
    }

    async ask(
        {
            documentId,
            question
        }: AskQuestionInput
    ): Promise<AskQuestionResponse> {
        // Open Chroma collection
        const vectorStore = await vectorService.getVectorStore(
            documentId
        )

        // Create retriever
        const retriever =
            vectorStore.asRetriever({
                k: 3,
            });

        const docs =
            await retriever.invoke(question);

        // Build context

        const context =
            docs
                .map(
                    doc => doc.pageContent
                )
                .join("\n\n");

        // Create chain
        const chain =
            chatPrompt
                .pipe(this.model);

        // Invoke LLM

        const response =
            await chain.invoke({

                context,

                question,

            });

        return {

            answer:
                response.content.toString(),

            sources:

                docs.map(doc => ({

                    page:
                        Number(doc.metadata.loc?.pageNumber ?? 1),

                    content:
                        doc.pageContent,

                })),

        };

    }
}


export default new RagService();