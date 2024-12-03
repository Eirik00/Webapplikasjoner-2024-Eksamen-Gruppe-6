import Nav from "./Nav";
import { useAdmin } from "@/contexts/AdminContext";


export default function Header() {
    const { admin } = useAdmin();
    return (
        <>
            <Nav admin={admin} />
        </>
    );
}