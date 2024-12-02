import Link from "next/link";

export default function Nav() {
    return(
        <ul className="flex space-x-4">
            <li className="border border-gray-300 p-2 rounded">
                <Link href="/">Alle Arrangementer</Link>
            </li>
            <li className="border border-gray-300 p-2 rounded">
                <Link href="/opprett-mal">Opprett Mal</Link>
            </li>
            <li className="border border-gray-300 p-2 rounded">
                <Link href="/opprett-arrangement">Opprett Arrangement</Link>
            </li>
        </ul>
    )
}