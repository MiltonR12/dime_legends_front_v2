import { useField } from "formik";
import { useDropzone } from "react-dropzone";
import { FaUsers, FaTimes } from "react-icons/fa"; // Importamos FaTimes para el botón de eliminar
import { Button } from "../ui/button";

type Props = {
  name: string;
};

function InputUploadImage({ name }: Props) {
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
      className={`
        bg-blue-950/70 flex items-center justify-center mb-5 mx-auto rounded-full h-60 w-60 relative
        ${error ? "border-2 border-red-500" : ""}
      `}
    >
      <input {...getInputProps()} />

      {value ? (
        <div className="flex flex-col gap-5 w-full h-full relative">
          <img
            src={value instanceof File ? URL.createObjectURL(value) : value}
            alt="banner"
            className="w-full h-full object-cover object-center overflow-hidden rounded-full"
          />
          <Button
            variant="outline"
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 text-white rounded-full p-2 h-auto transform translate-x-1/4 -translate-y-1/4"
            aria-label="Quitar imagen"
          >
            <FaTimes size={16} />
          </Button>
        </div>
      ) : (
        <div className="mx-auto rounded-full flex flex-col gap-5 items-center">
          <FaUsers size={100} className="text-info" />
          <h3 className="text-center font-semibold text-info">
            Selecciona o arrastra la <br /> imagen del equipo
          </h3>
        </div>
      )}
    </div>
  );
}

export default InputUploadImage;