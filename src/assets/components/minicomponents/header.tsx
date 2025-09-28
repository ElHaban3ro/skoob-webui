import { Button } from "@/components/ui/button";
import type { User } from "@/types/user";
import { LockKeyhole } from "lucide-react";

function Header({ user }: { user: User | undefined }) {
  return (
    <div className="header w-full h-[30rem] relative overflow-hidden">
      <div className="header_image absolute bg-[url('@/assets/images/header_image.jpg')] bg-opa bg-cover bg-center w-full h-full blur-xl opacity-50"></div>
      <div className="header_image absolute bg-cover bg-center w-full h-full bg-background/15"></div>
      <div className="header_content relative z-10 h-full flex justify-between items-center flex-row">
        <div className="left_header  h-full flex flex-col justify-center items-start font-playfair text-accent pl-14">
          <p className="text-[3rem] w-[40rem] ">
            Welcome Back, <span className="italic">{user?.name}!</span>
          </p>
          <p className="text-[1.3rem] ">
            Hoy es el mejor día para continuar leyendo!
          </p>
          <p className="text-[0.8rem] font-bold ">
            12 Libros en tu biblioteca | 10 libros leidos
          </p>
        </div>
        <div className="right_header w-full h-full flex flex-col justify-center items-center gap-2">
          <div className="rachas outline-1 outline-accent pl-6 pr-6 pt-3 pb-6 text-accent rounded-lg w-[22rem] h-[15rem] flex flex-col justify-between items-center bg-background/20">
            <div className="rachastop w-full">
              <h3 className="font-playfair text-[2rem] font-bold">Rachas</h3>
              <p className="text-[0.8rem]">
                El sistema de rachas estará disponible pronto!
              </p>
            </div>
            <div className="rachascontent h-fit relative flex justify-center items-center">
              <div className="content blur-[0.3rem] ">
                <p className="text-[0.8rem] pb-5">
                  La lectura enriquece la mente, estimula la imaginación y
                  mejora la concentración, mientras aporta calma y abre puertas
                  a nuevos mundos y conocimientos. Continúa leyendo.
                </p>
                <Button>D</Button>
                <Button>L</Button>
                <Button>M</Button>
                <Button>X</Button>
                <Button>J</Button>
                <Button>V</Button>
                <Button>S</Button>
              </div>
              <div className="lock absolute ">
                <LockKeyhole className="" size={50} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
