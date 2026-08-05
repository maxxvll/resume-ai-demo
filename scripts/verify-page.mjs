import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const htmlPath = resolve(root, 'index.html');
const readmePath = resolve(root, 'README.md');
const html = readFileSync(htmlPath, 'utf8');
const readme = readFileSync(readmePath, 'utf8');

const failures = [];
const requireText = (source, text, label = text) => {
  if (!source.includes(text)) failures.push(`missing: ${label}`);
};

for (const id of ['product', 'architecture', 'engineering', 'screens', 'evidence', 'downloads']) {
  requireText(html, `id="${id}"`, `section #${id}`);
}

for (const asset of [
  'assets/app-logo.png',
  'assets/desktop-chat.png',
  'assets/desktop-cloud-drive.png',
  'assets/desktop-video-call.png',
  'assets/mobile-chat.png',
  'assets/mobile-cloud-drive.png',
]) {
  requireText(html, asset, `HTML reference ${asset}`);
  if (!existsSync(resolve(root, asset))) failures.push(`missing asset file: ${asset}`);
}

for (const phrase of [
  '82 个测试文件，349 项测试通过',
  '后端 156 个测试套件，677 项测试通过',
  '当前不提供公共在线服务',
  '不公开当前私有源代码',
  '消息重复与断线恢复',
  '文件对象与业务状态',
  'AI 上下文与多端同步',
]) {
  requireText(html, phrase);
}

for (const releaseFile of [
  'Qingyu_0.1.0_macos.dmg',
  'Qingyu_0.1.0_windows_x64_setup.exe',
  'Qingyu_0.1.0_android_arm64.apk',
]) {
  requireText(html, `https://github.com/maxxvll/resume-ai-demo/releases/download/graduatechat-v0.1.0/${releaseFile}`, releaseFile);
}

const localImages = [...html.matchAll(/<img\s+[^>]*src="([^"]+)"[^>]*>/g)];
for (const match of localImages) {
  const tag = match[0];
  if (!/\salt="[^"]*"/.test(tag)) failures.push(`image missing alt: ${match[1]}`);
  if (!existsSync(resolve(root, match[1]))) failures.push(`broken local image: ${match[1]}`);
}

const externalBlankLinks = [...html.matchAll(/<a\s+[^>]*target="_blank"[^>]*>/g)];
for (const match of externalBlankLinks) {
  if (!/rel="[^"]*noopener[^"]*"/.test(match[0])) failures.push('target=_blank link missing noopener');
}

for (const banned of ['AWS_ACCESS_KEY', 'SECRET_KEY', 'PRIVATE_KEY', 'sk-', 'Bearer ', '192.168.', '10.0.', '—', '–']) {
  if (html.includes(banned) || readme.includes(banned)) failures.push(`prohibited public text: ${banned}`);
}

if ((html.match(/<html\b/g) || []).length !== 1) failures.push('index.html must contain exactly one document');
if (!html.includes('@media (prefers-color-scheme: dark)')) failures.push('missing automatic dark mode');
if (!html.includes('@media (prefers-reduced-motion: reduce)')) failures.push('missing reduced motion handling');
if (!html.includes('aria-label="页面导航"')) failures.push('missing navigation label');
if (html.includes('cdn.tailwindcss.com') || html.includes('fonts.googleapis.com')) failures.push('unexpected runtime CDN dependency');

if (failures.length) {
  console.error(`Verification failed (${failures.length})`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Verification passed');
console.log(`- ${localImages.length} local images present with alt attributes`);
console.log('- required product, architecture, engineering, evidence, and download sections present');
console.log('- no prohibited secret markers, private-network strings, em dashes, or runtime CDN dependencies');
