import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.ttf':'font/ttf','.woff2':'font/woff2','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
const publicFiles=new Set(['index.html','styles.css','app.js','privacidade.html','404.html','favicon.svg','robots.txt','sitemap.xml']);
http.createServer((req,res)=>{
 let pathname;let requestUrl;try{requestUrl=new URL(req.url,'http://localhost');pathname=decodeURIComponent(requestUrl.pathname);}catch{res.writeHead(400);res.end('Bad request');return;}
 let file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
 if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 const relative=path.relative(root,file).replaceAll(path.sep,'/');
 const publicAsset=/^(images|fonts)\/[\w.-]+\.(webp|png|svg|woff2|ttf|txt)$/i.test(relative);
 let status=200;if((!publicFiles.has(relative)&&!publicAsset)||!fs.existsSync(file)||!fs.statSync(file).isFile()){file=path.join(root,'404.html');status=404;}
 res.writeHead(status,{'Content-Type':types[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'no-cache'});
 if(requestUrl.searchParams.get('nojs')==='1'&&path.extname(file)==='.html'){res.end(fs.readFileSync(file,'utf8').replace('<script defer src="app.js"></script>',''));return;}
 fs.createReadStream(file).pipe(res);
}).listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
