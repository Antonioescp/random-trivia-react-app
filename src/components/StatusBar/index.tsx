import React, { FC } from "react";
import './StatusBar.css';

interface StatusBarProps {
    totalRightAnswers: number;
    totalQuestions: number;
    currentQuestion: number;
}

const StatusBar: FC<StatusBarProps> = ({
    totalQuestions,
    totalRightAnswers,
    currentQuestion
}) => {
    return <div className="status-bar">
        <h3 className="current-question" >{currentQuestion}</h3>
        <h3 className="score">{totalRightAnswers}/{totalQuestions}</h3>
    </div>;
};

export default StatusBar;