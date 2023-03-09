# 💡 Fxbuilder

Esta package simplifica a gestão do CFX `manifest` em projetos de FiveM e RedM, com uma API fácil de usar, economizando tempo e esforço. Ele garante uma configuração correta e reduz potenciais erros.

## Instalação 💾

```bash
    npm install @softjunk/fxbuilder
```

## 📃 API

#### parse(source: string): IParsedObject

Analisa um arquivo compactado de `manifest` e o transforma em um objeto `manifest`.

```js
import { parse } from "@softjunk/fxbuilder";

const result = parse({
  fx_version: "adamant",
  game: "gta5",
  client_scripts: ["main.lua", "main2.lua"],
});
```

#### stringify(object: IParsedObject): string

Recebe um objeto `manifest` e o transforma em um arquivo compactado de `manifest`.

```js
import { stringify } from "@softjunk/fxbuilder";

const result = stringify(`
        fx_version "boudacious"
        game "rdr3"

        client_scripts {
            "client.lua",
            "client_two.lua"
        }
    `);
```

## Solução de problemas ⚠️

Se você encontrar algum problema com o Cfx Launcher, verifique as perguntas frequentes ou entre em contato com a equipe de suporte (softjunkdevs@gmail.com) 📞
