import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Sidebar from "@/components/Sidebar";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


export default function App({ Component, pageProps }) {
    const router = useRouter();
    const sidebarRoutes = ["/dashboard", "/customers", "/transfers", "/depositForm", "/withdrawalForm", "/linkAccountForm"];
    const showSidebar = sidebarRoutes.includes(router.pathname);

    return (
        <AuthProvider>
            {showSidebar ? (
                <Sidebar>
                    <Component {...pageProps} />
                    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss />
                </Sidebar>
            ) : (
                <Component {...pageProps} />
            )}
        </AuthProvider>
    );
}
