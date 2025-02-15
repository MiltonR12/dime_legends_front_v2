import { ErrorMessage, useField } from "formik";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type Props = {
  options: { value: string; label: string }[];
  name: string;
  label: string;
  disabled?: boolean;
};

function InputGroupRadioButton({ options, name, label, disabled }: Props) {
  const [, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const { value } = meta;

  return (
    <div className="flex flex-col gap-5">

      <label htmlFor={name} className="font-semibold text-xl">
        {label}
      </label>

      <RadioGroup
        disabled={disabled}
        value={value}
        onValueChange={(value) => setValue(value)}
        name={name}
        className="grid grid-cols-[repeat(auto-fit,_minmax(100px,1fr))] gap-5"
      >
        {options.map((option) => (
          <div key={option.value} >
            <RadioGroupItem
              className="hidden"
              value={option.value}
              id={option.value}
            />
            <label
              htmlFor={option.value}
              className={`px-8 py-2 w-full block text-center ${value === option.value
                  ? "bg-white text-slate-950"
                  : "bg-slate-900 text-white"
                } rounded cursor-pointer transition-colors`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </RadioGroup>

      <div className="h-3">
        <ErrorMessage name={name}>
          {(msg) => <span className="text-red-500">{msg}</span>}
        </ErrorMessage>
      </div>

    </div>
  );
}

export default InputGroupRadioButton;