# TODO - Vida Plena App

## ✅ Concluído

### Autenticação
- [x] Implementação do serviço de autenticação (auth.service.ts)
- [x] Páginas de login e registro
- [x] Integração com backend para autenticação

### Serviço Bíblico
- [x] Implementação do serviço bíblico (bible.service.ts)
- [x] Lista de 90 versículos fixos
- [x] Integração com backend para buscar versículo aleatório
- [x] Exibição do versículo do dia na página Home
- [x] Sincronização do versículo entre páginas durante a sessão

### Hábitos
- [x] Implementação do serviço de hábitos (habit.service.ts)
- [x] Persistência local usando localStorage
- [x] Página de registro de hábitos (habit-log.page.ts)
- [x] Interface para marcar hábitos como realizados
- [x] **NOVO: Integração com backend para envio de hábitos**
- [x] **NOVO: Método saveHabitWithBackendSync para sincronização local/backend**

### Relatórios
- [x] Implementação do serviço de relatórios (report.service.ts)
- [x] Integração com backend para buscar dados de relatório
- [x] Página de relatórios (report.page.ts)

### Configuração
- [x] Configuração do environment.ts com URL do backend
- [x] Configuração do HttpClientModule
- [x] Documentação de integração com backend (BACKEND_INTEGRATION.md)

### Backend - Cadastro de Usuário
- [x] **NOVO: Implementação de hash de senha com bcrypt**
- [x] **NOVO: Validação de e-mail duplicado no cadastro**
- [x] **NOVO: Validação de dados com class-validator**
- [x] **NOVO: Remoção de senha do response da API**

### Responsividade
- [x] **NOVO: Media queries para login e registro (480px, 768px)**
- [x] **NOVO: Responsividade da página home com ícones adaptáveis**
- [x] **NOVO: Responsividade da página welcome com grid flexível**
- [x] **NOVO: Responsividade do componente bar-chart**
- [x] **NOVO: Estilos responsivos globais no global.scss**
- [x] **NOVO: Melhorias de acessibilidade e usabilidade**

## 🔄 Em Progresso

### Integração Backend
- [ ] Implementação completa do userId no sistema de autenticação
- [ ] Testes de integração com backend real
- [ ] Tratamento de erros mais robusto

## 📋 Próximas Tarefas

### Melhorias no Frontend
- [ ] Implementar sistema de notificações para hábitos
- [ ] Adicionar gráficos na página de relatórios
- [ ] Implementar filtros por data nos relatórios
- [ ] Adicionar animações e melhorar UX
- [ ] Implementar modo escuro (dark mode)
- [ ] Adicionar testes de responsividade automatizados

### Melhorias no Backend
- [x] ~~Implementar autenticação JWT~~ (Já implementado)
- [x] ~~Adicionar validação de dados~~ (Implementado com class-validator)
- [ ] Implementar cache para versículos
- [ ] Adicionar logs de auditoria
- [ ] Implementar sistema de refresh tokens
- [ ] Adicionar rate limiting para endpoints de autenticação

### Funcionalidades Avançadas
- [ ] Sistema de metas e objetivos
- [ ] Compartilhamento de progresso
- [ ] Notificações push
- [ ] Modo offline com sincronização

## 🐛 Problemas Conhecidos

- [ ] userId está hardcoded como 'default-user' - precisa ser integrado com auth service
- [ ] Falta tratamento de erro mais específico para diferentes tipos de falha
- [ ] Não há validação de dados no frontend antes do envio

## 📝 Notas Técnicas

### Estrutura de Dados
- **HabitLog**: Interface para dados locais de hábitos
- **HabitReport**: Interface para envio ao backend
- **Environment**: Configuração centralizada de URLs

### Fluxo de Dados
1. Usuário marca hábitos na página habit-log
2. Ao salvar, dados são persistidos localmente
3. Hábitos marcados são enviados para backend via POST /report
4. Em caso de falha no backend, dados permanecem salvos localmente
5. Relatórios são buscados do backend via GET /report

### Melhorias de Segurança Implementadas
- **Hash de senha**: Senhas são hasheadas com bcrypt antes de salvar no banco
- **Validação de e-mail**: Impede cadastro de e-mails duplicados
- **Validação de dados**: Usa class-validator para validar formato dos dados
- **Proteção de dados**: Senha nunca é retornada nas respostas da API

### Responsividade Implementada
- **Mobile (480px)**: Otimizações para telas pequenas
- **Tablet (768px)**: Ajustes para tablets
- **Desktop**: Layout otimizado para telas grandes
- **Flexbox/Grid**: Uso de layouts flexíveis
- **Unidades relativas**: rem, %, vw em vez de pixels fixos

### Próxima Tarefa Prioritária
Implementar integração completa do userId com o sistema de autenticação para substituir o valor hardcoded 'default-user'. 