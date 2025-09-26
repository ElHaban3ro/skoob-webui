import Header from "./header";
import MyLibrary from "./my_library";

function Library({user}:any) {
    return (
        <div className="appmaindiv h-screen w-full flex flex-col justify-start items-center bg-background">
            <Header user={user}/>
            <MyLibrary />
        </div>
    )
}
export default Library;