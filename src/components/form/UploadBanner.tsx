import { useField } from "formik"
import { useDropzone } from "react-dropzone"
import { FaImage } from "react-icons/fa"

type Props = {
  name: string
}

function UploadBanner({ name }: Props) {

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
    <div {...getRootProps()}
      className='p-5 bg-blue-950/70 float-start items-center justify-center' >
      <input {...getInputProps()} />

      {
        value ? <img
          src={value instanceof File ? URL.createObjectURL(value) : value}
          alt="banner"
          className='mx-auto'
        /> :
          <>
            <FaImage size={100} className='mx-auto text-info' />
            <h3 className='text-center font-semibold text-info' >
              Selecciona o arrastra la imagen
            </h3>
          </>
      }
    </div>
  )
}

export default UploadBanner