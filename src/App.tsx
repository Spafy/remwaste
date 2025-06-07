import { useState } from 'react'
import SkipSelector from './components/SkipSelector'
import OrderWizard from './components/OrderWizard'
import type { WizardStep } from './components/OrderWizard'

function App() {
  const [currentStep, setCurrentStep] = useState<WizardStep>('skip')
  const [selectedSkipId, setSelectedSkipId] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({ title: '', message: '', type: '' })

  const steps: WizardStep[] = ['postcode', 'waste-type', 'skip', 'permit', 'date', 'payment'];
  
  const handleSkipSelect = (skipId: string) => {
    setSelectedSkipId(skipId)
    setToastMessage({
      title: 'Skip Selected',
      message: 'You can now proceed to the next step',
      type: 'success'
    })
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleBack = () => {
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  const handleContinue = () => {
    
    const currentIndex = steps.indexOf(currentStep)
    if (currentStep === 'skip' && !selectedSkipId) {
      setToastMessage({
        title: 'Please Select a Skip',
        message: 'You need to select a skip size before continuing',
        type: 'error'
      })
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
      return
    }
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      <OrderWizard currentStep={currentStep} />
      <div className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <SkipSelector onSkipSelect={handleSkipSelect} selectedSkipId={selectedSkipId} />
          <div className="flex justify-between mt-8 mb-8 gap-4">
            <button
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-300
                ${currentStep === 'postcode' ? 'invisible' : 'visible'}
                bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white
                border border-gray-700 hover:border-gray-600
                transform hover:-translate-y-0.5`}
              onClick={handleBack}
            >
              Back
            </button>
            <button
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-300
                ${currentStep === 'skip' && !selectedSkipId
                  ? 'bg-blue-500/50 cursor-not-allowed text-gray-300'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/20'}
                transform hover:-translate-y-0.5`}
              onClick={handleContinue}
              disabled={currentStep === 'skip' && !selectedSkipId}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      
      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed bottom-4 right-4 p-6 rounded-2xl shadow-lg max-w-md z-50
          backdrop-blur-lg transition-all duration-300 animate-fade-in
          ${toastMessage.type === 'success' 
            ? 'bg-green-500/90 shadow-green-500/20' 
            : 'bg-red-500/90 shadow-red-500/20'}`}>
          <h4 className="font-semibold text-white text-lg">{toastMessage.title}</h4>
          <p className="text-white/90 mt-1">{toastMessage.message}</p>
        </div>
      )}
    </div>
  )
}

export default App
