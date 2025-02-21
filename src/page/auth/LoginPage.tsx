import LoginForm from "@/components/form/LoginForm"

function LoginPage() {
  return (
    <div className="flex bg-[#1D023E] flex-col items-center justify-center h-full" >
      <div className="w-full max-w-md px-5" >
        <h3 className="text-4xl text-center mb-5 font-bold" >
          Iniciar sesión
        </h3>

        <p className="text-center text-gray-400 mb-5" >
          Ingresa tus datos para acceder a tu cuenta
        </p>

        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage