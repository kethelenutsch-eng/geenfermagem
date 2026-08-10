-- Configuração da tabela de depoimentos do site GE Enfermagem Domiciliar.
--
-- Como usar: no painel do Supabase, vá em "SQL Editor" → "New query",
-- cole este arquivo inteiro e clique em "Run". Só precisa rodar uma vez.

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  author text not null check (char_length(author) between 1 and 80),
  role text check (role is null or char_length(role) <= 80),
  quote text not null check (char_length(quote) between 10 and 500),
  -- true = publicado, visível pra todo mundo. Como o site publica os
  -- depoimentos assim que a pessoa envia, isso já nasce "true" — mas
  -- também serve de "botão de emergência": se algum depoimento indevido
  -- passar, é só editar essa coluna pra "false" na tabela (ou apagar a
  -- linha) direto pelo painel do Supabase, sem mexer em código.
  approved boolean not null default true
);

create index if not exists testimonials_created_at_idx on public.testimonials (created_at desc);

alter table public.testimonials enable row level security;

drop policy if exists "Leitura pública de depoimentos aprovados" on public.testimonials;
create policy "Leitura pública de depoimentos aprovados"
  on public.testimonials for select
  to anon
  using (approved = true);

drop policy if exists "Qualquer visitante pode enviar um depoimento" on public.testimonials;
create policy "Qualquer visitante pode enviar um depoimento"
  on public.testimonials for insert
  to anon
  with check (true);
