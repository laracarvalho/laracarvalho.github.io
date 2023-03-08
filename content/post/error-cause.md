+++
author = "Lara Carvalho"
title = "Como usar error cause no Javascript e no Typescript"
date = "2023-03-08"
description = "Tratar erros nunca é uma tarefa divertida, principalmente no ecossistema Javascript onde precisamos tratar vários tipos de erros; HTTP, Node, milhares de bibliotecas..."
tags = [ "typescript", "javascript", "node" ]
categories = [ "typescript", "javascript", "node" ]
+++

# Como usar error cause no Javascript e no Typescript

Tratar erros nunca é uma tarefa divertida, principalmente no ecossistema Javascript onde precisamos tratar vários tipos de erros; HTTP, Node, milhares de bibliotecas...

Uma proposta relativamente recente me chamou bastante à atenção em relação ao tratamento de erros. Se trata da [proposal-error-cause](https://github.com/tc39/proposal-error-cause), já disponível nas versões mais atualizadas dos navegadores e do Node 16.9.0. De forma resumida, ela traz a razão, a causalidade de um erro específico.

Sabe quando precisamos fazer um fetch em uma API e precisamos tratar diversos erros como a própria falha da rota, bug em nossa implementação ou até mesmo um erro terceiro, que não previmos ainda? É uma loucura tratar isso tudo da forma tradicional, mas usando um exemplo descrito na própria proposta, podemos ver como esse tal error.cause pode nos ajudar:

```ts
async function doJob() {
  const rawResource = await fetch('//domain/resource-a')
    .catch(err => {
      throw new Error('Download raw resource failed', { cause: err })
    })

  const jobResult = doComputationalHeavyJob(rawResource)
  await fetch('//domain/upload', { method: 'POST', body: jobResult })
    .catch(err => {
      throw new Error('Upload job result failed', { cause: err })
    })
}

try {
  await doJob()
} catch (e) {
  console.log(e)
  console.log('Caused by', e.cause)
}
// Error: Upload job result failed
// Caused by TypeError: Failed to fetch
```

Além dos nossos logs tratados, recebemos exatamente a causa daquele erro estar sendo levantado. Isso resolve aquele problema de tentar encapsular erros em mensagens bonitinhas e acabar tirando um pouco da transparência que facilita um bom _debugging_.

Agora, tudo parece muito fácil, certo? Só começar a aplicar isso ao seu código e ser feliz. Na verdade, ainda não temos uma implementação dessa propriedade no Typescript até o momento (02/2023).

Se você tentar acessar a propriedade, receberá um erro dizendo que tal propriedade não existe na classe Error.

Isso porque o Typescript trabalha em cima de versões novas do ES e Node. Como essa proposta foi aprovada e adicionada à versão 16.9.0 do Node, e o time do Typescript adicionou essa mudança algum tempo depois, precisamos atualizar nosso tsconfig.

Veja o exemplo abaixo:

```json
{
  "compilerOptions": {
    "lib": ["es2022"],
    ...
  },
```

Atualizando o compilerOptions.lib para ES2022, os erros em relação ao error.cause irão desaparecer e você irá poder usurfruir dessa ferramenta poderosíssima.

Para referência, a compatibilidade da proposta:
-   Chrome, released on 93,
-   Firefox, released on 91,
-   Safari, released on 15,
-   Node.js, released on [v16.9.0](https://nodejs.org/en/blog/release/v16.9.0/#error-cause).
