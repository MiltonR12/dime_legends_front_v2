import { cn } from "@/lib/utils";
import { useField } from "formik"
import { useDropzone } from "react-dropzone"
import { FiUpload, FiX } from "react-icons/fi";

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
            <button onClick={() => setValue(null)} className="absolute top-0 right-0 p-1 bg-white rounded-full" >
              <FiX />
            </button>
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