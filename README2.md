

"appPort": 8330

// Port変更用に追加
server: {
  port: 8330, // デフォルト: 3000
  host: '0.0.0.0', // デフォルト: localhost
},


#### dockerイメージの再ビルド

```
$ docker-compose stop
$ docker-compose rm
$ docker-compose build
$ docker-compose up -d
$ sh ./bin/createLocalDb.sh
```


#### element-ui(server) 起動
```
  serverMiddleware: ['~/api/index.js'],

  // Port変更用に追加
  server: {
    port: 8331, // デフォルト: 3000
    host: '0.0.0.0', // デフォルト: localhost
  },

```