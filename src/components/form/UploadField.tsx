import { cn } from "@/lib/utils";
import { useField } from "formik"
import { useDropzone } from "react-dropzone"
import { FiUpload, FiX } from "react-icons/fi";
import { Button } from "../ui/button";

type Props = {
  name: string
  className?: string
}

function UploadField({ name, className }: Props) {

  const [, meta, helpers] = useField(name)
  const { setValue } = helpers
  const { value } = meta
  const { getInputProps, getRootProps } = useDropzone({
    maxFiles: 1,
    onDropAccepted: (files) => {
      setValue(files[0])
    },
    accept: {
      'image/png': [".png", ".jpeg", ".jpg"],
    }
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        "bg-transparent border relative overflow-hidden border-[#AA1EF1] rounded-2xl flex items-center justify-center",
        className
      )}
    >

      <input {...getInputProps()} />

      <div>
        {
          value ? <>
            <img
              src={value instanceof File ? URL.createObjectURL(value) : value}
              alt="banner"
              className='mx-auto'
            />
            <Button
              onClick={() => setValue(null)}
              variant="secondary"
              className="absolute right-4 top-4 p-2 h-auto rounded-full"
            >
              <FiX />
            </Button>
          </>
            :
            <div className="flex flex-col items-center justify-center p-5" >
              <FiUpload className="text-7xl" />
              <h3 className='text-center font-semibold' >
                Selecciona o arrastra la imagen
              </h3>
            </div>
        }
      </div>
    </div>
  )
}

export default UploadField