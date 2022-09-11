# hdys-live配信

.env.demoを参考に.env-production.env記入

docker-compose-ymlを本番用に修正(DOMAIN,STAGE) nodeコメントアウト

```
docker-compose up -d
```
http://{サーバーのIPアドレス}:8090/control/get?room=movie にアクセス (これでmovieというroomが作れる，ハッシュっぽい?ので出てくるキーは固定)

OBSで rtmp://{サーバーのIPアドレス}:1935/live/ ，キー movie で配信する (さっき作ったルーム名)
