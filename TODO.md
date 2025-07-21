# TODO

- [x] Menu lateral do Ionic implementado e navegando corretamente entre as páginas standalone.
- [ ] Revisar e otimizar imports de componentes em todas as páginas para evitar warnings e melhorar performance.
- [x] Remover o uso de userId hardcoded no frontend e obter o userId do token JWT/autenticação em todas as operações que enviam dados ao backend. (concluído na página habit-log)
- [ ] Migrar a persistência de hábitos e progresso para o backend, usando o localStorage apenas como cache offline temporário, sincronizando com o backend assim que possível.
- [ ] Garantir que toda lógica de negócio crítica (cálculo de streak, total, validação de hábitos) seja feita no backend, e não no frontend.
- [ ] Duplicar validação de dados no backend, mesmo que o frontend já valide, para garantir integridade e segurança.

**Progresso recente:**
- O envio do log de hábitos agora utiliza corretamente o id do usuário autenticado, obtido do token JWT, em vez de um valor fixo ('default-user'). Isso garante que os dados salvos no backend estejam associados ao usuário correto.

**Próxima tarefa sugerida:**
Revisar e otimizar imports de componentes em todas as páginas standalone para evitar warnings do Angular e garantir build limpo. 