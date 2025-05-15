import { ErrorMessage, Field, FieldArray } from "formik"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface ArrayInputProps {
  name: string
  values: string[]
  variant?: "default" | "outline"
  minPlayers?: number
  maxPlayers?: number
  label: string
  icon?: React.ReactNode
}

function ArrayInput({
  name,
  values,
  variant = "default",
  minPlayers = 1,
  maxPlayers = 10,
  label,
  icon = <Users className="h-4 w-4 text-purple-400" />
}: ArrayInputProps) {

  return (

    <div className="md:col-span-2">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <label className="text-white font-medium">
          {label}
        </label>
      </div>
      <div className="space-y-3">
        <FieldArray name={name} >
          {({ remove, push }) => (
            <div className="space-y-3">
              {values.map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Field
                    name={`${name}.${index}`}
                    placeholder={`Nombre del jugador ${index + 1}`}
                    className={cn(
                      "flex-1",
                      variant === "outline" &&
                      "bg-purple-900/20 border-purple-700 text-white placeholder:text-purple-400 focus:border-purple-500",
                    )}
                  />
                  {values.length > minPlayers && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => remove(index)}
                      className="flex-shrink-0 h-10 w-10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}

              {values.length < maxPlayers && (
                <Button
                  type="button"
                  variant={variant === "outline" ? "outline" : "secondary"}
                  onClick={() => push("")}
                  className={cn(
                    "w-full mt-2",
                    variant === "outline" && "border-purple-700 text-purple-300 hover:bg-purple-900/30 hover:text-white",
                  )}
                >
                  <Plus className="mr-2 h-4 w-4" /> Añadir jugador
                </Button>
              )}

              <ErrorMessage name={name}>
                {(msg) => (
                  <div className="text-red-500 text-sm mt-1">{msg + " "}</div>
                )}
              </ErrorMessage>
            </div>
          )}
        </FieldArray>
      </div>
    </div>
  )
}

export default ArrayInput
