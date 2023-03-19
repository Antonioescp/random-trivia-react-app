export interface Question {
    question: string;
    category: string;
    difficulty: string;
    correct_answer: string;
    incorrect_answers: string[];
};

export interface TriviaApiResponse {
    response_code: number;
    results: Question[];
};