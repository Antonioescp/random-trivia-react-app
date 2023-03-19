import React, { type FC, useEffect, useState } from 'react'
import { useElapsedTime } from 'use-elapsed-time'
import './App.css'
import QuestionComponent from './components/Question'
import StatusBar from './components/StatusBar'
import { type Question, type TriviaApiResponse } from './model/TriviaApi'

const QUESTIONS_AMOUNT = 5
const API_QUESTIONS_URL = `https://opentdb.com/api.php?type=multiple&amount=${QUESTIONS_AMOUNT}`
const TIMER_DURATION = 5

const App: FC = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<number | null>(null)
  const [score, setScore] = useState<number>(0)
  const { elapsedTime, reset } = useElapsedTime({
    isPlaying: true,
    duration: TIMER_DURATION,
    updateInterval: 1,
    onComplete: () => { getNextQuestion() }
  })

  useEffect(() => {
    void (async () => {
      await updateQuestions()
    })()
  }, [])

  const updateQuestions = async (): Promise<void> => {
    const response: Response = await fetch(API_QUESTIONS_URL)
    const data: TriviaApiResponse = await response.json()

    if (data.response_code === 0) {
      setQuestions(data.results)
      if (data.results.length > 0) {
        setCurrentQuestion(0)
      }
    }
  }

  const getNextQuestion = (): void => {
    if (currentQuestion !== null && currentQuestion < QUESTIONS_AMOUNT - 1) {
      setCurrentQuestion(currentQuestion + 1)
      reset()
    }
  }

  const onRight = (e: React.MouseEvent<HTMLDivElement>): void => {
    setScore(score + 1)
    getNextQuestion()
  }

  const onWrong = (e: React.MouseEvent<HTMLDivElement>): void => {
    console.log('You are wrong sorry')
    getNextQuestion()
  }

  return currentQuestion !== null
    ? <>
      <QuestionComponent
        {...questions[currentQuestion]}
        onRight={onRight}
        onWrong={onWrong}
      />
      <StatusBar
        totalRightAnswers={score}
        currentQuestion={currentQuestion + 1}
        totalQuestions={QUESTIONS_AMOUNT}
        elapsedTime={elapsedTime}
        timeToAnswer={TIMER_DURATION}
      />
    </>
    : null
}

export default App
