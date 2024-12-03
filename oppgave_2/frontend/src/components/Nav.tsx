import Link from "next/link";

interface NavProps {
  admin: boolean;
}

export default function Nav({ admin }: NavProps) {
  return (
    <ul className="flex bg-gray-100 p-3 border border-gray-300">
      <li className="p-4 py-4 hover:bg-blue-200 font-medium">
        <Link href="/">Alle Arrangementer</Link>
      </li>
      {admin && (
        <>
          <li className="border-x border-gray-600 p-4 py-4 hover:bg-blue-200 font-medium">
            <Link href="/opprett-mal">Opprett Mal</Link>
          </li>
          <li className="p-4 py-4 hover:bg-blue-200 font-medium">
            <Link href="/opprett-arrangement">Opprett Arrangement</Link>
          </li>
        </>
      )}
    </ul>
  );
}