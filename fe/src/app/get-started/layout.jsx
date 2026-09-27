import Header from "../components/Header";
const AuthenticationLayout = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-col relative">
      <div className="absolute w-full">
        <Header />
      </div>
      <div className="flex w-full h-screen flex-col md:items-center justify-center space-y-12">
        {children}
      </div>
    </main>
  )
}


export default AuthenticationLayout;
