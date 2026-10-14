# Projettare — site atualizado

## Abrir o site

Abra o **index.html**, que está na raiz desta pasta. Mantenha as pastas `images` e `fonts` junto dos arquivos `styles.css` e `app.js`. Os caminhos são relativos: imagens, estilos e interações não dependem de um endereço de servidor nem dos CDNs das redes sociais.

Para uma prévia por HTTP, abra `ABRIR-SITE.cmd` no Windows ou execute `node serve.mjs`. É preciso Node.js 18 ou superior apenas para essa opção. Não há instalação de pacotes. O endereço da prévia é http://127.0.0.1:4173. Mantenha a janela do servidor aberta enquanto usar esse endereço.

## Estrutura

```text
index.html
styles.css
app.js
images/
fonts/
privacidade.html
404.html
favicon.svg
robots.txt
sitemap.xml
```

`README.md` e `FONTES-E-ATIVOS.md` documentam o projeto. `serve.mjs`, `package.json` e `ABRIR-SITE.cmd` são auxiliares opcionais de prévia. `build.mjs` cria uma cópia estática em `dist/` para a plataforma de hospedagem; o index.html original continua na raiz. Não é necessário executar esse build para abrir o site.

## Correções desta versão

- Hero com fotografia real cobrindo toda a largura, atrás do título e do botão, com contraste para leitura e enquadramento por tamanho de tela.
- Logo original com fundo retirado, sem avatar quadrado nem palavra duplicada ao lado. No cabeçalho, cores originais laranja e branco sobre grafite, sem filtro de cor. O rodapé mantém a exibição monocromática.
- Fotografias e visualizações inteiras no portfólio, na apresentação, nos ambientes e no contato. Proporção original, sem alturas fixas que cortam as imagens, inclusive nos filtros.
- Caminhos locais relativos no HTML, CSS e JavaScript. Imagens da galeria e trocas de ambiente também usam a pasta images.
- index.html na raiz da pasta e do ZIP.

## Conferência

Recursos locais e páginas verificados por HTTP. As seis imagens da galeria carregam; as quatro trocas de ambiente preservam a proporção. Nove larguras de 320 a 1920 px foram medidas no navegador, sem rolagem horizontal e com o fundo do hero cobrindo a largura. As imagens do portfólio mantêm a proporção natural. A validação técnica e os resultados estão nos arquivos de entrega.

## Publicação

A identidade existente do projeto Sites foi preservada em `.openai/hosting.json`. A publicação anterior ficou bloqueada pela revisão automática de execução. Não há versão online validada. Esta atualização é a entrega local corrigida.

Os metadados, canonical e sitemap continuam apontando para o endereço reservado de apresentação, com noindex. Para lançamento comercial, configure o domínio aprovado e a indexação. Não foram inventados horários, preços, avaliações ou depoimentos. Veja as fontes e os créditos em FONTES-E-ATIVOS.md.
