import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex gap-2 ">
      <Link className="bg-black p-2 text-white" href="/admin">
        admin
      </Link>
    </div>
  );
}
