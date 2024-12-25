import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        // Rediriger vers une route existante
        router.replace("/visiteurs/page");
    }, [router]);

    return null; // Pas besoin de contenu ici
}
