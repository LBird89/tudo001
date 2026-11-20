シンプルToDo（情報デザイン授業用・修正前サンプル）

【フォルダ構成】
todo-app/
  index.html        画面の内容
  style.css         見た目
  script.js         動作
  images/
    notebook.svg    ノートのイラスト

【使い方】
1. index.html をブラウザで開いて動作を確認します。
2. Netlify Drop に todo-app フォルダをドラッグ＆ドロップして公開します。
3. 改造したら、公開済みサイトの管理画面から再デプロイします。

【注意】
・追加したToDoはブラウザのlocalStorageに保存されます。
・別の端末や別のブラウザとはToDoデータを共有しません。
・画像は images/notebook.svg の相対パスで参照しています。
・静的なWebアプリなのでビルド操作は不要です。
