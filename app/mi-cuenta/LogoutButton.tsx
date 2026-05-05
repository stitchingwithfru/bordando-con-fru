"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/acceso-clientes");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "999px",
        padding: "12px 18px",
        fontSize: "14px",
        fontWeight: 700,
        textDecoration: "none",
        background: "#403A36",
        color: "#FFFFFF",
        border: 0,
        cursor: "pointer",
      }}
    >
      Cerrar sesión
    </button>
  );
}