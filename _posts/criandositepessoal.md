---
layout: post
title: Criando um site pessoal do 0 com HTML5/CSS
categories: Tutoriais
date:   2018-12-31 00:47:55
---

Antes de começar, você precisará de um editor de código. A vantagem do Desenvolvimento Web é que seu lugar de trabalho é o próprio navegador, então os editores são bem leves.

Recomendações:
- Sublime Text 3: É um editor freemium (estilo WinRar, em que o período de testes não expira), editável, extremamente leve. É o que eu uso ao lado de algumas extensões, e são screenshots dele que você verá nesse tutorial.
- Atom: É parecido com o Sublime Text, modular, 100% grátis. Depois de colocar muitas extensões ou com código muito grande pode ficar um pouco mais lento para abrir. Mas possivelmente tem a maior comunidade atual.
- Visual Studio Code: É o editor de código da Microsoft, com nome parecido da sua workstation do universo .NET. Se ver nomes como Visual Studio Community ou diversos, é o programa errado. Acaba ficando com problemas parecidos que o Atom por ser feito na mesma framework (Electron.JS).


Após instalar o editor da sua preferência, abra-o e inicie um novo arquivo. Vou começar explicando o seu index.html:

HTML (Hyper Text Markup Language) é a linguagem de processamento de texto que faz os sites aparecerem na internet. Todos os sites podem ser reduzidos a um arquivo de texto, onde o conteúdo é organizado através de tags. O que você como designer faz é dar sentido (semântica) e diagramar (hierarquia) esse conteúdo.

Por exemplo, o início do meu próprio site:

(print do titulo com descrição)

Foi feito a partir desse código:

```html
<h1>Lara Carvalho</h1>
	<p>Designer e programadora do Rio de Janeiro. Programação para Designers, JavaScript, Open Source, Privacidade, Customização, Produtividade.</p>
```


Onde a tag H1 (headline 1) significa o texto de maior importância na página, meu título, e a tag P (parágrafo) é meu texto de menor importância.

O arquivo que você acabou de criar é o arquivo principal de todo o site, seria possível colocá-lo no ar sem mais nada. Mas ele se pareceria com isso:

(print do código acima sem css)

Você também poderia ter mais de um arquivo .html, criando páginas separadas no seu site ou fazendo partições desse código através de uma framework. Mas, por enquanto um único arquivo .html está bom, porque o site que criaremos será estilo One Page, uma única página com todo o conteúdo.

E seu arquivo precisa ser chamado index.html quando for hospedar seu site, esse é o padrão pela internet, então os provedores de hospedagem já estão configurados para procurar esse arquivo como o principal.

## O que você precisa no seu index.html?

Para especificar que tipo de arquivo estamos criando, é preciso adicionar duas tags importantes: a própria tag HTML.

```html
<html>
</html>
```

Essas tags dizem para seu arquivo de texto que não é um texto qualquer, mas um arquivo que pode ser lido pelo seu navegador. Para ir mais além, estaremos usando a versão mais moderna do HTML, o HTML5. Para especificar essa versão, mude seu código para:

```html
<!DOCTYPE html>
</html>
```

Feito isso, precisaremos configurar outras coisas. Por exemplo, dizer o título da página, em que língua está, e colocá-la responsiva.

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Tutorial Site Pessoal</title>
</head>
</html>
```

Eu criei outra tag html para especificar a língua do site. No caso do português, o código correto é "pt-br", mas em inglês, por exemplo, seria "en". Essa tag é útil porque especifica para aparelhos de texto-para-fala que tipo de língua o site está escrito, facilitando o entendimento de pessoas com deficiência auditiva.

Depois, criamos uma nova tag chamada HEAD. Tudo que está dentro dessa tag não aparece no seu site, apenas são para configurações de SEO, visualizações de dispositivos, e configurações da página. Por exemplo, a tag TITLE não aparece na página em si, mas aparece lá em cima na aba de navegação.

Já a tag META tem vários usos, mas para o atributo name="viewport", vamos dizer para nosso arquivo HTML que queremos que ele preste atenção em que tipos de dispositivos nosso usuário está acessando (seja computador, celular, tablet, etc) e faça nosso conteúdo se ajustar a mesma largura do dispositivo. Isso é um passo para a responsividade, quando os sites se adequam ao dispositivo do usuário e os elementos ajustam seu tamanho e layout.

Agora, vamos escrever o conteúdo em si. A página atual está em branco, e para adicionarmos texto, vamos adicionar uma tag BODY para mostrar o seu site de verdade. Dentro da tag BODY podemos colocar uma TAG de texto principal, para isso escolhi a tag H1.

Seu código deve se parecer com esse:

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Tutorial Site Pessoal</title>
</head>
<body>
	<h1>Olá mundo.</h1>
</body>
</html>
```

Se você abrir seu arquivo index.html em seu navegador, uma página assim deve aparecer:

(print do olá mundo quebrado)

Provavelmente você teve esse mesmo erro. Vamos aprender porque ele acontece e como consertar, mas antes queo explicar como esse código se traduz para a imagem:

- Primeiro expecificamos o tipo de documento, que é HTML5, com as tags DOCTYPE html.
- Dentro da "cabeça" do documento, onde ficam as informações de configuração, dizemos que queremos que a largura do documento seja equivalente a largura do dispositivo, em escala 1.
- Dentro do "corpo" do documento, onde fica todo o conteúdo, criamos uma tag de título de importância 1 e escrevemos "Olá mundo".

