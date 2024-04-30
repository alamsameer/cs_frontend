import { Button } from "@/components/ui/button"
import { GiHamburgerMenu } from "react-icons/gi";
interface TopbarProps extends React.HTMLAttributes<HTMLDivElement> {
    toggleNav:()=>void
}

export default function Topbar({ toggleNav }: TopbarProps) {
  return (
    <div className="topbar sticky top-0 sm:hidden">
          <div className="flex items-center justify-between w-full px-4 py-2 bg-secondary">
            <div className="flex items-center sm:hidden space-x-4">
              <Button
                onClick={toggleNav}
                aria-label="toggle nav"
                className="bg-secondary"
              >
                <GiHamburgerMenu className="text-sky-600 bg-secondary" />
              </Button>
            </div>
          </div>
        </div>
  )
}
