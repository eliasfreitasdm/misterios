# Mistérios de Roraima 🏛️

<div align="center">

![Mistérios de Roraima](https://img.shields.io/badge/Jogo_Educativo-Boa_Vista-green)
![React](https://img.shields.io/badge/React-18.0+-blue)
![Vite](https://img.shields.io/badge/Vite-5.0+-purple)
![License](https://img.shields.io/badge/License-MIT-yellow)

**Uma aventura educativa interativa através da história de Boa Vista, Roraima**

[🎮 Jogar Online](#como-jogar) • [📖 Documentação](#documentação) • [🤝 Contribuir](#contribuindo) • [📄 Licença](#licença)

</div>

## 📖 Sobre o Projeto

**Mistérios de Roraima** é um jogo educativo 2D que leva os jogadores em uma jornada fascinante através da história de Boa Vista, capital de Roraima. Acompanhe Ana, Lucas e Sofia em uma aventura no tempo, explorando quatro épocas históricas distintas e aprendendo sobre a evolução da única capital brasileira totalmente localizada no Hemisfério Norte.

### 🎯 Objetivos Educativos

- **Ensinar história local**: Conhecimento sobre Boa Vista desde 1830
- **Desenvolver pensamento crítico**: Através de puzzles históricos
- **Promover consciência cultural**: Valorização do patrimônio de Roraima
- **Estimular aprendizado interativo**: Gamificação da educação

## ✨ Funcionalidades

### 🎮 Sistema de Jogo
- **4 épocas históricas** completas (1830, 1900, 1943, atual)
- **3 personagens jogáveis** + mascote papagaio
- **Sistema de plataforma 2D** com controles intuitivos
- **Coleta de itens históricos** com feedback visual
- **Portal de viagem no tempo** entre épocas

### 🎓 Conteúdo Educativo
- **12 diálogos educativos** únicos por personagem/época
- **12 perguntas interativas** com explicações detalhadas
- **4 puzzles históricos** específicos por época
- **Sistema de pontuação** de conhecimento (0-400 pontos)
- **Inventário categorizado** de artefatos históricos

### 🎨 Assets Visuais
- **Sprites originais** de personagens e inimigos
- **Cenários detalhados** para cada época histórica
- **Interface responsiva** e profissional
- **Animações fluidas** e efeitos visuais

## 🚀 Como Jogar

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn
- Navegador moderno

### Instalação Local

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/misterios-roraima.git

# Entre no diretório
cd misterios-roraima

# Instale as dependências
npm install

# Execute o jogo
npm run dev

# Acesse no navegador
# http://localhost:5173
```

### Controles do Jogo

| Tecla | Ação |
|-------|------|
| `WASD` | Movimentação |
| `Espaço` | Pular |
| `1-4` | Trocar personagem |
| `Clique` | Coletar itens / Interagir |

### Interface

- **💬 Conversar**: Diálogos educativos
- **🧩 Desafios**: Puzzles históricos  
- **🎒 Inventário**: Itens coletados
- **🗺️ Mapa**: Informações da época

## 📚 Épocas Históricas

### 🏡 Fazenda Boa Vista (1830)
- **Fundador**: Inácio Lopes de Magalhães
- **Atividade**: Criação de gado
- **Importância**: Primeiro núcleo de povoamento

### 🏘️ Vila de Boa Vista (1900)  
- **Característica**: Crescimento urbano organizado
- **Economia**: Comércio e navegação fluvial
- **Desenvolvimento**: Primeiras ruas e igreja

### 🏛️ Capital de Roraima (1943)
- **Marco**: Elevação à capital do território
- **Planejamento**: Inspirado em Paris
- **Urbanismo**: Ruas radiais e praças

### 🌆 Boa Vista Moderna (Atual)
- **Característica**: Única capital no Hemisfério Norte
- **Status**: Estado desde 1988
- **Desenvolvimento**: Cidade sustentável

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + Vite
- **Linguagem**: JavaScript/JSX
- **Estilização**: CSS3 com animações
- **Assets**: Imagens PNG geradas por IA
- **Arquitetura**: Componentes modulares

## 📁 Estrutura do Projeto

```
misterios-roraima/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Player.jsx       # Sistema de jogador
│   │   ├── GameLevel.jsx    # Lógica do nível
│   │   ├── DialogueBox.jsx  # Sistema educativo
│   │   ├── HistoricalPuzzle.jsx # Puzzles históricos
│   │   └── ...
│   ├── assets/              # Recursos visuais
│   │   ├── personagens/     # Sprites dos personagens
│   │   ├── inimigos/        # Sprites dos inimigos
│   │   ├── itens/           # Sprites dos itens
│   │   └── cenarios/        # Backgrounds das épocas
│   ├── App.jsx              # Componente principal
│   └── main.jsx             # Ponto de entrada
├── public/                  # Arquivos públicos
├── docs/                    # Documentação
├── README.md                # Este arquivo
└── package.json             # Dependências
```

## 🎯 Sistema de Pontuação

| Atividade | Pontos |
|-----------|--------|
| Diálogos educativos | 15-25 |
| Puzzles históricos | 20-30 |
| Coleta de itens | 5 cada |
| **Total possível** | **400** |

## 🤝 Contribuindo

Contribuições são bem-vindas! Veja como você pode ajudar:

### Como Contribuir

1. **Fork** o projeto
2. **Clone** seu fork
3. **Crie** uma branch para sua feature
4. **Commit** suas mudanças
5. **Push** para a branch
6. **Abra** um Pull Request

### Áreas para Contribuição

- 🎨 **Arte**: Novos sprites e cenários
- 📚 **Conteúdo**: Mais épocas históricas
- 🔧 **Código**: Melhorias e correções
- 📖 **Documentação**: Guias e tutoriais
- 🌐 **Tradução**: Outros idiomas

### Diretrizes

- Mantenha o foco educativo
- Teste suas mudanças
- Documente novas funcionalidades
- Siga os padrões de código existentes

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

- **Desenvolvimento**: Manus AI
- **Conteúdo Histórico**: Pesquisa sobre Boa Vista/RR
- **Arte**: Geração de assets originais
- **Testes**: Validação educativa

## 🙏 Agradecimentos

- **Prefeitura de Boa Vista** - Inspiração histórica
- **Comunidade React** - Tecnologias utilizadas
- **Educadores de Roraima** - Feedback educativo

## 📞 Suporte

- 📧 **Email**: [seu-email@exemplo.com]
- 🐛 **Issues**: [GitHub Issues](https://github.com/seu-usuario/misterios-roraima/issues)
- 💬 **Discussões**: [GitHub Discussions](https://github.com/seu-usuario/misterios-roraima/discussions)

---

<div align="center">

**Feito com ❤️ para a educação brasileira**

[⭐ Dê uma estrela se gostou do projeto!](https://github.com/seu-usuario/misterios-roraima)

</div>

# jogo-completo-corrigido
