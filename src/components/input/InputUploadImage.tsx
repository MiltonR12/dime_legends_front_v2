import { useField } from "formik";
import { useDropzone } from "react-dropzone";
import { FaUsers, FaTimes } from "react-icons/fa"; // Importamos FaTimes para el botón de eliminar
import { Button } from "../ui/button";

type Props = {
  name: string;
  compact?: boolean;
};

function InputUploadImage({ name, compact = false }: Props) {
  const [, meta, helper] = useField(name);
  const { value, error } = meta;
  const { setValue } = helper;
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/png": [".png", ".jpg", ".jpeg"] },
    onDropAccepted: (acceptedFiles) => {
      setValue(acceptedFiles[0]);
    },
  });

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setValue(null);
  };

  return (
    <div
      {...getRootProps()}
      className={
        compact
          ? `relative flex h-40 w-40 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-dashed border-admin-border bg-admin-bg ${error ? "border-red-500" : ""}`
          : `bg-blue-950/70 flex items-center justify-center mb-5 mx-auto rounded-full h-60 w-60 relative ${error ? "border-2 border-red-500" : ""}`
      }
    >
      <input {...getInputProps()} />

      {value ? (
        <div className="flex flex-col gap-5 w-full h-full relative">
          <img
            src={value instanceof File ? URL.createObjectURL(value) : value}
            alt="banner"
            className="h-full w-full overflow-hidden rounded-full object-cover object-center"
          />
          <Button
            variant="outline"
            onClick={handleRemoveImage}
            className={`absolute z-10 h-7 w-7 rounded-full border-admin-border bg-admin-surface p-0 text-admin-text hover:bg-admin-input ${compact ? "right-1 top-1" : "right-0 top-0 translate-x-1/4 -translate-y-1/4"}`}
            aria-label="Quitar imagen"
          >
            <FaTimes size={compact ? 10 : 16} />
          </Button>
        </div>
      ) : (
        compact ? (
          <div className="flex flex-col items-center gap-1 px-2 text-center">
            <FaUsers size={22} className="text-admin-muted" />
            <span className="text-[11px] leading-tight text-admin-muted">Logo</span>
          </div>
        ) : (
        <div className="mx-auto rounded-full flex flex-col gap-5 items-center">
          <FaUsers size={100} className="text-info" />
          <h3 className="text-center font-semibold text-info">
            Selecciona o arrastra la <br /> imagen del equipo
          </h3>
        </div>
        )
      )}
    </div>
  );
}

export default InputUploadImage;