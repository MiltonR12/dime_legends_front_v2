import LoginForm from "@/components/form/LoginForm"

function LoginPage() {
  return (
    <div className="flex items-center justify-center h-full" >
      <div>
        <h3 className="text-4xl text-center mb-5 font-bold" >
          Iniciar sesión
        </h3>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage