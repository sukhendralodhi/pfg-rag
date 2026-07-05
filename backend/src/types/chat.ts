export interface AskQuestionInput {
    documentId: string;
    question: string;
}

export interface AskQuestionResponse {
    answer: string;
    sources: {
        page: number;
        content: string;
    }[];
}