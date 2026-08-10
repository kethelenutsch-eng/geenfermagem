const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Em produção sem as chaves configuradas (ex.: antes do primeiro deploy),
// não queremos que o site inteiro quebre — os depoimentos simplesmente
// caem no modo "só os de exemplo", sem enviar/buscar nada do banco.
export const supabaseEnabled = Boolean(url && anonKey);

let clientPromise = null;

// Carrega a biblioteca do Supabase sob demanda (code-split) — ela só é
// usada pela seção de Depoimentos, então não faz sentido inflar o bundle
// principal do site com algo que a maioria das páginas nem chega a usar.
export function getSupabase() {
  if (!supabaseEnabled) return Promise.resolve(null);
  if (!clientPromise) {
    clientPromise = import("@supabase/supabase-js").then(({ createClient }) => createClient(url, anonKey));
  }
  return clientPromise;
}
