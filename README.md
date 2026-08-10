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
2. ~~**Fotos**~~ — ok, `hero-enfermeira.jpg` e `sobre-gabriella.jpg` já estão em `public/images/`. Galeria "No dia a dia" (`src/components/WorkGallery.jsx`) usa `trabalho-1.jpg` a `trabalho-5.jpg`, também em `public/images/`.
   Obs.: as 5 fotos da galeria vieram de capturas de tela (resolução ~300-600px de largura) — dá pra usar, mas se você tiver os arquivos originais do celular/WhatsApp em resolução maior, vale substituir pelos originais para ficar mais nítido em telas grandes.
3. ~~**Depoimentos**~~ — os depoimentos de exemplo em `src/data/content.js` continuam como conteúdo de reserva, mas agora o site também deixa qualquer visitante enviar o depoimento dele mesmo, direto pela seção "Depoimentos" — e ele já aparece publicado na hora. Isso usa um banco de dados grátis (Supabase); veja `supabase/schema.sql` para configurar (passo a passo no `.env.example`).
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
