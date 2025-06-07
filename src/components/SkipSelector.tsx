import type { Skip } from '../types/skip';
import SkipCard from './SkipCard';
import { mockData } from '../data/skipService';

interface SkipSelectorProps {
  selectedSkipId: string | null;
  onSkipSelect: (skipId: string) => void;
}

export default function SkipSelector({ selectedSkipId, onSkipSelect }: SkipSelectorProps) {
  return (
    <div className="w-full py-10">
      <div className="container-wrapper">
        <div className="space-y-8 w-full">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-white">
              Choose Your Skip Size
            </h1>
            <p className="text-lg text-gray-400">
              Select the skip size that best suits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {mockData.skips.map((skip: Skip) => (
              <SkipCard
                key={skip.id}
                skip={skip}
                isSelected={selectedSkipId === skip.id}
                onSelect={onSkipSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 