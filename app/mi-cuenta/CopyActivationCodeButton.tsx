"use client";

import { useState } from "react";

type Props = {
  code: string;
};

export default function CopyActivationCodeButton({
  code,
}: Props) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      window.prompt(
        "Copia este código de activación:",
        code
      );
    }
  }

  return (
    <button
      type="button"
      className="account-resource-button"
      onClick={copyCode}
    >
      {copied ? "Código copiado ✓" : "Copiar código"}
    </button>
  );
}