# TODO

- [x] Menu lateral do Ionic implementado e navegando corretamente entre as páginas standalone.
- [ ] Revisar e otimizar imports de componentes em todas as páginas para evitar warnings e melhorar performance.
- [ ] Remover o uso de userId hardcoded no frontend e obter o userId do token JWT/autenticação em todas as operações que enviam dados ao backend. (em andamento)
- [ ] Migrar a persistência de hábitos e progresso para o backend, usando o localStorage apenas como cache offline temporário, sincronizando com o backend assim que possível.
- [ ] Garantir que toda lógica de negócio crítica (cálculo de streak, total, validação de hábitos) seja feita no backend, e não no frontend.
- [ ] Duplicar validação de dados no backend, mesmo que o frontend já valide, para garantir integridade e segurança.

**Próxima tarefa sugerida:**
Revisar e otimizar imports de componentes em todas as páginas standalone para evitar warnings do Angular e garantir build limpo. 