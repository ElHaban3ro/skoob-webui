import { getApiUrl } from "@/config/api";
import { BookOpenText } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Library } from 'lucide-react';
import { CalendarCheck2 } from 'lucide-react';
import { UserCog } from 'lucide-react';
import { Bookmark } from 'lucide-react';
import { Menubar, MenubarItem, MenubarMenu, MenubarTrigger, MenubarContent, MenubarSeparator, MenubarLabel } from "@/components/ui/menubar";

function Sidebar() {
    const [user, setUser] = useState(Object);
    const base_url = getApiUrl();
    useEffect(() => {
        get_user();
    }, []);

    const get_user = async () => {
        await fetch(base_url + "/users/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .catch(() => {
                console.log("Error");
            })
            .then(async (res) => {
                if (res) {
                    const data = await res.json();
                    setUser(data.content.content);
                }
            });
    };

    return (
        <div className="sidebar h-screen w-[4rem] flex flex-col justify-between items-center py-4 bg-gradient-to-r from-orange-50 to-slate-50">
            <div className="sidebar_top h-[5rem] flex flex-col justify-start items-center gap-2">
                <BookOpenText size={40} className="text-accent" />
                <h1 className="text-accent font-medium text-[0.7rem] ">SKOOB</h1>
            </div>
            <div className="sidebar_mid h-full flex flex-col justify-center items-center gap-4">
                <div className="sidebar_button">
                    <Button className="bg-transparent border-0 hover:bg-accent/20 p-0 w-10 h-10">
                        <Library className="text-accent" />
                    </Button>
                </div>
                <div
                    className="sidebar_button">
                    <Button className="bg-transparent border-0 hover:bg-accent/20 p-0 w-10 h-10">
                        <CalendarCheck2 className="text-accent" />
                    </Button>
                </div>
  
                <div
                    className="sidebar_button">
                    <Button className="bg-transparent border-0 hover:bg-accent/20 p-0 w-10 h-10">
                        <Bookmark className="text-accent" />
                    </Button>
                </div>
            </div>
            <div className="sidebar_bottom">
                <Menubar className="w-10 border-0 bg-transparent rounded-full">
                    <MenubarMenu>
                        <MenubarTrigger className="w-14 p-1 rounded-full cursor-pointer">
                            <img src={user.image} alt="User Image" className="w-10 rounded-full cursor-pointer" />
                        </MenubarTrigger>
                        <MenubarContent className="bg-white">

                            <MenubarLabel className="font-semibold">{user.name}</MenubarLabel>

                            <MenubarItem>Settings</MenubarItem>
                            <MenubarItem>Payments</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Log Out</MenubarItem>

                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
        </div>
    )
}

export default Sidebar;