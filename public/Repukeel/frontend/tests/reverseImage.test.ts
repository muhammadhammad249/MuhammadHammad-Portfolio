import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeImageUrl,
  warnIfNotDirectImage,
  buildEngineUrls,
  getEngineVerifications,
  validateImageFile,
  UPLOAD_ENGINES,
  MAX_FILE_SIZE_BYTES,
} from '../src/lib/reverseImage.ts';

test('1. Exact verified engine URLs with https://example.com/photo.jpg?x=1&y=2', () => {
  const input = 'https://example.com/photo.jpg?x=1&y=2';
  const enc = 'https%3A%2F%2Fexample.com%2Fphoto.jpg%3Fx%3D1%26y%3D2';
  const urls = buildEngineUrls(input);

  assert.equal(urls.google, `https://lens.google.com/uploadbyurl?url=${enc}`);
  assert.equal(urls.tineye, `https://tineye.com/search?url=${enc}`);
  assert.equal(urls.bing, `https://www.bing.com/images/search?view=detailv2&iss=sbi&form=SBIVSP&sbisrc=UrlPaste&q=imgurl:${enc}`);
  assert.equal(urls.yandex, `https://yandex.com/images/search?rpt=imageview&url=${enc}`);
});

test('2. Rejects empty string', () => {
  const res = normalizeImageUrl('');
  assert.equal(res.valid, false);
  assert.match(res.error || '', /http:\/\/ or https:\/\//i);

  const resSpaces = normalizeImageUrl('   ');
  assert.equal(resSpaces.valid, false);
  assert.match(resSpaces.error || '', /http:\/\/ or https:\/\//i);
});

test('3. Rejects missing scheme example.com/photo.jpg', () => {
  const res = normalizeImageUrl('example.com/photo.jpg');
  assert.equal(res.valid, false);
  assert.equal(res.error, 'Link must start with http:// or https://');
});

test('4. Rejects javascript:alert(1)', () => {
  const res = normalizeImageUrl('javascript:alert(1)');
  assert.equal(res.valid, false);
  assert.match(res.error || '', /Data, JavaScript/i);
});

test('5. Rejects data:image/png;base64,AAA', () => {
  const res = normalizeImageUrl('data:image/png;base64,AAA');
  assert.equal(res.valid, false);
  assert.match(res.error || '', /Data, JavaScript/i);
});

test('6. Rejects http://localhost/a.jpg', () => {
  const res = normalizeImageUrl('http://localhost/a.jpg');
  assert.equal(res.valid, false);
  assert.match(res.error || '', /private network/i);
});

test('7. Rejects private IPv4 http://192.168.1.5/a.jpg', () => {
  const res = normalizeImageUrl('http://192.168.1.5/a.jpg');
  assert.equal(res.valid, false);
  assert.match(res.error || '', /private network/i);
});

test('8. Rejects loopback IPv4 http://127.0.0.1/a.jpg', () => {
  const res = normalizeImageUrl('http://127.0.0.1/a.jpg');
  assert.equal(res.valid, false);
  assert.match(res.error || '', /private network/i);
});

test('9. Rejects IPv6 loopback http://[::1]/a.jpg', () => {
  const res = normalizeImageUrl('http://[::1]/a.jpg');
  assert.equal(res.valid, false);
  assert.match(res.error || '', /private network/i);
});

test('10. Trims whitespace and newlines around a valid URL', () => {
  const input = '  \n  https://example.com/photo.jpg  \n  ';
  const res = normalizeImageUrl(input);
  assert.equal(res.valid, true);
  assert.equal(res.url, 'https://example.com/photo.jpg');
});

test('11. Non-blocking warnings for web pages vs direct images', () => {
  // Warns for social media post
  const warnInsta = warnIfNotDirectImage('https://www.instagram.com/p/ABC123/');
  assert.ok(warnInsta);
  assert.match(warnInsta || '', /looks like a web page/i);

  // Warns for page without extension
  const warnPage = warnIfNotDirectImage('https://example.com/page');
  assert.ok(warnPage);
  assert.match(warnPage || '', /looks like a web page/i);

  // No warning for direct image file
  const warnImage = warnIfNotDirectImage('https://example.com/photo.jpg');
  assert.equal(warnImage, null);
});

test('12. Engine verification metadata status', () => {
  const meta = getEngineVerifications('https://example.com/photo.jpg');
  assert.equal(meta.google.works, true);
  assert.equal(meta.bing.works, true);
  assert.equal(meta.yandex.works, true);
  assert.equal(meta.tineye.works, false);
  assert.equal(meta.tineye.status, 'fails');
});

test('13. Validates supported image types (jpg, png, webp, gif)', () => {
  const jpg = validateImageFile({ name: 'photo.jpg', size: 1024 * 100, type: 'image/jpeg' });
  assert.equal(jpg.valid, true);

  const png = validateImageFile({ name: 'photo.png', size: 1024 * 500, type: 'image/png' });
  assert.equal(png.valid, true);

  const webp = validateImageFile({ name: 'photo.webp', size: 1024 * 200, type: 'image/webp' });
  assert.equal(webp.valid, true);

  const gif = validateImageFile({ name: 'anim.gif', size: 1024 * 300, type: 'image/gif' });
  assert.equal(gif.valid, true);
});

test('14. Rejects PDF file with descriptive message', () => {
  const res = validateImageFile({ name: 'document.pdf', size: 1024 * 50, type: 'application/pdf' });
  assert.equal(res.valid, false);
  assert.equal(res.error, 'PDF files are not supported. Please select a JPG, PNG, WebP, or GIF image.');
});

test('15. Rejects SVG vector file with descriptive message', () => {
  const res = validateImageFile({ name: 'vector.svg', size: 1024 * 10, type: 'image/svg+xml' });
  assert.equal(res.valid, false);
  assert.equal(res.error, 'SVG vector files are not supported. Please select a JPG, PNG, WebP, or GIF image.');
});

test('16. Rejects empty file (0 bytes)', () => {
  const res = validateImageFile({ name: 'empty.jpg', size: 0, type: 'image/jpeg' });
  assert.equal(res.valid, false);
  assert.equal(res.error, 'The selected file is empty (0 bytes). Please choose a valid image.');
});

test('17. Rejects file exceeding 10 MB limit', () => {
  const res = validateImageFile({ name: 'large.jpg', size: MAX_FILE_SIZE_BYTES + 1, type: 'image/jpeg' });
  assert.equal(res.valid, false);
  assert.equal(res.error, 'File exceeds 10 MB limit. Please select an image under 10 MB.');
});

test('18. Rejects null or undefined file', () => {
  const resNull = validateImageFile(null);
  assert.equal(resNull.valid, false);
  assert.equal(resNull.error, 'Please choose or drop an image file.');

  const resUndef = validateImageFile(undefined);
  assert.equal(resUndef.valid, false);
  assert.equal(resUndef.error, 'Please choose or drop an image file.');
});

test('19. Verified upload engine configurations and statuses', () => {
  assert.equal(UPLOAD_ENGINES.google.status, 'works');
  assert.equal(UPLOAD_ENGINES.google.fieldName, 'encoded_image');
  assert.equal(UPLOAD_ENGINES.google.actionUrl, 'https://lens.google.com/v3/upload');

  assert.equal(UPLOAD_ENGINES.yandex.status, 'works');
  assert.equal(UPLOAD_ENGINES.yandex.fieldName, 'upfile');
  assert.equal(UPLOAD_ENGINES.yandex.actionUrl, 'https://yandex.com/images/search?rpt=imageview');

  assert.equal(UPLOAD_ENGINES.bing.status, 'opens upload page but file not accepted');
  assert.equal(UPLOAD_ENGINES.bing.fieldName, 'image');

  assert.equal(UPLOAD_ENGINES.tineye.status, 'fails');
  assert.equal(UPLOAD_ENGINES.tineye.fieldName, 'image');
});
