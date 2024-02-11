import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
interface SideBarProps extends React.HTMLAttributes<HTMLDivElement> {
    toggleNav:()=>void
    isNavOpen:boolean
}


export default function Sidebar({toggleNav,isNavOpen}: SideBarProps) {
    console.log("isNavOpen",isNavOpen);

  return (
    <div className={`z-20 bg-primary transition-all ${isNavOpen?"":"-translate-x-full "} w-48 h-full space-y-1 fixed top-0 bottom-0 left-0 sm:relative`}>
        <button  onClick={()=>{toggleNav()}} className="w-full p-2 text-white flex justify-center sm:hidden"><RxCrossCircled className="w-[1.8rem] h-[1.8rem]" /></button>
        <button className="text-foreground"><Link to={'/inventory'}>Inventory</Link></button>
    </div>
  )
}