Mas aconteceu um erro em que nosso documento não entende bem o "á", apesar de avisarmos para ele que nosso site está em PT-BR. No mundo todo existe uma gama gigantesca de caracteres diferentes, e para que os computadores e seus programas consigam desenhá-los, é preciso dizer que tipo de grupo de caracteres é esse.

No nosso caso, é o UTF-8. Então podemos ir ao documento e adicionar outra tag META, com um atributo chamado CHARSET. Esse atributo diz para o documento exatamente o grupo de caracteres que queremos usar, muito comum em línguas do ocidente.

Adicione dentro do HEAD a seguinte tag:

```html
<meta charset="UTF-8">
```

Agora, se você der _refresh_ no seu index.html, vamos ver que o site aparece corretamente.

(print do olá mundo correto)

Agora que vocês tem seu documento preparado, vamos começar a colocar nosso conteúdo.

Como esse é um site pessoal simples, apenas para falar um pouco sobre vocês e colocar links para seus portfólios, vamos colocar as informações principais. Meu código ficará assim:

```html
<body>
	<h1>Lara Carvalho</h1>
		<p>Designer e programadora do Rio de Janeiro. Programação para Designers, JavaScript, Open Source, Privacidade, Customização, Produtividade.</p>
</body>
```

Essas tags vocês já conheceram, é exatamente igual ao do meu site. Então vou começar a colocar todos os links. Vou adicionar um link para meu Behance:

```html
<ul>
	<li><a href="https://behance.net/laracarvalho">Behance</a></li>
</ul>
```

Temos 3 tags novas para explicar. Começando pela tag UL, que significa Lista sem Ordenação (Unordered List), transforma o conteúdo dentro dela em uma lista em forma de bullets - com aquelas bolinhas ao lado. O que significa que, caso fossemos criar uma Lista Ordenada, com números ao lado de cada item, poderíamos trocar a tag UL pela tag OL.

Mas vamos manter a tag UL já que não queremos ordenar nada. Dentro dela, temos a tag LI. Essa tag significa Item da Lista (List Item), e seu conteúdo mostra exatamente isso. Podemos ter quantos items quisermos, desde que fiquem dentro da nossa tag UL.

Dentro da tag LI, temos outra tag A. Essa tag significa âncora (anchor). Ela especifica um hyperlink, um link para outro lugar da página. Ao adicionar o atributo HREF, estamos dizendo que essa tag é uma _âncora para uma URL_. Ou seja, ali dentro eu coloquei a URL do meu perfil no Behance, essa TAG vai dizer ao documento que, quando alguém clicar nela, ela vai levá-los para esse endereço.

Colocando o nome Behance entre as tags eu mostro o nome do link que a pessoa vai ver antes de clicar. Adicionando esse código ao seu site, podemos ver que ficará assim:

(foto com link)

Agora é só colocar mais tags LI com links para suas redes sociais. Seu BODY deve estar parecido com o meu (com link para o perfil de vocês):

```
<body>
	<h1>Lara Carvalho</h1>
	<p>Designer e programadora do Rio de Janeiro. Programação para Designers, JavaScript, Open Source, Privacidade, Customização, Produtividade.</p>

	<ul>
		<li><a href="https://behance.net/">Behance</a></li>
		<li><a href="https://linkedin.com/">LinkedIn</a></li>
		<li><a href="https://facebook.com/">Facebook</a></li>
		<li><a href="https://instagram.com/">Instagram</a></li>
	</ul>
</body>
```

Antes de finalizar nosso site, quero adicionar um link de contato também. Para que seus futuros clientes possam mandar um email para vocês. Antes de nossa tag UL, vamos adicionar uma outra tag parágrafo:

```html
<p>Gostou do meu trabalho? Peça um orçamento em email@gmail.com.</p>
```

Agora, para fazer o usuário ir direto para seu email, podemos criar uma tag A HREF dentro da tag P:

```html
<p>Gostou do meu trabalho? Peça um orçamento em <a href="mailto:email@gmail.com">email@gmail.com</a>.</p>
```

O "link" mailto:email@gmail.com é uma opção que o HTML disponibiliza para a gente. Ela significa "envie um email para: email destinatário". Troque para o seu email profissional ou pessoal.

Agora, seu site se parecerá com esse:

(imagem site)

E seu código se parecerá com esse:

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Tutorial Site Pessoal</title>
</head>

<body>
	<h1>Lara Carvalho</h1>
	<p>Designer e programadora do Rio de Janeiro. Programação para Designers, JavaScript, Open Source, Privacidade, Customização, Produtividade.</p>

	<p>Gostou do meu trabalho? Peça um orçamento em <a href="mailto:email@gmail.com">email@gmail.com</a>.</p>

	<ul>
		<li><a href="https://behance.net/">Behance</a></li>
		<li><a href="https://linkedin.com/">LinkedIn</a></li>
		<li><a href="https://facebook.com/">Facebook</a></li>
		<li><a href="https://instagram.com/">Instagram</a></li>
	</ul>
</body>
</html>
```


A parte textual do site está pronta, mas ele ainda se parece apenas como um documento de texto. Para adicionar o visual, os estilos, vamos passar para outro documento e outra linguagem: o CSS.

 