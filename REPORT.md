# Relatório de Projeto: Trilha 1 — E2E Funcionais (SauceDemo)

**Equipe:** Ana Carolina, Gaby e Terceiro Integrante  
**Repositório GitHub:** [Link do Repositório]  
**Aplicação Alvo:** [SauceDemo](https://www.saucedemo.com)  
**Stack Tecnológica:** Playwright, TypeScript, Page Object Model (POM), GitHub Actions (CI)

---

## 1. Visão Geral e Objetivo
O objetivo deste projeto foi implementar uma suíte completa de testes automatizados End-to-End (E2E) para a aplicação de e-commerce *SauceDemo*, cobrindo os fluxos críticos de negócio: autenticação, navegação por vitrine, gestão do carrinho e o fluxo completo de checkout, garantindo a qualidade da aplicação em múltiplos navegadores (Chromium, Firefox e WebKit).

---

## 2. Arquitetura de Testes (Page Object Model)
O projeto foi estruturado utilizando o padrão **Page Object Model (POM)** para desacoplar a lógica de negócio dos seletores de elementos, garantindo alta manutenibilidade e reusabilidade do código:

* **`LoginPage.ts` / `login.spec.ts`:** Validação de credenciais válidas, bloqueio de usuários inativos (`locked_out_user`), campos vazios e segurança de rotas.
* **`InventoryPage.ts` / `CartPage.ts` / `cart.spec.ts`:** Testes de listagem, ordenação dinâmica de produtos, adição e remoção de itens no carrinho com verificação de badge.
* **`CheckoutPage.ts` / `checkout.spec.ts`:** Simulação do fluxo de compra, preenchimento de dados de entrega, validação de campos obrigatórios e confirmação do pedido.

---

## 3. Gestão de Versão, Commits e Integração Contínua (CI)
Para atender aos critérios de avaliação da disciplina:
* **Commits Equilibrados:** O projeto foi desenvolvido em trio utilizando *feature branches* integradas à `main` via *Pull Requests* revisados e aprovados pela equipe.
* **Pipeline Automatizada:** Foi configurada uma action no GitHub Actions para rodar a suíte completa de testes em múltiplos navegadores a cada alteração enviada ao repositório, garantindo zero regressões.

---

## 4. Resultados e Métricas
* **Total de Testes Automatizados:** 45 cenários cobrindo fluxos positivos e negativos.
* **Taxa de Sucesso:** 100% de aprovação (*passing*) em Chromium, Firefox e WebKit.
* **Tempo de Execução:** Otimizado para rodar de forma rápida e estável em ambiente de CI.

---

## 5. Considerações Finais e Depoimentos da Equipe

* **Ana Carolina:**  
  > *"A experiência de estruturar um projeto E2E real com Playwright e TypeScript consolidou conceitos essenciais de automação de testes. Trabalhar em trio com divisão de módulos por Page Object Model e controle rigoroso de Pull Requests no GitHub aproximou totalmente a nossa entrega de um ambiente de desenvolvimento profissional."*

* **Gaby:**  
  > *"O uso do padrão POM facilitou imenso a colaboração, permitindo que cada membro desenvolvesse seu fluxo de forma independente e segura. A integração contínua no GitHub garantiu que o código estivesse sempre validado e pronto para entrega."*

* **Terceiro Integrante:**  
  > *"Participar ativamente da construção dos cenários de teste, da documentação no REPORT.md e da integração final garantiu que todos os critérios da trilha fossem cumpridos com excelência e commits equilibrados."*