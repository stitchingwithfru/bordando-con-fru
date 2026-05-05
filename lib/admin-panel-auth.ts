import crypto from "crypto";

export const ADMIN_PANEL_COOKIE = "bcf_admin_panel_access";

export function getAdminPanelPassword() {
  return process.env.ADMIN_PANEL_PASSWORD || process.env.ADMIN_INVITE_PASSWORD || "";
}

export function getAdminPanelToken() {
  const password = getAdminPanelPassword();

  if (!password) {
    throw new Error("Falta ADMIN_PANEL_PASSWORD o ADMIN_INVITE_PASSWORD");
  }

  return crypto
    .createHmac("sha256", password)
    .update("bordando-con-fru-admin-panel")
    .digest("hex");
}

export function isValidAdminPanelToken(token?: string) {
  if (!token) return false;

  const expected = getAdminPanelToken();

  if (token.length !== expected.length) {
    return false;
  }

  return crypto.timingSafeEqual(
    new Uint8Array(Buffer.from(token)),
    new Uint8Array(Buffer.from(expected))
  );
}