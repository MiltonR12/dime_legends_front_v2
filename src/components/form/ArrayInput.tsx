import { ErrorMessage, Field, FieldArray } from "formik"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface ArrayInputProps {
  name: string
  values: string[]
  variant?: "default" | "outline" | "dark"
  minPlayers?: number
  maxPlayers?: number
  label: string
  addLabel?: string
  disabled?: boolean
  icon?: React.ReactNode | null
}

function ArrayInput({
  name,
  values,
  variant = "default",
  minPlayers = 1,
  maxPlayers = 10,
  label,
  addLabel = "Añadir jugador",
  disabled = false,
  icon = <Users className="h-4 w-4 text-purple-400" />
}: ArrayInputProps) {

  return (

    <div className="md:col-span-2">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <label className={cn("font-medium text-white", variant === "dark" && "text-sm text-admin-text")}>
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
                    placeholder={`${label} ${index + 1}`}
                    disabled={disabled}
                    className={cn(
                      "flex-1 bg-transparent outline-none py-2 px-4",
                      variant === "outline" &&
                      "bg-purple-900/20 border-purple-700 text-white placeholder:text-purple-400 focus:border-purple-500",
                      variant === "dark" &&
                      "h-10 rounded-md border border-admin-border bg-admin-input text-sm text-admin-text placeholder:text-admin-muted focus:border-admin-accent"
                    )}
                  />
                  {!disabled && values.length > minPlayers && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => remove(index)}
                      className={"flex-shrink-0 h-10 w-10"}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}

              {!disabled && values.length < maxPlayers && (
                <Button
                  type="button"
                  variant={variant === "dark" ? "outline" : variant === "outline" ? "outline" : "secondary"}
                  onClick={() => push("")}
                  className={cn(
                    "w-full mt-2",
                    variant === "outline" && "border-purple-700 text-purple-300 hover:bg-purple-900/30 hover:text-white",
                    variant === "dark" && "border-admin-border bg-transparent text-admin-muted hover:bg-admin-input hover:text-admin-text"
                  )}
                >
                  <Plus className="mr-2 h-4 w-4" /> {addLabel}
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
