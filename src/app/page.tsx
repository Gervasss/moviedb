'use client';

import { useRouter } from 'next/navigation';
import { AdminHome } from './AdminHome';
import "./AdminHome/style.css"

export default function Home() {
  const router = useRouter();

  return <AdminHome />;
}
