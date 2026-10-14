import {cpSync,mkdirSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=dirname(fileURLToPath(import.meta.url));
const out=join(root,'dist');
mkdirSync(out,{recursive:true});
for(const name of ['index.html','styles.css','app.js','images','fonts','privacidade.html','404.html','favicon.svg','robots.txt','sitemap.xml']){
 cpSync(join(root,name),join(out,name),{recursive:true});
}
console.log('Cópia de publicação preparada em dist/. O index.html original permanece na raiz.');
