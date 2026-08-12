import LegalPageLayout from "./LegalPageLayout";
import { whatsappLink } from "../lib/whatsapp";

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout title="Política de Privacidade" updatedAt="12 de agosto de 2026">
      <p>
        Esta Política de Privacidade explica como a <strong>GE Enfermagem Domiciliar</strong> coleta,
        usa, armazena e protege os dados pessoais de quem visita este site, em conformidade com a{" "}
        <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD)</strong>.
      </p>

      <section>
        <h2>1. Quem é responsável pelos seus dados</h2>
        <p>
          A GE Enfermagem Domiciliar é a controladora dos dados pessoais coletados neste site. Para
          qualquer dúvida ou solicitação relacionada aos seus dados, entre em contato pelo{" "}
          <a href={whatsappLink("Olá! Tenho uma dúvida sobre a Política de Privacidade do site.")} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          .
        </p>
      </section>

      <section>
        <h2>2. Quais dados coletamos</h2>
        <ul>
          <li>
            <strong>Depoimentos enviados voluntariamente:</strong> nome (ou como você deseja ser
            identificado), sua relação com o atendimento (opcional) e o texto do depoimento, quando
            você usa o formulário "Deixar meu depoimento".
          </li>
          <li>
            <strong>Preferência de tema (claro/escuro):</strong> salva apenas no seu próprio navegador
            (armazenamento local), nunca enviada aos nossos servidores.
          </li>
          <li>
            <strong>Contato via WhatsApp:</strong> ao clicar em qualquer botão "Agendar" ou "Falar no
            WhatsApp", você é direcionado ao WhatsApp, cuja própria política de privacidade passa a se
            aplicar à conversa.
          </li>
        </ul>
        <p>Não coletamos dados sensíveis (como dados de saúde) através deste site.</p>
      </section>

      <section>
        <h2>3. Por que usamos seus dados e base legal</h2>
        <p>
          Usamos os dados do formulário de depoimentos exclusivamente para exibir seu depoimento
          publicamente nesta página, com base no seu <strong>consentimento</strong> (art. 7º, I da LGPD),
          dado no momento do envio do formulário.
        </p>
      </section>

      <section>
        <h2>4. Com quem compartilhamos seus dados</h2>
        <p>Não vendemos nem alugamos seus dados. Usamos os seguintes fornecedores para operar o site:</p>
        <ul>
          <li>
            <strong>Supabase</strong> — armazena os depoimentos enviados, em servidores com criptografia
            e controle de acesso.
          </li>
          <li>
            <strong>Vercel</strong> — hospeda o site com conexão segura (HTTPS/SSL).
          </li>
        </ul>
      </section>

      <section>
        <h2>5. Cookies e armazenamento local</h2>
        <p>
          Este site utiliza o armazenamento local do navegador (<em>localStorage</em>) apenas para
          lembrar sua preferência de tema (claro/escuro) e o aceite do aviso de cookies. Não usamos
          cookies de rastreamento, publicidade ou análise de terceiros. Você pode ver mais no nosso
          aviso de cookies, exibido na primeira visita.
        </p>
      </section>

      <section>
        <h2>6. Segurança dos dados</h2>
        <p>
          O site é servido exclusivamente via conexão criptografada (HTTPS/SSL). O acesso ao banco de
          dados é restrito por regras de permissão que impedem leitura ou alteração de dados fora do
          previsto nesta política.
        </p>
      </section>

      <section>
        <h2>7. Seus direitos</h2>
        <p>Conforme a LGPD (art. 18), você tem direito a:</p>
        <ul>
          <li>Confirmar se tratamos algum dado seu e acessá-lo;</li>
          <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
          <li>
            Solicitar a <strong>exclusão</strong> do seu depoimento e demais dados a qualquer momento
            (direito ao esquecimento);
          </li>
          <li>Revogar seu consentimento a qualquer momento;</li>
          <li>Solicitar a portabilidade dos seus dados a outro fornecedor, quando aplicável;</li>
          <li>Ser informado sobre com quem compartilhamos seus dados.</li>
        </ul>
        <p>
          Para exercer qualquer um desses direitos, entre em contato pelo{" "}
          <a href={whatsappLink("Olá! Gostaria de solicitar a exclusão/alteração dos meus dados no site.")} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          . Respondemos e atendemos solicitações de exclusão em até 15 dias úteis.
        </p>
      </section>

      <section>
        <h2>8. Retenção dos dados</h2>
        <p>
          Depoimentos ficam publicados até que você solicite a remoção, ou até que sejam removidos por
          decisão da GE Enfermagem Domiciliar (por exemplo, conteúdo inadequado).
        </p>
      </section>

      <section>
        <h2>9. Crianças e adolescentes</h2>
        <p>Este site não é direcionado a menores de 18 anos e não coleta dados intencionalmente de crianças ou adolescentes.</p>
      </section>

      <section>
        <h2>10. Alterações nesta política</h2>
        <p>
          Podemos atualizar esta política periodicamente. A data da última atualização está indicada no
          topo desta página.
        </p>
      </section>

      <section>
        <h2>11. Contato</h2>
        <p>
          Dúvidas, solicitações ou reclamações sobre o tratamento dos seus dados podem ser enviadas pelo{" "}
          <a href={whatsappLink("Olá! Tenho uma dúvida sobre a Política de Privacidade do site.")} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          .
        </p>
      </section>
    </LegalPageLayout>
  );
}
