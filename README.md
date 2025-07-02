# Checklist da Produção - Onda Dura

Um checklist interativo para equipe de produção de eventos da igreja, otimizado para GitHub Pages.

## 🎯 Funcionalidades

- ✅ Seleção múltipla de cargos
- ✅ Checklist organizado por momentos do evento
- ✅ Animação visual ao completar tarefas (verde e riscado)
- ✅ Separação entre atividades pendentes e realizadas
- ✅ Campo de observações por momento
- ✅ Cópia automática das observações
- ✅ Tema escuro otimizado para ambientes com pouca luz
- ✅ Design responsivo para mobile
- ✅ Área clicável expandida para facilitar uso

## 🚀 Acesso

O checklist está disponível em: **[https://seuusuario.github.io/ChecklistDaProducao/](https://seuusuario.github.io/ChecklistDaProducao/)**

## 🔧 Como Atualizar as Atividades (Semanalmente)

### Método Simples
As atividades são definidas no arquivo `docs/atividades.json`. Para atualizar:

1. Acesse o repositório no GitHub
2. Navegue até `docs/atividades.json`
3. Clique no ícone de edição (✏️)
4. Edite as atividades seguindo a estrutura existente
5. Faça commit das mudanças

### Estrutura do JSON
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

### Momentos Disponíveis
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

## 📱 Como Usar

1. **Acesse o link do GitHub Pages**
2. **Selecione seus cargos** na seção superior
3. **Marque as atividades** conforme forem sendo realizadas
   - Clique em qualquer lugar do card da atividade
   - Veja a animação verde antes da atividade ser movida para "Realizadas"
4. **Adicione observações** em cada momento
5. **Use o botão "Copiar Observações"** para exportar suas anotações

## 🎨 Características do Design

- **Tema Escuro**: Otimizado para ambientes com pouca luz
- **Animações Suaves**: Feedback visual ao completar tarefas
- **Área Clicável Grande**: Todo o card da atividade é clicável
- **Responsivo**: Funciona perfeitamente em dispositivos móveis
- **Acessível**: Foco em usabilidade e contraste adequado

## ⚙️ Configuração do GitHub Pages

1. Vá em **Settings** do repositório
2. Na seção **Pages**:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)** ou **/docs**
3. Salve as configurações
4. O site estará disponível em alguns minutos

## 📁 Estrutura de Arquivos

```
ChecklistDaProducao/
├── docs/
│   ├── index.html          # Aplicação principal
│   └── atividades.json     # Dados das atividades
└── README.md              # Documentação
```

## 🔄 Atualizações Automáticas

- Qualquer mudança no arquivo `docs/atividades.json` será refletida automaticamente no site
- Não é necessário recarregar a página, apenas atualizar o navegador
- As mudanças aparecem em poucos minutos após o commit

## 📝 Tecnologias

- HTML5 puro
- CSS3 com animações
- JavaScript vanilla
- GitHub Pages
- Design responsivo
- Fontes Google (Inter)

---

**Desenvolvido para a equipe de produção Onda Dura** 🎵