"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Fisting SP",
    handle: "5 dias",
    avatarFallback: "FS",
    review: "Italo é um querido, educado, safado na medida, e fez uma das melhores sessões de fisting da minha vida. Sabe exatamente o que fazer, tem muita experiência. Lugar limpo e muito confortável. Já vou virar fixo.",
    reply: null,
  },
  {
    name: "AnonimoSpT",
    handle: "2 semanas",
    avatarFallback: "AS",
    review: "Vários brinquedos, sabe usa-los, sabe fistar e inicar um passivo. Muito putao e delicioso. Chupa um cu dando tesao. Sabe arrombar, \"piss inside\"...vou repetir",
    reply: null,
  },
  {
    name: "Edu",
    handle: "3 semanas",
    avatarFallback: "E",
    review: "Que delícia de carioca! Gosta do que faz, e faz com vontade. Fez tudo o que combinamos previamente, sem frescuras. Uma rola e bunda de outro planeta. Voltarei mais vezes, com certeza.",
    reply: null,
  },
  {
    name: "O Gato Puto",
    handle: "4 semanas",
    avatarFallback: "GP",
    review: "Que experiência sensacional! Um putão de confiança! Me deixou confortável e a vontade para ir me soltando e me fez de vadia exatamente como pedi! Sai com a bucetinha arrombada e leitada, me sentindo uma fêmea bem vadia",
    reply: null,
  },
  {
    name: "Padre Hercilio",
    handle: "4 semanas",
    avatarFallback: "PH",
    review: "Sou padre da Igreja de verdade e não é segredo que os padres são tudo safado e eu tbm. Esse Italo me atraiu muito. Gostaria de abençoar ele com uma água benta especial: não aquela água benta comum, mas a água benta que vai jorrar do meu jato pau.",
    reply: null,
  },
  {
    name: "Mineiro em SP",
    handle: "4 semanas",
    avatarFallback: "MS",
    review: "Italo é um puta gostoso. Desde o olhar ate os pés. E o sotaque é um charme. Domina bem, manda na situação. Alargou meu cu até onde eu aguentei e depois ainda ficou uma hora metendo sem gozar. Eu teria ficado a noite toda com a pica dele fudendo meu rabo de tão bem que ele mete. Mas da próxima vez eu vou querer ir até onde ele não aguentar mais.",
    reply: null,
  },
  {
    name: "Luca",
    handle: "1 mês",
    avatarFallback: "L",
    review: "Muito simpático e gosta de entender o que você quer, realmente domina e usa bem, ansioso pra próxima vez. Tem tantos brinquedos pra usar que até me surpreendi",
    reply: null,
  },
  {
    name: "André",
    handle: "2 meses",
    avatarFallback: "A",
    review: "Ainda vou ter a honra de me ajoelhar aos seus pés e agradecer por essa oportunidade",
    reply: null,
  },
  {
    name: "Fan",
    handle: "2 meses",
    avatarFallback: "F",
    review: "Curti cada instante desses 60 min. Ele é longo e gostoso. Também é educado, gentil, confiável, no pré e o no pós atendimento. Durante a foda, o senhor da situação e eu sua serva. Apanhei na bunda até chorar e pedir pra parar. Mamei muito a rola, levei mijão no cu, cuspe na boca e claro, muita rola e porra no cu no final. Gozei com ele chupando meus mamilos e dedando meu cuzinho. Um tesão e um prazer muito grande, que recomendo demais. Vocês não vão se arrepender!",
    reply: null,
  },
  {
    name: "Manoel",
    handle: "5 meses",
    avatarFallback: "M",
    review: "Italo é uma pessoa excepcional, sem erro. Tudo com ele vale a pena .... Um ativo com pegada mas também com envolvimento Tem pelo menos 5 anos que o conheço...",
    reply: null,
  },
  {
    name: "Sub pc",
    handle: "5 meses",
    avatarFallback: "SP",
    review: "Foi uma foda incrível!!!! O melhor com que eu já saí! Com certeza irei em outras oportunidades",
    reply: null,
  },
  {
    name: "Copa",
    handle: "7 meses",
    avatarFallback: "C",
    review: "Valeu a pena conhecer . Atencioso e bem safado.",
    reply: null,
  },
  {
    name: "Bezerrando",
    handle: "7 meses",
    avatarFallback: "B",
    review: "Esse é um gostoso que me desatina. O fisting, os brinquedos, a pele da pica roçando no meu cu ... fenomenal. Fora o leite que é uma delícia e vale cada gota. Recomendo.",
    reply: null,
  },
  {
    name: "Fabio",
    handle: "10 meses",
    avatarFallback: "F",
    review: "Um cara super profissional, sabe realizar fetiches e também sabe ser carinhoso e educado. Sou tímido e ele me deixou super a vontade e confortável. Saí com ele algumas vezes e cada vez é melhor do que a outra. Se você quer um homem que te pegue de jeito mas que também sabe te dar carinho, o Italo é esse cara. Perfeito!!!",
    reply: null,
  },
  {
    name: "👀",
    handle: "10 meses",
    avatarFallback: "👀",
    review: "Italo é uma pessoa maravilhosa e quando o assunto é fetiche é o único que conheci que realmente sabe fazer, além de ter um acervo de brinquedos sexuais deliciosos Quando ele nos surpreende é de ficar louco, tipo botar na coleira mandar ajoelhar e te levar até a porta pra receber o entregador do Zé delivery ou quando do nada ele te amarra todo e te leva ao delírio (claro se a pessoa gostar) vale Muito a pena",
    reply: null,
  },
  {
    name: "Pedro",
    handle: "11 meses",
    avatarFallback: "P",
    review: "O Italo foi maravilhoso, cumpriu tudo que combinamos. Ele é muito simpático, cheguei meio sem jeito, pois, queria experimentar alguns fetiches e ele fez com maestria, conduzindo a situação e me dominando. Quando percebi ele já estava todo dentro de mim. Super recomendo. Obrigado Cara. Bjão",
    reply: null,
  },
  {
    name: "Lucas",
    handle: "11 meses",
    avatarFallback: "L",
    review: "Um tesão. Cara bacana e gente fina. Com certeza 10/10.",
    reply: null,
  },
  {
    name: "passrj",
    handle: "11 meses",
    avatarFallback: "P",
    review: "soube como conduzir um iniciante excelente atendimento recomendo a todos !",
    reply: null,
  },
  {
    name: "Jota",
    handle: "11 meses",
    avatarFallback: "J",
    review: "Hoje ganhei um mestre. Um homem apaixonante. Risco é esse: vc pode se apaixonar! Italo é tudo isso que disseram aí é tudo que não dá para descrever. Um macho com pegada e que beija como ninguém.",
    reply: null,
  },
  {
    name: "MARCOS PUTA",
    handle: "11 meses",
    avatarFallback: "MP",
    review: "Estou cheio de tesão pra fazer uma visita, e ter esse atendimento, de qualidade, que todos tiveram.",
    reply: null,
  },
  {
    name: "Renan",
    handle: "0 anos",
    avatarFallback: "R",
    review: "De 0 a 10, a note é 11. EXCELENTE",
    reply: null,
  },
  {
    name: "João",
    handle: "1 ano",
    avatarFallback: "J",
    review: "Se você curte um bom fetiche e tem receio de realizar. Ítalo é o cara! Lindo pra caramba, cheiroso, pauzudo, metedor, calmo mas quando tem que forte, sabe te deixar maluco. Impressionado com ele e com certeza já virei assíduo. Se eu indico? 1000%! Impossível se arrepender.",
    reply: {
      name: "Italo Santos",
      handle: "0 anos",
      avatarFallback: "IS",
      text: "Você que é uma delícia 🤤",
    },
  },
  {
    name: "ADV",
    handle: "1 ano",
    avatarFallback: "A",
    review: "Me fez de puta. Me deu um Pau amanhecido pra mamar. Eu queria mais, ele chamou um amigo e ambos revesaram meu rabo. O amigo alargava e ele metia. Quase pedi uma DP, mas faltou coragem. Da próxima eu quero!!!! Uma delícia de homem!!!!",
    reply: {
      name: "Italo Santos",
      handle: "0 anos",
      avatarFallback: "IS",
      text: "😛",
    },
  },
  {
    name: "Pedro",
    handle: "1 ano",
    avatarFallback: "P",
    review: "Dominador sáfado na hora do sexo e muito simpático e atencioso antes e depois super recomendo",
    reply: {
      name: "Italo Santos",
      handle: "1 ano",
      avatarFallback: "IS",
      text: "Foi recíproco a simpatia né chefe",
    },
  },
  {
    name: "Robson",
    handle: "1 ano",
    avatarFallback: "R",
    review: "Matei a saudade deste moreno delicioso. Além do ótimo bate-papo de sempre. Te gosto, meu lindo!",
    reply: {
      name: "Italo Santos",
      handle: "1 ano",
      avatarFallback: "IS",
      text: "Você que é uma delícia super simpático",
    },
  },
  {
    name: "Adriano",
    handle: "1 ano",
    avatarFallback: "A",
    review: "O Ítalo é simplesmente o melhor garoto de programa que eu já fiquei. Além dele ser lindo, charmoso, gostoso, safado, putão e muito, mas muito bom de cama, ele é um ser humano sensacional. Cara bom de papo, inteligente, educado, honesto, simpático e extremamente gentil. Sou fã dele, pude realizar vários fetiches e só tive experiências maravilhosas. Super indico o trabalho dele.",
    reply: null,
  },
  {
    name: "Garoto novo",
    handle: "1 ano",
    avatarFallback: "GN",
    review: "Estive com ele, e foi sensacional. O beijo dele é maravilhoso, depois transamos intensamente.",
    reply: null,
  },
  {
    name: "Lucas",
    handle: "1 ano",
    avatarFallback: "L",
    review: "Pessoa maravilhosa, paciente, delicioso excelente profissional, repetiria sempre",
    reply: null,
  },
  {
    name: "Ricardo safado",
    handle: "1 ano",
    avatarFallback: "RS",
    review: "Estive com esse boy no final de semana passado, ele é incrível foi a minha primeira vez realizando fetiche, ele sabe o q está fazendo, foi muito atencioso e educado e dominador ao mesmo tempo . Ele tem uma pegada gostosa e uma rola grande e deliciosa",
    reply: null,
  },
  {
    name: "Leo",
    handle: "1 ano",
    avatarFallback: "L",
    review: "Um boy perfeito. Pra quem gosta de testar seus limites com fetiches é simplesmente o melhor que encontrei. Vale a pena cada investimento.",
    reply: null,
  },
  {
    name: "Novinho Goiânia",
    handle: "1 ano",
    avatarFallback: "NG",
    review: "O cara é o maior gostoso, me tratou como um príncipe, e sabe meter e levar ao delírio, super recomendo",
    reply: null,
  },
  {
    name: "Anônimo",
    handle: "1 ano",
    avatarFallback: "A",
    review: "Ótimo atendimento, muito gato e um ótimo dominador",
    reply: null,
  },
  {
    name: "B",
    handle: "1 ano",
    avatarFallback: "B",
    review: "Esse homem é surreal de gostoso, te deixa a vontade, ele te controla, mas ele entende o que vc quer… que delícia!!! Quero mais vezes…",
    reply: null,
  },
  {
    name: "Ignacio",
    handle: "1 ano",
    avatarFallback: "I",
    review: "Uma delícia. Educado e safado ao mesmo tempo. Pau gostoso e soca muito.",
    reply: null,
  },
  {
    name: "Sandro",
    handle: "1 ano",
    avatarFallback: "S",
    review: "Ele é uma pessoa muito especial, muito paciente, educado e carinhoso, esteve comigo sem pressa, foi um momento inesquecível, me deixou todo doido kkkk",
    reply: null,
  },
  {
    name: "Fã_BH",
    handle: "2 anos",
    avatarFallback: "FB",
    review: "Há dois meses estive com ele em BH. Hoje 05/12 me mandou msg e disse q estava aqui. Não perdi tempo. O que já tinha sido ótimo no primeiro encontro, agora foi excelente. Atendimento de primeira, prazeroso e cheio de tesao e dominação . Macho gostoso, dominador. Não erro mais! Vlw meu lindo.",
    reply: null,
  },
  {
    name: "Ivan",
    handle: "2 anos",
    avatarFallback: "I",
    review: "Pessoa especial, alto astral, transmite alegria de viver e inspira adorável gostosura ? tesão de putaria com respeito e carinho e super profissional. Gosta do que faz. E tem um sorriso lindo e sedutor. Vida longa. Até breve ?",
    reply: null,
  },
  {
    name: "Igorz",
    handle: "2 anos",
    avatarFallback: "I",
    review: "Bom papo, gostoso, educado, macho! E que pegada! Quero mais vezes!",
    reply: null,
  },
  {
    name: "BH",
    handle: "2 anos",
    avatarFallback: "B",
    review: "Cara muito massa! Simpático pra caramba, extremamente gostoso. Não estava conseguindo dar pra ele, mas ele foi me deixando com tesao até conseguir meter até o fundo. Estou até agora sentindo. Espero que volte logo a BH.",
    reply: null,
  },
  {
    name: "Leo",
    handle: "2 anos",
    avatarFallback: "L",
    review: "Excelente atendimento. Tudo perfeito, assim como as informações que estão no site. Fotos reais, macho, dominador se você quiser e também só um bom comedor se quiser apenas transar. Mas é um cara completo, um tesao. Atendimento único, sem correria, sem ser mecânico. Se é a sua primeira vez vai nele, se é a segunda ou terceira com boy, vai nele de novo por que o atendimento é diferenciado, é próprio.",
    reply: null,
  },
  {
    name: "Luis",
    handle: "2 anos",
    avatarFallback: "L",
    review: "O Ítalo é ótimo, vale muito a pena. Quero mais.",
    reply: null,
  },
  {
    name: "Paulo",
    handle: "2 anos",
    avatarFallback: "P",
    review: "perfeito.....carinhoso e violento......tudo na medida certa.. Quero mais.",
    reply: null,
  },
  {
    name: "Jose",
    handle: "2 anos",
    avatarFallback: "J",
    review: "Perfeito.......Uma mistura de carinhoso e intenso.",
    reply: null,
  },
  {
    name: "Eu",
    handle: "2 anos",
    avatarFallback: "E",
    review: "Não tenho nem palavras pra descrever esse homem brilhante, ele é simplesmente incrível e muito confiável e faz um sexo gostoso como ninguém,,muito atencioso, carinhoso e paciente. Ele é tudo de bom!!!!",
    reply: null,
  },
  {
    name: "Lucas",
    handle: "2 anos",
    avatarFallback: "L",
    review: "Lindo , muito simpático , me deixou super a vontade a ponto de eu não saber se queria conversar mais ou fuder mais !! E gosta mesmo de meter !!",
    reply: null,
  },
  {
    name: "Fulano.",
    handle: "2 anos",
    avatarFallback: "F",
    review: "Muito gostoso esse mlk, sou casado estava afim de sentir uma parada diferente e ele me surpreendeu. Quero de novo?",
    reply: null,
  },
  {
    name: "Anonimo",
    handle: "3 anos",
    avatarFallback: "A",
    review: "O Italo e sensacional. Alem de ser um cara muito gente boa e simpático, trocamos uma ideia maneira, ele tem um bom papo. E no sexo ele é um absurdo de gostoso, uma das melhores transas da minha vida! Me levou a loucura.",
    reply: {
      name: "Alex",
      handle: "2 anos",
      avatarFallback: "A",
      text: "Ítalo é muito gostoso e te deixa a vontade. Realiza como ninguém suas fantasias. Ainda é super educado. Vale a pena.",
    },
  },
  {
    name: "K",
    handle: "3 anos",
    avatarFallback: "K",
    review: "Sem comentários É um gostoso, educado e mete muito bem. Pauzudo! Gozei muitooooooooooooo",
    reply: null,
  },
  {
    name: "Anônimo Mzh",
    handle: "3 anos",
    avatarFallback: "AM",
    review: "Cara gente fina, educado, com um pau muito gostoso e bem duro. Pica boa de sentar. Recomendo a todos.",
    reply: null,
  },
  {
    name: "Carlos - Niterói",
    handle: "3 anos",
    avatarFallback: "CN",
    review: "Bom! Hj fui conhecer o Dom Ítalo Ele é lindo, sorriso maroto, parece um modelo! Conversamos um pouco antes! Pois é a primeira vez, que experimento isso! Ele colocou um aparelho que dá choque no cú, deixou ele piscando o tempo todo! Depois colocou uns utensílios nas mãos e pés, me amordacou (tudo com meu consentimento), depois me comeu 2 vezes, até ele gozar! Que cara gostoso! Ele bj os meus mamilos e mordiscou-os, deixando extasiado! Quero-o de novo!",
    reply: null,
  },
  {
    name: "@",
    handle: "3 anos",
    avatarFallback: "@",
    review: "Acabei de sair do apto Ítalo. Ambiente limpo, de fácil acesso e o atendimento dele é ótimo! Foi minha primeira experiência com um fetichista e foi fantástico! Espero poder voltar!",
    reply: null,
  },
  {
    name: "Robson",
    handle: "3 anos",
    avatarFallback: "R",
    review: "Lindo, gostoso, tranquilo, muito gente boa, pegada inigualável. O Ítalo sabe o que faz! Apesar da pouca idade, é um doutos em matéria de dar prazer.",
    reply: null,
  },
  {
    name: "Francisco Rio de Janeiro",
    handle: "3 anos",
    avatarFallback: "FR",
    review: "O que eu mais gostei no Itálo foi tudo, rss. Realmente ele me recebeu muito bem, me deu o que eu queria, e incansável me fez sentir e ter uma experiência única ao lado dele.",
    reply: {
      name: "Gab",
      handle: "2 anos",
      avatarFallback: "G",
      text: "Ele é muito simpático, gostoso e fode muito bem. Eu amei.",
    },
  },
  {
    name: "De outro estado",
    handle: "3 anos",
    avatarFallback: "DO",
    review: "Quando falei a primeira com o Ítalo eu pedi pra ele fazer uns fetiches bem loucos comigo. Fui até ele acreditando que ia ser como os outros que prometem e não cumprem...Ele cumpriu tudo o que combinamos e muito mais. O cara é fantástico! Super educado e simpático, mas sabe impor respeito na hora do sexo. Se eu morasse na mesma cidade com ele ia querer sair toda semana com ele hahaha. Ah, ele leva a segurança do cliente bem a sério e sabe respeitar seus limites. Recomendo pra caramba!",
    reply: null,
  },
  {
    name: "Luiz",
    handle: "3 anos",
    avatarFallback: "L",
    review: "Garoto e bom demais",
    reply: null,
  },
  {
    name: "Putao bare",
    handle: "3 anos",
    avatarFallback: "PB",
    review: "Chupou meu cu demorado, meteu a mão na minha cuceta, me deu um mijada dentro e finalizou com um leitada dentro no pelo.",
    reply: null,
  },
  {
    name: "Ale",
    handle: "3 anos",
    avatarFallback: "A",
    review: "Estive com ele semana passada, pedi uma sessão de cbt, com direito a chicote, vela quente e choque, tudo isso com as mãos e os pés algemados? cara, que tesão!",
    reply: null,
  },
  {
    name: "Gabriel Castro",
    handle: "3 anos",
    avatarFallback: "GC",
    review: "Fui convidado para atender um cliente com Don Ítalo em São Paulo SP, me surpreendeu com o excelente atendimento, para quem procura humilhação, dominação o garoto está de parabéns, ainda não conheçi ninguém do nível dele. Satisfação garantida, conduz o atendimento sem ser mecânico e de qualidade.",
    reply: null,
  },
  {
    name: "Leh",
    handle: "3 anos",
    avatarFallback: "L",
    review: "Ítalo super gente boa, bom de papo e atraente, foi a minha primeira experiência como Sub com ele e gostei demais, soube me dominar muito bem e meu muito prazer! Pra quem é iniciante como eu, super recomendo!!!",
    reply: null,
  },
  {
    name: "Mineiro",
    handle: "3 anos",
    avatarFallback: "M",
    review: "Já estive com Ítalo duas vezes. Além de saber brincar direitinho, ele tem um papo muito agradável. Domina muito bem e tem uma boa coleção de acessórios.",
    reply: null,
  },
  {
    name: "Branquinha",
    handle: "3 anos",
    avatarFallback: "B",
    review: "Virei puta de vestidinho vagabundo. Apanhei como merecia. Levei porra na cara. Só fiz o que ele mandava. Gostei tanto de ser tratada assim que voltei e não queria ir embora. Me arregaçou. Domínio sedutor. Ítalo é daqueles personagens da literatura erótica e sdm. Nível internacional. Ele é escavador de desejos não ditos.",
    reply: null,
  },
  {
    name: "Putão",
    handle: "3 anos",
    avatarFallback: "P",
    review: "Foda sensacional, já fiz várias sessões de dominação e putaria sem limites com Italo. Sabe dominar, humilhar, soca e fista até arrombar meu cu. Já me deu muita porra e mijo. Sem contar q ele tem todos os brinquedos e acessórios q eu podia imaginar. Até anaconda gigante ele enfiou em mim. Recomendo pra quem tem experiência e também pra quem quer ser iniciado, porque além de muito puto, he é educado, limpo e seguro.",
    reply: null,
  },
  {
    name: "Rogfaria",
    handle: "3 anos",
    avatarFallback: "R",
    review: "Se você gosta de ser tratado como puta, apanhar e tomar leite, esse é o cara! Macho, bonito, gostoso, educado e puto. Super recomendo!",
    reply: null,
  },
  {
    name: "Gato bh 32a",
    handle: "3 anos",
    avatarFallback: "GB",
    review: "Lindo, educado, respeita os limites e sabe dominar. Não vejo a hora dele voltar pra BH pra servi-lo novamente. Bebi mijao, me vestiu de puta, usei coleirinha, algemas, me exibiu pro pessoal da República como sua putinha, fiz video. Tesão. Qro denovo hehehe. Saudades lindo.",
    reply: null,
  },
  {
    name: "Lu",
    handle: "3 anos",
    avatarFallback: "L",
    review: "É bem difícil achar um garoto que conheça de verdade bdsm, mas o Ítalo é um mestre no assunto, sem falar que tem ótimos acessórios, e sabe muito bem usar, fiquei o tempo todo babando de tesão, valeu cada centavo...o bom é que no dia seguinte vai se olhar no espelho e lembrar....",
    reply: null,
  },
  {
    name: "Diego-Florwsta-Bh-Rj",
    handle: "4 anos",
    avatarFallback: "DF",
    review: "Ele MOLEQUE melhor que nas fotos.e vídeos.... Melhor que.vc magina.. Recomemdo",
    reply: null,
  },
  {
    name: "Luixx",
    handle: "4 anos",
    avatarFallback: "L",
    review: "Sai com ele ontem, melhor de todos.",
    reply: null,
  },
  {
    name: "Cd 25a sp",
    handle: "4 anos",
    avatarFallback: "C",
    review: "Encontrei Dom Ítalo no último sábado e nunca me senti tão humilhada na minha vida. Me tratou igual uma puta de verdade e arrombou bem minha cuceta. Sem falar que o pau dele é perfeito, o local é ótimo e os acessórios são excelentes para quem quer ficar cada vez mais largo",
    reply: null,
  },
  {
    name: "F",
    handle: "4 anos",
    avatarFallback: "F",
    review: "Demais o Ítalo!",
    reply: null,
  },
  {
    name: "sub Jock",
    handle: "4 anos",
    avatarFallback: "SJ",
    review: "O Ítalo é Perfeito e Inesquecível ! Não se iluda com a pouca idade dele, porque ele vai te surpreender. Pegada boa e perfeita, nem mais nem menos do que deveria ser e Faz com vontade. Impossível você ficar sem vontade de: quero mais.",
    reply: null,
  },
  {
    name: "Bebe",
    handle: "4 anos",
    avatarFallback: "B",
    review: "Com esse cara realizei meu sonho de ser a passiva mais puta do mundo. Inesquecível.",
    reply: null,
  },
  {
    name: "Batman",
    handle: "4 anos",
    avatarFallback: "B",
    review: "Melhor cara que já sai. Podem Ir sem medo, o cara vai sabe tratar um Viado do jeito que viado merece.",
    reply: null,
  },
  {
    name: "Anonimo",
    handle: "4 anos",
    avatarFallback: "A",
    review: "O Ítalo é daquelas pessoas que deixa saudades. Super educado, safado, nada apressado, me fez gozar sem eu nem encostar no pau. Fala bastante putaria e domina muito bem. Isso sem falar nos inúmeros brinquedos que ele tem na casa dele",
    reply: null,
  },
  {
    name: "Garoto safado",
    handle: "4 anos",
    avatarFallback: "GS",
    review: "Tesao de macho deve levar o puto a loucura. Eu queria ser obsecrados desse macho.",
    reply: null,
  },
  {
    name: "Pankado",
    handle: "4 anos",
    avatarFallback: "P",
    review: "Sempre me oferece um adicional bom, pra puxar no pau. Chupa bem um cu, bomba bem e tem brinquedos gostosos. Tá sempre f1 e gosta do que faz. Nota 10.",
    reply: null,
  },
  {
    name: "Trabalha em ipanema",
    handle: "5 anos",
    avatarFallback: "TI",
    review: "Piroca gostosa , baste leite soca gostoso e carinhoso .Quando posso vou sempre fude com ele pica muito gostosa",
    reply: null,
  },
  {
    name: "Italo",
    handle: "5 anos",
    avatarFallback: "I",
    review: "leito farto",
    reply: null,
  },
  {
    name: "Rodrigo",
    handle: "5 anos",
    avatarFallback: "R",
    review: "Que pau gostoso de mamar. Eh grande mesmo. E jorra bem.",
    reply: null,
  },
];


