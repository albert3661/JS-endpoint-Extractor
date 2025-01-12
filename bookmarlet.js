# BlackLine Scanner 🔍

This **bookmarklet** helps you scan a webpage and extract all visible URLs and endpoints. 📜

---

## 📋 Bookmarklet Code

Add this code to a new bookmark in your browser:

```javascript
javascript:void(function(){let e=document.createElement('div');e.style.cssText='position:fixed;bottom:0;left:0;width:100%;height:300px;background:#1a1a1a;color:#00ff00;z-index:999999;padding:20px;overflow:auto;font-family:monospace;';e.innerHTML='<h3%20style="color:#00ff00">%F0%9F%94%8D%20BlackLine%20Scanner</h3><div%20id="results">Scanning...</div>';document.body.appendChild(e);let%20currentDomain=window.location.hostname;let%20foundUrls=new%20Set();function%20findUrls(){let%20urls=[];let%20sources=[...document.getElementsByTagName('a'),...document.getElementsByTagName('script'),...document.getElementsByTagName('img'),...document.getElementsByTagName('link'),...document.getElementsByTagName('form')];sources.forEach(element=>{if(element.href)urls.push(element.href);if(element.src)urls.push(element.src);if(element.action)urls.push(element.action);});let%20content=document.documentElement.innerHTML;let%20urlPattern=/(?:url\(|href="|src="|action="|url:|endpoint:|path:|route:)\s*['"]?([^'"\)\s>]+)/gi;let%20match;while((match=urlPattern.exec(content))!==null){if(match[1]&&!match[1].startsWith('data:'))urls.push(match[1]);}let%20scriptPattern=/"[^"]*"|'[^']*'/g;let%20scripts=document.documentElement.innerHTML.match(scriptPattern)||[];scripts.forEach(script=>{let%20urlMatches=script.match(/(?:\/[a-zA-Z0-9_-]+)+(?:\.[a-zA-Z0-9]+)?/g)||[];urlMatches.forEach(url=>urls.push(url));});performance.getEntriesByType('resource').forEach(entry=>urls.push(entry.name));return[...new%20Set(urls)];}let%20allUrls=findUrls();allUrls.sort();document.getElementById('results').innerHTML=`%20<div%20style="margin:10px%200;color:#00ff00">%E2%9C%85%20Found%20${allUrls.length}%20URLs%20&%20Endpoints%20on%20${currentDomain}</div>%20<div%20style="background:#2a2a2a;padding:10px;border-radius:5px">%20${allUrls.map(url=>`<div%20style="color:white;margin:5px%200;padding:5px;background:#333;border-radius:3px;word-break:break-all">${url}</div>`).join('')}%20</div>`;})();
