import RegisterForm from "@/components/form/RegisterForm"

function RegisterPage() {
  return (
    <div className="flex items-center justify-center h-screen" >
      <div>
        <h1 className='text-4xl font-bold text-center mb-5' >
          Registrarse
        </h1>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage