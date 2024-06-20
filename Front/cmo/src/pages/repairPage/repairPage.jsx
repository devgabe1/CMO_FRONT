import React from 'react';
import ChoiceBar from '../../components/choiceBar/choiceBar';
import './repairPage.css'; // Importa o arquivo de estilos CSS
import '../../styles/global.css'

function RepairPage() {
  return (
  <div className='page-backgroundRepair'>
    <div className="repair-page-container">
      <div className="main-content">
        <ChoiceBar />
      </div>
      <h1>Conserto em 30 Minutos</h1>
      <p>Informamos aos nossos clientes que orçamento e conserto em 30 minutos serão realizados desde que:</p>
      <ul className="repair-list">
        <li>
          O cliente aguarde no balcão
          <br />
          <span className="note">A preferência será dada aos clientes que estiverem aguardando.</span>
        </li>
        <li>
          Não seja um aparelho importado
          <br />
          <span className="note">Aparelhos importados podem apresentar dificuldades na obtenção de peças ou na realização de adaptações.</span>
        </li>
        <li>
          Não tenha vindo de outra oficina
          <br />
          <span className="note">Aparelhos provenientes de outras oficinas podem estar com peças faltando, fiação trocada ou outras alterações que dificultam o conserto imediato.</span>
        </li>
        <li>
          Seja dentro do horário de trabalho do técnico
          <br />
          <span className="note">O horário de atendimento é das 08:30h às 11:30h e das 13h às 16:30h. Após esse horário, o orçamento e o conserto serão realizados no dia seguinte.</span>
        </li>
        <li>
          Não necessite de pintura ou retoque de pintura
          <br />
          <span className="note">Para esses serviços, o prazo é de até 15 dias para a conclusão.</span>
        </li>
        <li>
          Avaliação de aparelhos específicos
          <br />
          <span className="note">Micro-ondas de Convecção, Fornos Elétricos Fischer Lumen, Fornos Elétricos de Embutir 60L de qualquer marca, máquinas de pão ou qualquer outro aparelho que o técnico julgar necessário mais tempo para avaliação não serão avaliados na hora.</span>
        </li>
      </ul>
      <p1>Dentro do prazo de 30 minutos, está inclusa a limpeza e higienização. No entanto, caso o aparelho esteja muito engordurado, com pó incrustado ou necessite de cuidados extras (polimento, remoção de manchas, limpeza dos dutos), o tempo de serviço poderá ser um pouco maior.</p1>
      <p1>Contamos com a sua compreensão.</p1>
    </div>
    </div>
  );
}

export default RepairPage;
