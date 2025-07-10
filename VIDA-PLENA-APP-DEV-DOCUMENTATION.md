# Vida Plena App – Documentação de Desenvolvimento

## Visão Geral

O Vida Plena App é um aplicativo desenvolvido em Angular + Ionic, com o objetivo de ajudar usuários a monitorar e melhorar hábitos saudáveis, registrar progresso diário e visualizar relatórios semanais de suas ações. O projeto está em evolução contínua, com foco em usabilidade, responsividade e arquitetura escalável.

---

## Estrutura de Páginas e Componentes

### Home
- **Logo centralizado** no topo, com espaçamento ajustado para melhor harmonia visual.
- **Linha de ícones de hábitos** (Sunlight, Water, Air, Healthy Food, Exercise, Temperance, Rest, Trust in God), todos clicáveis e levando à página de hábitos.
- **Botão "Start Daily Challenge"** destacado, incentivando o usuário a iniciar o desafio diário.
- **Mensagem espiritual do dia** apresentada em um card de destaque.
- **Área de relatório semanal** (report), exibindo um gráfico de barras com os hábitos realizados na semana.

### Habit Log
- Página para **marcar hábitos diários** com toggles para cada hábito.
- **Validação obrigatória** dos campos (exemplo: email e senha no login).
- Estrutura pronta para salvar hábitos do dia (mock/localStorage, com recomendação futura de banco de dados).
- Layout limpo, centralizado e responsivo.

### Report
- **Relatório semanal** dos hábitos marcados.
- **Gráfico de barras** mostra a quantidade de hábitos realizados por dia da semana.
- **Streak** (dias seguidos) e total de hábitos completados.
- **Mensagem motivacional** para incentivar o usuário.

### Login
- **Campos de email e senha obrigatórios**, com mensagens de erro amigáveis se não preenchidos.
- Validação feita no frontend, com feedback visual.

### BarChartComponent
- **Componente standalone reutilizável** para exibir gráficos de barras semanais.
- Recebe dados via `@Input() weekData`.
- Usado tanto na página home quanto na página report.
- Importa `CommonModule` para suportar `*ngFor`.

---

## Boas Práticas e Arquitetura

- **Componentização:**
  - O gráfico de barras foi extraído para um componente reutilizável, facilitando manutenção e consistência visual.
- **Responsividade:**
  - Layouts com `max-width`, `flex`, e sugestões de media queries para melhor adaptação em dispositivos móveis.
- **Centralização de dados (recomendado):**
  - Sugestão de criar um service Angular para compartilhar dados do gráfico entre páginas, preparando para futura integração com banco de dados.
- **Validação de formulários:**
  - Campos obrigatórios com mensagens de erro amigáveis.
- **Navegação rápida:**
  - Dicas para desabilitar animações de transição e tornar a navegação entre páginas mais instantânea.
- **Remoção de duplicatas:**
  - Identificação e remoção de componentes duplicados para evitar conflitos de selector e erros de build.
- **Importação correta de módulos:**
  - Uso do `CommonModule` em componentes standalone para habilitar diretivas como `*ngFor`.

---

## Ajustes de Layout e Estilo

- Espaçamento entre logo e ícones ajustado via `margin-bottom` e `padding-top`.
- Área do report ampliada para melhor distribuição visual.
- Ícones e botões estilizados para melhor experiência do usuário.
- Mensagens de erro estilizadas em vermelho para campos obrigatórios.

---

## Exemplos de Código Importantes

### Importação do BarChartComponent
```typescript
import { BarChartComponent } from 'src/app/components/bar-chart/bar-chart.component';

@Component({
  // ...
  imports: [BarChartComponent, ...]
})
```

### Uso do gráfico na home
```html
<app-bar-chart [weekData]="weekData"></app-bar-chart>
```

### Validação obrigatória no login
```typescript
onLogin() {
  this.emailError = !this.email;
  this.passwordError = !this.password;
  if (this.emailError || this.passwordError) return;
  // ...login logic
}
```

### Desabilitar animação de transição
```html
<ion-back-button [animated]="false"></ion-back-button>
```
ou
```typescript
this.navCtrl.back({ animated: false });
```

---

## Fluxo de Dados Recomendado (com Banco de Dados)

1. Usuário marca hábitos na página Habit Log.
2. Service envia os dados para o banco de dados.
3. Banco de dados armazena os hábitos por data/usuário.
4. Ao abrir Home ou Report, o service busca os dados da semana no banco.
5. O BarChartComponent exibe o relatório semanal.

---

## Dicas e Recomendações Técnicas

- **Banco de dados:**
  - Para persistência real dos hábitos, recomendada futura integração com banco de dados (Firebase, Supabase, etc.).
- **Service Angular:**
  - Para centralizar e compartilhar dados entre páginas, mesmo antes do backend.
- **Remoção de duplicatas:**
  - Identificação e remoção de componentes duplicados para evitar conflitos de selector e erros de build.
- **Importação correta de módulos:**
  - Uso do `CommonModule` em componentes standalone para habilitar diretivas como `*ngFor`.

---

## Próximos Passos Sugeridos

- Implementar service para centralizar dados dos hábitos.
- Integrar com banco de dados para persistência real.
- Melhorar responsividade com media queries.
- Refinar layout conforme feedback visual.
- Implementar autenticação real e lógica de usuário.

---

## Observações Finais

O Vida Plena App está sendo desenvolvido com foco em boas práticas, código limpo e experiência do usuário. Todas as decisões técnicas foram tomadas pensando em escalabilidade, manutenção e facilidade de evolução futura. O projeto já conta com uma base sólida de componentes reutilizáveis, validação de formulários, layout responsivo e arquitetura pronta para integração com backend.

Se precisar de mais detalhes sobre qualquer parte do desenvolvimento, integração com banco de dados, exemplos de código ou dúvidas sobre arquitetura, estou à disposição para ajudar! 