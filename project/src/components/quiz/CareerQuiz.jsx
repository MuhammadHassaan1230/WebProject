import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizQuestions } from '../../data/quizQuestions';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function CareerQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const handleAnswer = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
     
      navigate('/feed');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const question = quizQuestions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Career Assessment Quiz</h2>
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-medium text-gray-900 mb-6">{question.question}</h3>
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="w-full text-left p-4 rounded-lg border border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 transition-colors duration-150"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        {currentQuestion > 0 && (
          <button
            onClick={handleBack}
            className="flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous Question
          </button>
        )}
        <div className="flex-1"></div>
        {currentQuestion < quizQuestions.length - 1 && (
          <button
            onClick={() => handleAnswer(0)}
            className="flex items-center text-indigo-600 hover:text-indigo-800"
          >
            Skip Question
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}
