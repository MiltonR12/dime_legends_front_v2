import { cn } from "@/lib/utils"

interface StepsProps {
  currentStep: number
  totalSteps: number
  labels?: string[]
  className?: string
}

export function Steps({ currentStep, totalSteps, labels, className }: StepsProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 shrink-0 rounded-full text-sm font-medium transition-all duration-200",
                currentStep > index + 1
                  ? "bg-green-500 text-white"
                  : currentStep === index + 1
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white ring-4 ring-purple-500/20"
                    : "bg-purple-900/50 text-purple-300",
              )}
            >
              {currentStep > index + 1 ? "✓" : index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div className="w-full h-1 mx-2">
                <div className={cn("h-full", currentStep > index + 1 ? "bg-green-500" : "bg-purple-900/50")} />
              </div>
            )}
          </div>
        ))}
      </div>

      {labels && (
        <div className="flex items-center justify-between px-1">
          {labels.map((label, index) => (
            <div
              key={index}
              className={cn(
                "text-xs font-medium text-center transition-colors duration-200",
                currentStep > index + 1
                  ? "text-green-400"
                  : currentStep === index + 1
                    ? "text-purple-300"
                    : "text-purple-500",
              )}
              style={{
                width: `${100 / totalSteps}%`,
                maxWidth: `${100 / totalSteps}%`,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