export function Testimonials() {
  const [newReview, setNewReview] = useState("");
  const [newName, setNewName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName && newReview) {
      console.log("Nova avaliação:", { name: newName, review: newReview });
      // Aqui, futuramente, a avaliação seria enviada para moderação
      setNewName("");
      setNewReview("");
    }
  };


  return (
    <section className="py-16 md:py-24 bg-card border-y">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl md:text-4xl">
            O que nossos clientes dizem
          </h2>
          <p className="mx-auto max-w-2xl mt-4 text-muted-foreground">
            Opiniões reais de quem já provou e aprovou nossos sabores.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarFallback>{testimonial.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.handle}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-muted-foreground">{testimonial.review}</p>
                {testimonial.reply && (
                   <div className="mt-4 ml-8 p-4 bg-muted/50 rounded-lg">
                       <div className="flex items-center gap-4 mb-2">
                         <Avatar className="w-8 h-8">
                            <AvatarFallback>{testimonial.reply.avatarFallback}</AvatarFallback>
                         </Avatar>
                         <div>
                            <p className="font-semibold">{testimonial.reply.name}</p>
                            <p className="text-xs text-muted-foreground">{testimonial.reply.handle}</p>
                         </div>
                       </div>
                       <p className="text-sm text-muted-foreground">{testimonial.reply.text}</p>
                   </div>
                )}
                 <Button variant="link" size="sm" className="p-0 h-auto mt-2">⤷ Responder</Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 max-w-2xl mx-auto">
          <h3 className="font-headline text-2xl md:text-3xl text-center mb-8">
            Deixe sua Avaliação
          </h3>
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Seu Nome</Label>
                  <Input
                    id="name"
                    placeholder="Ex: João Silva"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="review">Sua Avaliação</Label>
                  <Textarea
                    id="review"
                    placeholder="Conte-nos o que você achou..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Enviar para Moderação
                </Button>
                 <p className="text-xs text-center text-muted-foreground">
                    Sua avaliação será enviada para moderação antes de ser publicada.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  );
}
