import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaGoogle } from "react-icons/fa";
import { BookOpenText } from "lucide-react"
import '../css/App.css'
function App() {

  return (
    <>
      <div className="main w-full h-screen flex justify-center items-center font-worksans">
        <div className="main_div  w-96 h-[25rem] p-10 rounded-lg  outline-muted-foreground flex justify-center items-center items-col flex-col">

          <div className="top_div font-worksans text-accent font-bold flex justify-center items-center gap-2 text-3xl mb-4 border-muted-foreground w-full">
            <BookOpenText/>
            <h1 className="skoob">SKOOB</h1>
          </div>
          <div className="form_div w-full">
            

            <form action="" method="post">
              <Label htmlFor="email" className="text-sm text-accent">Email</Label>
              <Input type="email" id="email" placeholder="Email" className="bg-background" />

              <Label htmlFor="password" className="text-sm mt-4 text-accent">Password</Label>
              <Input type="password" id="password" placeholder="Password" className="bg-background" />
              <div className="send_button mt-4">
                <Button type="submit" className="cursor-pointer w-full font-bold">LOGIN</Button>
                <span className="registerspan text-xs underline text-accent"><a href="http://test.com">I want to register</a></span>
              </div>
            </form>

            <div className="googlelogin mt-6">
                <Button type="submit" className="cursor-pointer w-full font-bold bg-background hover:bg-gray-100 text-black" variant={"outline"}>
                  <FaGoogle className="mr-2"/>Google
                </Button>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default App