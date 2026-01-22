'use client';

import { useRouter } from 'next/navigation';

import "./AdminHome/AdminHome.module.css"
import { AdminHome } from './AdminHome/AdminHomeSection';

export default function Home() {
  const router = useRouter();

  return <AdminHome />;
}
