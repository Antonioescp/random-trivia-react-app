import React, { type FC } from 'react'
import './Answer.css'

interface AnswerProps {
  content: string
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const AnswerComponent: FC<AnswerProps> = ({ content, onClick }) => {
  return <p onClick={onClick} className="answer">{content}</p>
}

export default AnswerComponent
