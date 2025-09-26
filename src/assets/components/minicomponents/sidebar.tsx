import { Button } from "@/components/ui/button";
import { Library } from 'lucide-react';
import { CalendarCheck2 } from 'lucide-react';
import SkoobLogo from "@/assets/images/skoob.png";
import { Bookmark } from 'lucide-react';
import { Menubar, MenubarItem, MenubarMenu, MenubarTrigger, MenubarContent, MenubarSeparator, MenubarLabel } from "@/components/ui/menubar";

function Sidebar({ _user, logoutFunction, tabSelected, setTabSelected }: any) {

    const user = _user;
    console.log(user);
    console.log(user.email);

    return (
        <div className="sidebar h-screen w-[4rem] flex flex-col justify-between items-center py-4 bg-gradient-to-r from-orange-50 to-slate-50">
            <div className="sidebar_top h-[5rem] flex flex-col justify-start items-center gap-2">
                <img src={SkoobLogo} alt="SKOOB LOGO" className="w-10" />
                <h1 className="text-accent font-medium text-[0.7rem] ">SKOOB</h1>
            </div>
            <div className="sidebar_mid h-full flex flex-col justify-center items-center gap-4">
                <div className="sidebar_button">
                    <Button className={"bg-transparent border-0 hover:bg-accent/20 p-0 w-10 h-10 cursor-pointer " + (tabSelected === 'library' ? 'bg-sidebar-accent' : '')} onClick={() => {setTabSelected('library')}}>
                        <Library className="text-accent" />
                    </Button>
                </div>
                <div
                    className="sidebar_button">
                    <Button className={"bg-transparent border-0 hover:bg-accent/20 p-0 w-10 h-10 cursor-pointer " + (tabSelected === 'calendar' ? 'bg-sidebar-accent' : '')} onClick={() => {setTabSelected('calendar')}}>
                        <CalendarCheck2 className="text-accent"  />
                    </Button>
                </div>
  
                <div
                    className="sidebar_button">
                    <Button className={"bg-transparent border-0 hover:bg-accent/20 p-0 w-10 h-10 cursor-pointer " + (tabSelected === 'bookmarks' ? 'bg-sidebar-accent' : '')} onClick={() => {setTabSelected('bookmarks')}}>
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
                            <MenubarItem onClick={() => {logoutFunction()}}>Log Out</MenubarItem>

                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
        </div>
    )
}

export default Sidebar;