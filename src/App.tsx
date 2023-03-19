import { useEffect, useState } from 'react';
import './App.css';
import QuestionComponent from './components/Question';
import StatusBar from './components/StatusBar';
import { Question, TriviaApiResponse } from './model/TriviaApi';

const QUESTIONS_AMOUNT = 5;
const API_QUESTIONS_URL = `https://opentdb.com/api.php?type=multiple&amount=${QUESTIONS_AMOUNT}`;

function App() {

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number | null>(null);
    const [rightAnswers, setRightAnswers] = useState<number>(0);

    useEffect(() => {
        (async () => {
            const response: Response = await fetch(API_QUESTIONS_URL);
            const data: TriviaApiResponse = await response.json();

            if (data.response_code === 0) {
                setQuestions(data.results);
                if (data.results.length > 0) {
                    setCurrentQuestion(0);
                }
            }
        })();
    }, []);

    const onRight = (e: React.MouseEvent<HTMLDivElement>) => {
        setRightAnswers(rightAnswers + 1);
    };

    const onWrong = (e: React.MouseEvent<HTMLDivElement>) => {
        console.log('You are wrong sorry');
    };

    return currentQuestion !== null
        ? <>
            <QuestionComponent
                {...questions[currentQuestion]}
                onRight={onRight}
                onWrong={onWrong}
            />
            <StatusBar
                totalRightAnswers={rightAnswers}
                currentQuestion={currentQuestion + 1}
                totalQuestions={QUESTIONS_AMOUNT}
            />
        </>
        : null;
}

export default App
