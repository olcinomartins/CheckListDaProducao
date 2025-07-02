# Checklist da Produção - Onda Dura

Um checklist interativo para equipe de produção de eventos da igreja, desenvolvido com React e TypeScript.

## 🎯 Funcionalidades

- ✅ Seleção múltipla de cargos
- ✅ Checklist organizado por momentos do evento
- ✅ Animação visual ao completar tarefas
- ✅ Separação entre atividades pendentes e realizadas
- ✅ Campo de observações por momento
- ✅ Cópia automática das observações
- ✅ Tema escuro otimizado para ambientes com pouca luz
- ✅ Design responsivo para mobile

## 🔧 Como Atualizar as Atividades

### Método Simples (Recomendado)
As atividades são definidas no arquivo `src/data/activities.json`. Para atualizar:

1. Abra o arquivo `src/data/activities.json`
2. Edite as atividades seguindo a estrutura existente:

```json
{
  "CARGO": {
    "MOMENTO": [
      "Atividade 1",
      "Atividade 2"
    ]
  }
}
```

### Estrutura dos Momentos
Os momentos seguem esta ordem:
- `Pré-culto`
- `Louvor`
- `Oração`
- `Boas vindas / Avisos:`
- `Generosidade:`
- `Palavra / Ministração / Apelo:`
- `Encerramento`

### Exemplo de Atualização
```json
{
  "P1": {
    "Pré-culto": [
      "Nova atividade adicionada",
      "Chegar 30min antes",
      "Pegar caixa com items de serviço"
    ],
    "Louvor": [
      "Ficar atento ao palco"
    ]
  }
}
```

## 🚀 Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📱 Uso

1. Selecione seus cargos na seção superior
2. Marque as atividades conforme forem sendo realizadas
3. Adicione observações em cada momento
4. Use o botão "Copiar Observações" para exportar suas anotações

## 🎨 Características do Design

- **Tema Escuro**: Otimizado para ambientes com pouca luz
- **Animações Suaves**: Feedback visual ao completar tarefas
- **Área Clicável Grande**: Todo o card da atividade é clicável
- **Responsivo**: Funciona perfeitamente em dispositivos móveis
- **Acessível**: Foco em usabilidade e contraste adequado

## 📝 Tecnologias

- React 18
- TypeScript
- Tailwind CSS
- Lucide React (ícones)
- Vite (build tool)