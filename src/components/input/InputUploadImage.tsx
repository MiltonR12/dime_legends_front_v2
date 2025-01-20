import { useField } from "formik"
import { useDropzone } from "react-dropzone"
import { FaUsers } from "react-icons/fa"

type Props = {
  name: string
}

function InputUploadImage({ name }: Props) {

  const [, meta, helper] = useField(name)
  const { value, error } = meta
  const { setValue } = helper
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png', ".jpg", ".jpeg"],
    },
    onDropAccepted: (acceptedFiles) => {
      setValue(acceptedFiles[0])
    }
  })

  return (
    <div {...getRootProps()}
      className={`
        bg-blue-950/70 flex items-center justify-center mb-5 overflow-hidden mx-auto rounded-full h-60 w-60 
                ${error ? 'border-2 border-red-500' : ''}
      `} >
      <input {...getInputProps()} />

      {
        value ? <img
          src={value instanceof File ? URL.createObjectURL(value) : value}
          alt="banner"
          className='w-full h-full object-cover object-center'
        /> :
          <div className="mx-auto rounded-full flex flex-col gap-5 items-center" >
            <FaUsers size={100} className=' text-info' />
            <h3 className='text-center font-semibold text-info' >
              Selecciona o arrastra la <br /> imagen del equipo
            </h3>
          </div>
      }
    </div>
  )
}

export default InputUploadImage