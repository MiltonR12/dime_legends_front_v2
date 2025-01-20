import { ErrorMessage, useField } from "formik"
import { useDropzone } from "react-dropzone"
import { FaImage } from "react-icons/fa"

type Props = {
  name: string
}

function UploadPhoto({ name }: Props) {

  const [, meta, helpers] = useField(name)
  const { setValue } = helpers
  const { value } = meta
  const { getInputProps, getRootProps } = useDropzone({
    onDropAccepted: (files) => {
      console.log(files[0])
      setValue(files[0])
    },
    accept: {
      'image/png': [".png", ".jpeg", ".jpg"],
    }
  })

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <div className="flex flex-col items-center" >
        <div className="rounded-full overflow-hidden bg-gray-300 w-52 h-52 flex items-center justify-center" >
          {value ? (
            <img className="w-full object-cover h-full" src={URL.createObjectURL(value)} alt="foto" />
          ) : (
            <FaImage className="w-36 h-36" />
          )}
        </div>
        <p className="text-2xl font-semibold" >
          {value ? value.name : "Sube una imagen"}
        </p>
      </div>
      <ErrorMessage name={name} >
        {(msg) => <p className="error">{msg}</p>}
      </ErrorMessage>
    </div>
  )
}

export default UploadPhoto