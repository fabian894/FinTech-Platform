import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === "true";
    // Redirect to login if not authenticated; otherwise, redirect to dashboard
    if (isAuthenticated) {
      router.push('/dashboard'); 
    } else {
      router.push('/login'); 
    }
  }, [router]);

  return null; 
}
