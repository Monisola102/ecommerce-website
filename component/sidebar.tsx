import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <ul className="space-y-4">
        <li>
          <Link href="/admin/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/admin/products" className="hover:text-blue-600">
            Products
          </Link>
        </li>
        <li>
          <Link href="/admin/users" className="hover:text-blue-600">
            Users
          </Link>
        </li>
        <li>
          <Link href="/admin/orders" className="hover:text-blue-600">
            Orders
          </Link>
        </li>
      </ul>
    </aside>
  );
}
