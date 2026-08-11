import LegalPageLayout from "./LegalPageLayout";
import { whatsappLink } from "../lib/whatsapp";

export default function TermsOfUse() {
  return (
    <LegalPageLayout title="Termos de Uso" updatedAt="11 de agosto de 2026">
      <p>
        Estes Termos de Uso regulam o acesso e a utilização do site institucional da{" "}
        <strong>GE Enfermagem Domiciliar</strong>. Ao navegar neste site, você concorda com os termos
        descritos abaixo.
      </p>

      <section>
        <h2>1. Sobre o site</h2>
        <p>
          Este site tem caráter <strong>institucional e informativo</strong>, apresentando os serviços de
          enfermagem domiciliar prestados pela GE Enfermagem Domiciliar. O conteúdo aqui presente não
          substitui uma avaliação, diagnóstico ou orientação médica/profissional — para agendar
          atendimento ou tirar dúvidas específicas sobre um caso, entre em contato diretamente pelo{" "}
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          .
        </p>
      </section>

      <section>
        <h2>2. Uso apropriado</h2>
        <p>Ao usar este site, você concorda em não:</p>
        <ul>
          <li>Tentar acessar áreas restritas, dados de terceiros ou vulnerabilidades do sistema;</li>
          <li>Enviar conteúdo ofensivo, falso, difamatório ou ilegal através do formulário de depoimentos;</li>
          <li>Utilizar robôs, scripts ou qualquer meio automatizado para extrair dados ou sobrecarregar o site;</li>
          <li>Utilizar o site para qualquer finalidade ilícita.</li>
        </ul>
      </section>

      <section>
        <h2>3. Depoimentos enviados por usuários</h2>
        <p>
          Ao enviar um depoimento, você declara que o conteúdo é verdadeiro, de sua própria autoria e
          autoriza sua publicação pública neste site, conforme descrito na nossa{" "}
          <a href="/politica-de-privacidade">Política de Privacidade</a>. Reservamo-nos o direito de
          moderar, editar levemente (para correção ortográfica) ou remover depoimentos que violem estes
          termos, a qualquer momento e sem aviso prévio.
        </p>
      </section>

      <section>
        <h2>4. Propriedade intelectual</h2>
        <p>
          Textos, logotipo, imagens e demais elementos visuais deste site são de propriedade da GE
          Enfermagem Domiciliar ou usados sob licença, e não podem ser copiados, reproduzidos ou
          reutilizados sem autorização prévia.
        </p>
      </section>

      <section>
        <h2>5. Links externos</h2>
        <p>
          Este site contém links para o WhatsApp e outras plataformas externas. Não nos
          responsabilizamos pelo conteúdo, disponibilidade ou práticas de privacidade desses serviços
          de terceiros.
        </p>
      </section>

      <section>
        <h2>6. Limitação de responsabilidade</h2>
        <p>
          Empregamos esforços razoáveis para manter as informações deste site atualizadas e o serviço
          disponível, mas não garantimos que o site estará livre de interrupções, erros ou
          indisponibilidades temporárias.
        </p>
      </section>

      <section>
        <h2>7. Alterações nestes termos</h2>
        <p>
          Estes Termos de Uso podem ser atualizados periodicamente. A data da última atualização está
          indicada no topo desta página. O uso continuado do site após alterações implica concordância
          com os novos termos.
        </p>
      </section>

      <section>
        <h2>8. Legislação aplicável</h2>
        <p>
          Estes termos são regidos pela legislação brasileira, incluindo o Marco Civil da Internet (Lei
          nº 12.965/2014), o Código de Defesa do Consumidor e a Lei Geral de Proteção de Dados (Lei nº
          13.709/2018). Fica eleito o foro da comarca de domicílio da GE Enfermagem Domiciliar para
          dirimir eventuais controvérsias.
        </p>
      </section>

      <section>
        <h2>9. Contato</h2>
        <p>
          Dúvidas sobre estes Termos de Uso podem ser enviadas pelo{" "}
          <a href={whatsappLink("Olá! Tenho uma dúvida sobre os Termos de Uso do site.")} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          .
        </p>
      </section>
    </LegalPageLayout>
  );
}
