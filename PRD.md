# PRD - Barber Connect (Inclusão e Acessibilidade)

## 1. Proposta do Projeto
O **Barber Connect** é uma plataforma inovadora com foco social, projetada para promover a **inclusão de barbeiros surdos** no mercado de trabalho e facilitar a integração com clientes ouvintes. O projeto visa quebrar barreiras de comunicação, proporcionando uma experiência de atendimento fluida, visual e eficiente para ambos os lados.

### Objetivos Principais:
*   **Inclusão Social**: Empoderar profissionais surdos através de uma ferramenta que facilite sua atuação profissional.
*   **Comunicação Visual**: Utilizar catálogos detalhados de estilos de cabelo e barba para reduzir a necessidade de comunicação verbal complexa no momento da escolha.
*   **Integração Cliente-Barbeiro**: Oferecer um canal onde as preferências do cliente (ouvinte ou surdo) sejam transmitidas de forma clara e visual ao barbeiro surdo.
*   **Interface Acessível**: Garantir que o fluxo de trabalho do barbeiro surdo seja otimizado através de sinalizações visuais claras.

---

## 2. Desafios
A foco na inclusão trouxe desafios específicos para o desenvolvimento:
*   **Barreira de Comunicação**: Substituir a instrução verbal tradicional por uma interface visual rica que não deixe margem para dúvidas sobre o serviço desejado.
*   **Sincronização de Status**: Implementar feedbacks visuais imediatos para que o barbeiro surdo acompanhe a chegada e as preferências de novos clientes em tempo real.
*   **UX Inclusiva**: Criar uma jornada de usuário que seja intuitiva tanto para o cliente que busca um corte quanto para o profissional que precisa gerenciar sua fila de forma totalmente visual.
*   **Acessibilidade de Interface**: Garantir que todos os componentes da interface (alertas, modais, botões) forneçam pistas visuais claras de estado e ação.

---

## 3. Desenvolvimento Técnico
A stack tecnológica foi escolhida para suportar uma interface de alta performance e feedback visual rápido.

### Stack Tecnológica e Recursos:
*   **Frontend**: React com TypeScript e **Vite**, garantindo uma interface reativa e rápida para atualizações em tempo real.
*   **Estilização**: **Tailwind CSS** e **shadcn/ui**, permitindo a criação de componentes com alto contraste e clareza visual, essenciais para a acessibilidade.
*   **Comunicação Não Verbal**: Uso estratégico de ícones dinâmicos (**Lucide-react**) e imagens de alta qualidade para representar os serviços.
*   **Persistência e Tempo Real**: **Supabase** (PostgreSQL) para gerenciar o fluxo de usuario e registros de estilos.

*   **Contextos de Seleção**: Uso de React Context para manter as escolhas visuais do cliente consistentes durante todo o processo de checkout/confirmação.

---

## 4. Plataformas Usadas
*   **Supabase Cloud**: Backend e banco de dados para gestão de usuários e registros de estilos.
*   **GitHub**: Controle de versão e colaboração no desenvolvimento do código.
*   **Lovable**: Utilizada para prototipagem rápida da interface focada em UX acessível.
*   **Vite/React**: Base do ambiente de desenvolvimento focado em componentes modulares.
