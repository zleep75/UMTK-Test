import React from 'react';
import { Check, X } from 'lucide-react';

interface OptionButtonProps {
  option: string;
  isSelected: boolean;
  isCorrect: boolean | null; // null = not answered yet
  isCorrectAnswer: boolean; // is this specific option the correct one?
  disabled: boolean;
  onClick: () => void;
}

export const OptionButton: React.FC<OptionButtonProps> = ({
  option,
  isSelected,
  isCorrect,
  isCorrectAnswer,
  disabled,
  onClick,
}) => {
  let baseClasses = "relative w-full aspect-square text-4xl sm:text-5xl font-bold rounded-xl border-2 transition-all duration-200 flex items-center justify-center shadow-sm";
  
  // Default State
  let colorClasses = "bg-white border-gray-200 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50";

  // Logic for styling based on game state
  if (disabled) {
    if (isSelected) {
        if (isCorrect) {
             // User selected this, and it is correct
             colorClasses = "bg-green-100 border-green-500 text-green-700 shadow-md ring-2 ring-green-200";
        } else {
             // User selected this, and it is wrong
             colorClasses = "bg-red-100 border-red-500 text-red-700 shadow-md ring-2 ring-red-200";
        }
    } else if (isCorrectAnswer && isCorrect === false) {
        // This was the correct answer, but user picked something else
        colorClasses = "bg-green-50 border-green-300 text-green-600 opacity-70";
    } else {
        // Unselected, irrelevant option
        colorClasses = "bg-gray-50 border-gray-100 text-gray-300";
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${colorClasses}`}
    >
      {option}
      
      {/* Icons overlay */}
      {disabled && isSelected && isCorrect && (
        <div className="absolute top-2 right-2 p-1 bg-green-500 rounded-full text-white animate-pop">
          <Check size={16} strokeWidth={3} />
        </div>
      )}
      {disabled && isSelected && !isCorrect && (
        <div className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white animate-pop">
          <X size={16} strokeWidth={3} />
        </div>
      )}
    </button>
  );
};