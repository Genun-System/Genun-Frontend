import Header from "../components/Header";
const AuthenticationLayout = ({ children }) => {
  return (
    <main className="flex min-h-screen overflow-y-auto flex-col relative">
      <div className="">
        <Header />
      </div>
      <div className="flex  w-full  flex-col md:items-center  space-y-12">
        {children}
      </div>
    </main>
  )
}


export default AuthenticationLayout;
