import { RxCrossCircled } from "react-icons/rx";
interface SideBarProps extends React.HTMLAttributes<HTMLDivElement> {
    toggleNav:()=>void
    isNavOpen:boolean
}


export default function Sidebar({toggleNav,isNavOpen}: SideBarProps) {
    console.log("isNavOpen",isNavOpen);

  return (
    <div className={` bg-primary transition-all ${isNavOpen?"":"-translate-x-full "} w-48 h-full space-y-1 absolute top-0 bottom-0 sm:relative`}>
        <button  onClick={()=>{toggleNav()}} className="w-full p-2 text-white flex justify-center sm:hidden"><RxCrossCircled className="w-[1.8rem] h-[1.8rem]" /></button>

    </div>
  )
}
