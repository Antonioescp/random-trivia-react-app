import React, { type FC } from 'react'
import './StatusBar.css'

interface StatusBarProps {
  totalRightAnswers: number
  totalQuestions: number
  currentQuestion: number
  elapsedTime: number
  timeToAnswer: number
}

const StatusBar: FC<StatusBarProps> = ({
  totalQuestions,
  totalRightAnswers,
  currentQuestion,
  elapsedTime,
  timeToAnswer
}) => {
  return <div className="status-bar">
    <h3>Remaining time: {(timeToAnswer - elapsedTime)}</h3>
    <h3 className="score">Score: {totalRightAnswers}/{totalQuestions}</h3>
    <h3 className="current-question" >Current question: {currentQuestion}</h3>
  </div>
}

export default StatusBar
