
import Image from "next/image";
import Link from "next/link";
import { redirect } from 'next/navigation';

export default function Home() {  
  redirect('/login'); 
  return (
   <>
   <Link href={"/login"}>Login Page</Link>
   </>
  );
}
