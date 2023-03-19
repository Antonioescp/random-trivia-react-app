import React, { type FC, useEffect, useState } from 'react'
import { useElapsedTime } from 'use-elapsed-time'
import './App.css'
import QuestionComponent from './components/Question'
import StatusBar from './components/StatusBar'
import { type Question, type TriviaApiResponse } from './model/TriviaApi'
import Modal from './components/Modal'

const QUESTIONS_AMOUNT = 5
const API_QUESTIONS_URL = `https://opentdb.com/api.php?type=multiple&amount=${QUESTIONS_AMOUNT}`
const TIMER_DURATION = 30

const App: FC = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<number | null>(null)
  const [score, setScore] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const { elapsedTime, reset } = useElapsedTime({
    isPlaying: !gameOver,
    duration: TIMER_DURATION,
    updateInterval: 1,
    onComplete: () => { getNextQuestion() }
  })

  useEffect(() => {
    void (async () => {
      await resetQuestions()
    })()
  }, [])

  const restartGame = (): void => {
    void (async () => {
      await resetQuestions()
      setScore(0)
      reset()
      setGameOver(false)
    })()
  }

  const resetQuestions = async (): Promise<void> => {
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
    } else {
      setGameOver(true)
    }
  }

  const onRight = (e: React.MouseEvent<HTMLDivElement>): void => {
    setScore(score + 1)
    getNextQuestion()
  }

  const onWrong = (e: React.MouseEvent<HTMLDivElement>): void => {
    getNextQuestion()
  }

  return currentQuestion !== null
    ? <>
      {gameOver
        ? <Modal
          title='Game Over'
          message='You may try again!'
          isVisible={true}
          onConfirm={restartGame}
        />
        : null
      }
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
