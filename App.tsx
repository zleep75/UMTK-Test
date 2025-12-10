import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Trophy } from 'lucide-react';
import { CORRECTED_QUESTIONS } from './constants';
import { GameState } from './types';
import { OptionButton } from './components/OptionButton';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    question: null,
    options: [],
    selectedOption: null,
    isCorrect: null,
  });

  const initializeGame = useCallback(() => {
    // 1. Randomly select a question
    const randomIndex = Math.floor(Math.random() * CORRECTED_QUESTIONS.length);
    const selectedQuestion = CORRECTED_QUESTIONS[randomIndex];

    // 2. Handle Distractors
    const chosenDistractors: string[] = [];

    // Add mandatory distractor if defined (e.g., "稚" for Taki, "玲" for Umiri)
    if (selectedQuestion.mandatoryDistractor) {
      chosenDistractors.push(selectedQuestion.mandatoryDistractor);
    }

    // Calculate how many more random distractors are needed to reach total of 3
    const remainingCount = 3 - chosenDistractors.length;

    // Select random distractors from the remaining pool
    const randomDistractors = [...selectedQuestion.distractors]
      .sort(() => 0.5 - Math.random())
      .slice(0, remainingCount);
    
    chosenDistractors.push(...randomDistractors);

    // 3. Combine correct answer and distractors
    const allOptions = [selectedQuestion.correctAnswer, ...chosenDistractors];

    // 4. Shuffle options
    const finalOptions = allOptions.sort(() => 0.5 - Math.random());

    setGameState({
      question: selectedQuestion,
      options: finalOptions,
      selectedOption: null,
      isCorrect: null,
    });
  }, []);

  // Initial load
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleOptionSelect = (option: string) => {
    if (!gameState.question) return;

    const isCorrect = option === gameState.question.correctAnswer;
    setGameState((prev) => ({
      ...prev,
      selectedOption: option,
      isCorrect,
    }));
  };

  if (!gameState.question) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">加载中...</div>;
  }

  const { question, options, selectedOption, isCorrect } = gameState;
  const isGameFinished = selectedOption !== null;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200">
        
        {/* Question Section - Removed ID badge */}
        <div className="px-8 pt-12 pb-8 text-center">
          <h2 className="text-2xl sm:text-3xl text-gray-800 font-bold leading-tight">
            {question.promptParts.prefix}
            <span className="text-indigo-600 mx-1 border-b-4 border-indigo-200">
              {question.promptParts.highlight}
            </span>
            {question.promptParts.suffix}
          </h2>
        </div>

        {/* Options Grid */}
        <div className="p-6 bg-gray-50/50">
          <div className="grid grid-cols-2 gap-4">
            {options.map((option, index) => (
              <OptionButton
                key={`${option}-${index}`}
                option={option}
                isSelected={selectedOption === option}
                isCorrect={isCorrect}
                isCorrectAnswer={option === question.correctAnswer}
                disabled={isGameFinished}
                onClick={() => handleOptionSelect(option)}
              />
            ))}
          </div>
        </div>

        {/* Footer / Feedback Section */}
        <div className={`
          p-6 border-t border-gray-100 transition-all duration-300
          ${isGameFinished ? 'bg-white' : 'bg-gray-50'}
        `}>
          {!isGameFinished ? (
            <p className="text-center text-gray-400 text-sm">
              请点击上方选项进行作答
            </p>
          ) : (
            <div className="flex flex-col gap-4 animate-pop">
              {isCorrect ? (
                // Success State
                <div className="flex items-center gap-3 text-green-600 bg-green-50 p-4 rounded-xl border border-green-200">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Trophy size={24} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">回答正确！</p>
                  </div>
                </div>
              ) : (
                // Failure State (Custom Images)
                <div className="flex flex-col items-center">
                  {question.failureImage && (
                    <div className="relative w-full rounded-xl overflow-hidden shadow-md border-4 border-red-100 mb-3">
                        <img 
                            src={question.failureImage} 
                            alt="Wrong Answer" 
                            className="w-full h-auto object-cover"
                        />
                    </div>
                  )}
                  {question.failureText ? (
                    <p className="text-4xl font-black text-gray-800 my-2 tracking-widest">{question.failureText}</p>
                  ) : (
                     <div className="text-center my-2">
                        <p className="text-gray-500 text-sm">正确答案是：<span className="font-bold text-lg text-indigo-600 mx-1">{question.correctAnswer}</span></p>
                     </div>
                  )}
                </div>
              )}

              <button
                onClick={initializeGame}
                className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-200 active:scale-[0.98]"
              >
                <RefreshCw size={20} />
                再来一次
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;