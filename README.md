```text
              _     _                       _       _       _ _             _ _ 
__      _____| |__ | |_ _ __ __ _ _ __  ___| | __ _| |_ ___(_) |_       ___| (_)
\ \ /\ / / _ \ '_ \| __| '__/ _` | '_ \/ __| |/ _` | __/ _ \ | __|____ / __| | |
 \ V  V /  __/ |_) | |_| | | (_| | | | \__ \ | (_| | ||  __/ | ||_____| (__| | |
  \_/\_/ \___|_.__/ \__|_|  \__,_|_| |_|___/_|\__,_|\__\___|_|\__|     \___|_|_|
                                                                                
```

# webtranslateit-cli
Download your translation files from [webtranslateit](https://webtranslateit.com/en) to your project by using your trusted CLI!


## INSTALATION
Webtranslateit CLI requires [Node.js](https://nodejs.org/en/) version 8 or above. To install, run the following command from your terminal
```
npm install webtranslateit-cli -g
```

### ADD IT INTO YOUR PROJECT
You can also install it as dev dependency in your project
```
npm install -D webtranslateit-cli
```
And create a script in your  `package.json` to run it as needed
```json
"scripts": {
    "wticli": "wti run --api-key <my-api-key> --output-path ./translations"
}
```

## USAGE
Run `wti --help` for farther information:
```
wti run [options]

Options:
  -a, --api-key <apiKey>         The public/private API key of the project (mandatory).
  -o --output-path <outputPath>  The path where the translations are gonna be downloaded.
                                 By default is the current directory (optional)
  -h, --help                     output usage information
```

## LICENSE
MIT. See [LICENSE](https://github.com/gusbueno/webtranslateit-cli/blob/master/LICENSE) for more details.