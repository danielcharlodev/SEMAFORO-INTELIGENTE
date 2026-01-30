#SEMAFORO INTELIGENTE

FASE 01 OBJETIVO: O objetivo deste projeto é solucionar os problemas da prefeitura sobre as falhas cometidas em um cruzamento critico na região central da cidade, aonde a causa é um semaforo;

FASE 02 DIAGRAMA: Fizemos 2 diagramas um de sequencia de um de classe, aonde descrevemos a arquitetura utilizada para solucionar o semaforo, utilizando programação e componentes IoT;

FASE 03 REQUISITOS: 

*Requisitos Funcionais (RF): dizem o que o sistema deve fazer no dia a dia. Aqui envolve o semáforo ajustar/priorizar o fluxo, respeitar tempos mín/máx, entrar em modo seguro se a IoT falhar, dar prioridade a emergência, funcionar 24h, ter contingência na falta de energia, validar dados dos sensores e permitir configuração manual em manutenção/emergência.

*Requisitos Não Funcionais (RNF): dizem como o sistema deve ser/operar (qualidade). Aqui pede alta disponibilidade (99%), resposta rápida (≤2s), segurança na comunicação (autenticação/criptografia no MQTT), rodar em Linux, logs protegidos e ser escalável para expandir para outros cruzamentos.

FASE 04 FLUXOGRAMA: O fluxograma mostra a lógica principal do semáforo, desde o início do ciclo até a troca automática das luzes, incluindo modo de segurança quando o sensor/IoT falha.

FASE 05 CÓDIGO: O codigo simula um semáforo inteligente no navegador. Ao clicar em Iniciar, o sistema entra em loop e troca as luzes (vermelho → verde → amarelo → vermelho) usando temporizadores. Ele ajusta o tempo do sinal conforme as condições: trânsito alto aumenta o tempo do verde e chuva aumenta o tempo do amarelo. Se houver falha no sensor, o semáforo entra em modo segurança (pisca amarelo) até o sensor voltar ao normal.
