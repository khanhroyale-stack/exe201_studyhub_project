const https = require('https');
const fs = require('fs');

const urls = {
  'homepage.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1MzUzYWU3NzY5NzgwODlhZjU3N2YxMjEwN2M0EgsSBxCXpLC0oQkYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzI2ODExNjAzODAyMzI4OTg4MA&filename=&opi=89354086',
  'classlist.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1MzUzYWU5YTNmN2QwODhlOWExMzAyMzM3NjcwEgsSBxCXpLC0oQkYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzI2ODExNjAzODAyMzI4OTg4MA&filename=&opi=89354086',
  'tutorlist.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1MzUzYWU4MjEzNjYwNDMxMDM0ZWIyMzI1NTFhEgsSBxCXpLC0oQkYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzI2ODExNjAzODAyMzI4OTg4MA&filename=&opi=89354086',
  'classdetail.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1MzVhZTlmNTg3MTMwMWE2MzE1OWM4M2IzMWVlEgsSBxCXpLC0oQkYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzI2ODExNjAzODAyMzI4OTg4MA&filename=&opi=89354086'
};

async function download() {
  for (const [filename, url] of Object.entries(urls)) {
    console.log(`Downloading ${filename}...`);
    await new Promise((resolve, reject) => {
      https.get(url, (res) => {
        if (res.statusCode !== 200 && res.statusCode !== 302) {
            reject(new Error(`Status Code: ${res.statusCode}`));
            return;
        }
        
        let targetUrl = url;
        if(res.statusCode === 302) {
            targetUrl = res.headers.location;
            console.log(`Redirecting to ${targetUrl}`);
            https.get(targetUrl, (res2) => {
                const file = fs.createWriteStream(filename);
                res2.pipe(file);
                file.on('finish', () => {
                  file.close();
                  resolve();
                });
            });
        } else {
            const file = fs.createWriteStream(filename);
            res.pipe(file);
            file.on('finish', () => {
              file.close();
              resolve();
            });
        }
      }).on('error', (err) => {
        fs.unlink(filename, () => {});
        reject(err);
      });
    });
  }
}

download().catch(console.error);
