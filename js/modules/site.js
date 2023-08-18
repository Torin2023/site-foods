export default function site() {
  console.log('сайт запущен на ', window.location.href);
  console.log(`
            ^__^
            (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
                
`);
  // для работы с файлом db.json заранее запускаем в node.js сервер: npx json-server db.json
  return 'http://localhost:3000/';
}
