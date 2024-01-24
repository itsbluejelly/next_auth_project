import {Navbar, NavbarContent, NavbarItem, Button} from "@nextui-org/react"
import { Link } from "@nextui-org/react"

export default function Appbar(){
    return (
        <Navbar>
            <NavbarContent 
                className="hidden sm:flex gap-4"
                justify="center"
            >
                <NavbarItem>
                    <Link
                        color="foreground"
                        href="/"
                    >Home</Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <Button
                        as={Link}
                        color="primary"
                        href="/auth/signup"
                        variant="flat"
                    >Sign up</Button>   
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}