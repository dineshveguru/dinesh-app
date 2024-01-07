import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center align-center h-screen px-10 bg-cover bg-center">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-black-900 md:text-5xl lg:text-6xl">
        Pradhan Mantri Ujjwala Yojana (PMUY)
      </h1>
      <div className="flex w-full mt-5">
        <button className="btn">
          <Link href="./users/apply">Apply Here</Link>
        </button>
        <div className="divider divider-horizontal"></div>
        <button className="btn btn-outline">
          <Link href="./users/status">Check your Application status</Link>
        </button>
      </div>
    </main>
  );
}
