import React, { useEffect, useState, type FC } from 'react'
import AnswerComponent from '../Answer'
import { type Question } from '../../model/TriviaApi'
import './Question.css'

export type QuestionProps = Question & {
  onRight?: (e: React.MouseEvent<HTMLDivElement>) => void
  onWrong?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const QuestionComponent: FC<QuestionProps> = ({
  question,
  difficulty,
  category,
  correct_answer: correctAnswer,
  incorrect_answers: incorrectAnswers,
  onRight,
  onWrong
}) => {
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([])

  useEffect(() => {
    setShuffledAnswers(
      [correctAnswer, ...incorrectAnswers]
        .sort(q => Math.random() - 0.5)
    )
  }, [correctAnswer, incorrectAnswers])

  return <>
    <div className="question-header">
      <h1 className="question-title" dangerouslySetInnerHTML={{ __html: question }} />
      <div className="question-chips">
        <p className="chip">{difficulty}</p>
        <p className="chip">{category}</p>
      </div>
    </div>
    <div className="answers-container">
      {shuffledAnswers
        .map(q => <AnswerComponent
          content={q}
          onClick={q === correctAnswer ? onRight : onWrong}
          key={q}
        />)
      }
    </div>
  </>
}

export default QuestionComponent
