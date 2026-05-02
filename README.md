# CostaVelle - Moda Verão Premium

Um protótipo de e-commerce construído para demonstrar a excelência de uma interface de luxo, adotando os princípios de *Quiet Luxury Costeiro* e minimalismo editorial. A CostaVelle transcende uma loja padrão, criando uma verdadeira **Maison** onde roupas de praia e viagem encontram o requinte da cidade.

## 🚀 Tecnologias e Stack
- **React 18** (Vite)
- **Tailwind CSS** (para estilização utilitária super polida)
- **Framer Motion** (microinterações e transições elegantes)
- **Lucide React** (iconografia fina)
- **Sonner** (Toasts elegantes customizados)

## 🎨 Diferenciais UX/UI e Arquitetura E-commerce
Este projeto obteve uma profunda reformulação de UX e E-commerce:
- **Design Editorial:** Fim de blocos de imagem genéricos; utilização de grades assimétricas, `aspect-ratio` fixo de retrato (3/4) e muito *white-space* para respiro.
- **Microinterações:** Efeitos de rolagem e hover (`Quick Add`) calibrados com `duration: 0.8` para evitar pulos bruscos e trazer sensação de leveza.
- **Mobile First Real:** As vitrines mobile adaptam-se para *2 colunas* criando uma experiência legítima de catálogo; os menus têm hitboxes seguras (`min-h-44px`); o Drawer de Filtros foi implementado perfeitamente para touch.
- **Copywriting PT-BR:** Todos os descritivos, manifestos de marca, política de cuidados e nomes de peças estão integralmente localizados em Português do Brasil, formatados nativamente como `R$ 0,00`.
- **Checkout Confiança:** Implementação visual de selos de garantia, cálculo de desconto PIX, e UX/UI que imita com precisão os maiores ERPs premium.

## 📂 Páginas Existentes
- `/` - **Home:** Narrativa visual imersiva (Hero, Coleções, Manifesto Dark Premium).
- `/loja` - **Coleção:** Vitrine com *Drawer lateral* responsivo para filtros de tamanho, gênero e estilo.
- `/produto/:id` - **Detalhes:** Ficha de produto expansível em Accordions com dados de cuidado/lavagem, guia de tamanho e seleção visual.
- `/carrinho` - **Sacola:** Carrinho mantido em Contexto (State) sincronizado e elegante.
- `/checkout` - **Checkout:** Simulador realista de finalização de pedido sem destruir a lógica global.
- `/sobre` - **Manifesto:** A história da marca, vendendo o estilo de vida costeiro.
- `/contato` - **Concierge:** Página de atendimento luxuosa, substituindo a abordagem amadora de formulários padrão.

## ⚙️ Como Executar o Projeto

```bash
# 1. Instale as dependências (Se houver algum erro no rollup, delete a node_modules e faça install puro)
npm install

# 2. Inicie o servidor de desenvolvimento
npm run dev
```

*Nota Acadêmica:* Este é um protótipo focado em Front-End Avançado, UX Design e Direção de Arte UI. Ele pode ser defendido como um TCC ou projeto SENAI de altíssimo nível. A base de dados provém de um `.json` local, simulando retornos de uma API de headless e-commerce real. Não há integração com gateway bancário de fato.
