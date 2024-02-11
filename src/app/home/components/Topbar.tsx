import { Button } from "@/components/ui/button"
import { GiHamburgerMenu } from "react-icons/gi";
interface TopbarProps extends React.HTMLAttributes<HTMLDivElement> {
    toggleNav:()=>void
}

export default function Topbar({ toggleNav }: TopbarProps) {
  return (
    <div className="topbar sticky top-0">
          <div className="flex items-center justify-between w-full px-4 py-2 bg-primary">
            <div className="flex items-center sm:hidden space-x-4">
              <Button
                onClick={toggleNav}
                aria-label="toggle nav"
              >
                <GiHamburgerMenu />
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="hidden md:block">Logout</Button>
            </div>
          </div>
        </div>
  )
}
