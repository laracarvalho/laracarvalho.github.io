+++
author = "Lara Carvalho"
title = "M3 coisas que você deve saber sobre Typescript"
date = "2019-03-11"
description = "Existem 3 features que você deve entender para parar de tratar o Typescript como uma barreira e começar a vê-lo como uma ferramenta. Porque ele é poderosíssimo, e vai muito além de tipar tudo como `any` pra fazer o console parar de te perturbar."
tags = [ "typescript" ]
categories = [ "typescript" ]
+++

Existem 3 features que você deve entender para parar de tratar o Typescript como uma barreira e começar a vê-lo como uma ferramenta. Porque ele é poderosíssimo, e vai muito além de tipar tudo como `any` pra fazer o console parar de te perturbar.

## 1. Type Guards

De acordo com a documentação oficial:

> Um type guard é uma expressão que performa uma checagem que garante que o tipo está de acordo com o escopo definido.

_“A type guard is some expression that performs a runtime check that guarantees the type in some scope.” —_ [_typescriptlang.org_](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

O que exatamente isso significa? Com essa ferramenta, podemos afunilar as possíveis tipagens que queremos receber de nossos objetos. Criamos uma forma muito simples de assegurar uma segurança de tipos em nosso código, nada de receber algo que não estávamos esperando.

Então como podemos criar nossas próprias type guards?

Vamos ver um exemplo usando a ferramenta typeof, já nativa do Javascript:

```ts
class Human {
	breathe()
}

class Robot {
	calculate()
}

function createEntity(entity: Human | Robot) {
  if (typeof entity.breathe === 'function') {
    entity.breathe()
  }

  if (typeof entity.calculate === 'function') {
    entity.calculate()
  }
}
```

Ao escrever este código acima, imediatamente recebemos os erros:

- `Property 'breathe' does not exist on type 'Human | Robot'. Property 'breathe' does not exist on type 'Robot'.(2339)`
- `Property 'calculate' does not exist on type 'Human | Robot'. Property 'calculate' does not exist on type 'Human'.(2339)`

Então antes mesmo de rodar nosso código, recebemos um erro importante: Alguns dos métodos descritos não podem existir em cada tipo que a minha função recebe. Isso porque meu argumento recebe um tipo de união entre Human e Robot. Então a minha implementação não satisfaz a definição da minha função.

Vamos criar então nossos type guards para resolver esse problema:

```ts
function isHuman(entity: Human | Robot): entity is Human {
  return 'breathe' in entity
}

function isRobot(entity: Human | Robot): entity is Robot {
  return 'calculate' in entity
}
```

Com essas funções básicas, eu consigo checar se a propriedade especificada pertence ao objeto.

E como type guards tem seu próprio escopo, o que acontece dentro de cada bloco de função terá seu check executado sem interferir no que acontece fora dela. O tipo de entity permanece unknown.

E agora posso reescrever aquela função:

```ts
function createEntity(entity: Human | Robot) {
  if (isHuman(entity)) {
    entity.breathe()
  }

  if (isRobot(entity)) {
    entity.calculate()
  }
}
```

## 2. Keyof

Utilizando essa keyword nós podemos criar dinanismo à nossas funções de uma maneira muito interessante.

Vamos ver este exemplo:

```ts
interface MenuOptions {
  start: boolean
  pause: boolean
  stop: boolean
}

type ChosenOption = keyof MenuOptions

function choose<T extends ChosenOption>(key: T, value: MenuOptions[T]) {
  console.log(`Logger: ${key} is set to ${value}`);
}
```

Aqui temos uma interface que define algumas opções de menu e um tipo que define que opção nós escolhemos a partir da key (chave) da interface, no caso são start, pause, stop.

E abaixo temos uma função de logs chamada choose que recebe um tipo T genérico, que extende o ChosenOption e um valor que deve se adequar aos valores das keys de MenuOptions. Nesse caso, só temos booleans.

Então fazendo alguns testes, veremos que:

```ts
console.log(choose('start', true)) // Logger: start is set to true
console.log(choose('pause', false)) // Logger: pause is set to false
console.log(choose('stop', 100)) // Erro: Argument of type 'number' is not assignable to parameter of type 'boolean'
```

Agora temos uma função que satisfaz a nossa segurança de tipagem e que é extensível a partir da nossa interface.

## 3. Template Literal Types

Às vezes nós não precisamos de tipos ultra complexos nem criar um monte de definição específica, às vezes nós precisamos de algumas definições em string para mapear IDs, ações externas ao nosso código, tags que devem ser expostas em texto, etc.

Para isso, podemos usar os template literal types, que são baseados em string literals para expandir nossa forma de trabalhar com strings através de union types.

Vamos ver alguns exemplos:

```ts
type Strings = 'greetings' | 'welcome_text' | 'goodbyes'
type Languages = 'pt_br' | 'en_us' | 'en'

const LocaleGreetings = `${Languages}_${Greetings}`
```

Agora, de forma simples, temos vários novos tipos preparados a serem usados. Alguns exemplos: pt_br_greetings, en_goodbyes, etc.

Outro exemplo é quando queremos receber uma informação já bem descritiva. Imagine que preciso receber um evento que modifica dados no meu banco, mas em três diferentes instâncias: quando inserimos um dado, quando atualizamos um dado ou quando deletamos um dado.

Nosso código usando template literals:

```ts
type EventMethods = 'INSERT' | 'UPDATE' | 'DELETE'

interface Event {
	action: string
	method: EventMethods
}
```

Em vez de aceitar apenas strings genéricas e checar dentro do meu código se elas são válidas ou não, eu defino exatamente o que quero receber e deixo o runtime check fazer o trabalho por mim.


## Conclusão

Espero que tenham curtido o que eu trouxe hoje. Caso queiram ver esse conteúdo em vídeo: [Video no Youtube](https://www.youtube.com/watch?v=_PT-TBcb5Nw)
