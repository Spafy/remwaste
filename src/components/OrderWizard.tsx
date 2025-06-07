import { FaMapMarkerAlt, FaTrash, FaTruck, FaClipboardCheck, FaCalendarAlt, FaCreditCard } from 'react-icons/fa';

export type WizardStep = 'postcode' | 'waste-type' | 'skip' | 'permit' | 'date' | 'payment';

interface OrderWizardProps {
  currentStep: WizardStep;
}

interface StepConfig {
  label: string;
  icon: typeof FaMapMarkerAlt;
}

export default function OrderWizard({ currentStep }: OrderWizardProps) {
  const steps: Record<WizardStep, StepConfig> = {
    'postcode': { label: 'Postcode', icon: FaMapMarkerAlt },
    'waste-type': { label: 'Waste Type', icon: FaTrash },
    'skip': { label: 'Select Skip', icon: FaTruck },
    'permit': { label: 'Permit Check', icon: FaClipboardCheck },
    'date': { label: 'Choose Date', icon: FaCalendarAlt },
    'payment': { label: 'Payment', icon: FaCreditCard },
  };

  const stepOrder: WizardStep[] = ['postcode', 'waste-type', 'skip', 'permit', 'date', 'payment'];
  const currentStepIndex = stepOrder.indexOf(currentStep);

  return (
    <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto relative w-full px-4 md:px-8">
        {/* Progress bar Line */}
        <div className="absolute top-1/2 md:top-1/3 left-4 right-4 md:left-10 md:right-10 h-1 -translate-y-1/2">
          <div className="absolute inset-0 bg-gray-700/50 rounded-full" />
          <div 
            className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStepIndex / (stepOrder.length - 1)) * 100}%` }}
          />
        </div>

        <div className="flex justify-between relative">
          {stepOrder.map((step, index) => {
            const isActive = index === currentStepIndex;
            const isPast = index < currentStepIndex;
            const isFuture = index > currentStepIndex;
            const stepConfig = steps[step];

            return (
              <div
                key={step}
                className="flex flex-col items-center relative"
              >
                {/* Step indicator */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 
                    transition-all duration-300 transform
                    ${isActive ? 'bg-gradient-to-r from-blue-500 to-blue-600 scale-110 shadow-lg shadow-blue-500/20' : ''}
                    ${isPast ? 'bg-blue-500/20 text-blue-400' : ''}
                    ${isFuture ? 'bg-gray-800 text-gray-500' : ''}
                    ${isActive || isPast ? 'text-white' : ''}`}
                >
                  <stepConfig.icon className={`w-5 h-5 transition-transform duration-300
                    ${isActive ? 'scale-110' : ''}`} />
                </div>

                {/* Label */}
                <span className={`text-sm font-medium transition-all duration-300
                  ${isActive ? 'text-white scale-105' : ''}
                  ${isPast ? 'text-blue-400' : ''}
                  ${isFuture ? 'text-gray-500' : ''}
                  hidden md:block text-center`}
                >
                  {stepConfig.label}
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 w-1 h-1 rounded-full bg-blue-500 
                    shadow-lg shadow-blue-500/50 -translate-x-1/2 md:block hidden" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 