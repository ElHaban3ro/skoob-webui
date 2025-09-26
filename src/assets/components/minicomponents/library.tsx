import Header from "./header";
function Library({user}:any) {
    return (
        <div className="appmaindiv h-screen w-full flex flex-col justify-start items-center bg-background">
            <Header user={user}/>
            <div className="library_content">
                
            </div>
        </div>
    )
}
export default Library;