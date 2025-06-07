import type { Skip } from '../types/skip';
import { FaCalendarAlt, FaRoad, FaCheck } from 'react-icons/fa';

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (skipId: string) => void;
}

export default function SkipCard({ skip, isSelected, onSelect }: SkipCardProps) {
  return (
    <div
      onClick={() => onSelect(skip.id)}
      className={`group cursor-pointer relative overflow-hidden rounded-2xl
        backdrop-blur-lg transition-all duration-300 
        ${isSelected 
          ? 'bg-gradient-to-br from-blue-600/90 to-blue-800/90 shadow-xl shadow-blue-500/20 scale-[1.02]' 
          : 'hover:bg-white/10 bg-white/5 hover:shadow-xl hover:scale-[1.01]'}
        dark:shadow-none border border-white/10`}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg z-10">
          <FaCheck className="text-blue-600 w-4 h-4" />
        </div>
      )}

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 pointer-events-none" />

      <div className="relative z-[1] p-6">
        {/* Image section */}
        <div className="relative mb-6 group-hover:scale-105 transition-transform duration-300">
          <div className="aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-br from-gray-900/80 to-gray-800">
            <img
              src={skip.imageUrl}
              alt={`${skip.size} Yard Skip`}
              className="w-full h-full object-cover mix-blend-overlay opacity-90"
            />
          </div>
          {/* Fixed position badge */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 min-w-[120px]">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 
              py-2 px-4 rounded-lg shadow-lg shadow-blue-500/20 text-center">
              <span className="text-white font-bold whitespace-nowrap">{skip.size} Yards</span>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className={`space-y-4 ${isSelected ? 'text-white' : 'text-gray-300'}`}>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">
              {skip.size} Yard Skip
            </h3>
            <div className="text-2xl font-bold text-blue-400">
              £{skip.price}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <FaCalendarAlt className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-sm">{skip.hirePeriod} Days</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <FaRoad className="w-4 h-4 text-blue-400" />
              </div>
              <span className={`text-sm ${!skip.allowedOnRoad ? 'text-orange-400' : ''}`}>
                {skip.allowedOnRoad ? 'Allowed ' : 'Not Allowed '}
              </span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(skip.id);
            }}
            className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-300
              ${isSelected
                ? 'bg-white text-blue-600 hover:bg-gray-100'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/30'}
              transform hover:-translate-y-0.5`}
          >
            {isSelected ? 'Selected' : 'Choose This Skip'}
          </button>
        </div>
      </div>
    </div>
  );
} 