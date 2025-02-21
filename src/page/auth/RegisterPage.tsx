import RegisterForm from "@/components/form/RegisterForm"

function RegisterPage() {
  return (
    <div className="bg-[#1D023E] flex flex-col items-center justify-center h-screen" >
      <div className="w-full max-w-md px-5" >
        <h1 className='text-4xl font-bold text-center mb-5' >
          Registrarse
        </h1>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage