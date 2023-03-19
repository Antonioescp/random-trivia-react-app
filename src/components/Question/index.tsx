import React, { FC } from "react";
import AnswerComponent from "../Answer";
import { v4 as uuidv4 } from 'uuid';
import { Question } from "../../model/TriviaApi";
import './Question.css';

export type QuestionProps = Question & {
    onRight?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onWrong?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const QuestionComponent: FC<QuestionProps> = ({ question, difficulty, category, correct_answer, incorrect_answers, onRight, onWrong }) => {

    // The answers need to be shuffled since they are always received
    // in the same order
    const shuffledAnswers = [correct_answer, ...incorrect_answers]
        .sort(q => Math.random() - 0.5)
        .map(q => <AnswerComponent
            content={q}
            onClick={q === correct_answer ? onRight : onWrong}
            key={uuidv4()}
        />);

    return <>
        <div className="question-header">
            <h1 className="question-title">{question}</h1>
            <div className="question-chips">
                <p className="chip">{difficulty}</p>
                <p className="chip">{category}</p>
            </div>
        </div>
        <div className="answers-container">
            {shuffledAnswers}
        </div>
    </>;
};

export default QuestionComponent;