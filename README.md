# GE Enfermagem Domiciliar — Site

Site institucional em React + Vite + Tailwind CSS.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra o endereço mostrado no terminal (normalmente http://localhost:5173).

## Build de produção

```bash
npm run build
npm run preview
```

## Antes de publicar — pendências para preencher

1. ~~**WhatsApp**~~ — ok, já configurado em `src/lib/whatsapp.js` (+55 31 97235-4867).
2. ~~**Fotos**~~ — ok, `hero-enfermeira.jpg`, `sobre-gabriella.jpg` e `hero-detalhe-1.jpg` a `hero-detalhe-3.jpg` (as 3 fotos pequenas ao lado da foto principal do topo) já estão em `public/images/`.
3. ~~**Depoimentos**~~ — o site deixa qualquer visitante enviar o próprio depoimento direto pela seção "Depoimentos", publicado na hora (sem conteúdo de exemplo/fictício — enquanto não houver nenhum real, aparece um convite para ser a primeira pessoa a contar). Isso usa um banco de dados grátis (Supabase); veja `supabase/schema.sql` para configurar (passo a passo no `.env.example`).
4. **Logo — como colocar a sua manualmente**:
   Exporte o ícone GE (só o ícone, sem o texto "Enfermagem Domiciliar" embaixo — isso o
   código já escreve do lado) como PNG com fundo transparente, do Canva/Figma/onde você
   fez a arte, e salve em `public/images/` com estes nomes exatos:
   - `logo.png` — versão escura do ícone, para a navbar (fundo claro)
   - `logo-branco.png` — versão branca/clara do ícone, para o rodapé (fundo escuro)
   Assim que os arquivos existirem ali, o site troca automaticamente — não precisa mexer
   em nenhum código. Enquanto não existirem, aparece um ícone provisório no lugar.
   (Os arquivos vetoriais que eu desenhei ficam em `logo/`, mas não são mais usados no
   site por padrão — servem só de referência/backup.)
