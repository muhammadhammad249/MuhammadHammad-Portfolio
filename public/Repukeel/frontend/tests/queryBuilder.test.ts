import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildSearchQuery,
  normalizeDomain,
  cleanInputText,
  countQueryWords,
  buildEngineUrl,
  splitTextIntoQueries,
} from '../src/lib/queryBuilder.ts';

test('Utility functions: cleanInputText and countQueryWords', () => {
  assert.equal(cleanInputText('  Ac"me   Corp  \x00'), 'Acme Corp');
  assert.equal(countQueryWords('one two three'), 3);
  assert.equal(countQueryWords(''), 0);
});

test('1. Brand Acme with https://www.acme.com/about, exact on, platform Instagram', () => {
  const result = buildSearchQuery({
    mode: 'brand',
    brandName: 'Acme',
    officialDomain: 'https://www.acme.com/about',
    exactMatch: true,
    selectedPlatforms: ['instagram'],
  });
  assert.equal(result.query, '"Acme" site:instagram.com -site:acme.com');
  assert.equal(Object.keys(result.errors).length, 0);
});

test('2. Brand Acme with platforms Instagram + Facebook, exact on, no domain', () => {
  const result = buildSearchQuery({
    mode: 'brand',
    brandName: 'Acme',
    exactMatch: true,
    selectedPlatforms: ['instagram', 'facebook'],
  });
  assert.equal(result.query, '"Acme" (site:instagram.com OR site:facebook.com)');
  assert.equal(Object.keys(result.errors).length, 0);
});

test('3. Text "a unique sentence", domain acme.com, exact on', () => {
  const result = buildSearchQuery({
    mode: 'text',
    textContent: 'a unique sentence',
    officialDomain: 'acme.com',
    exactMatch: true,
  });
  assert.equal(result.query, '"a unique sentence" -site:acme.com');
  assert.equal(Object.keys(result.errors).length, 0);
});

test('4. Exact off, brand Acme Co, extra keyword fake', () => {
  const result = buildSearchQuery({
    mode: 'brand',
    brandName: 'Acme Co',
    exactMatch: false,
    extraKeywords: 'fake',
  });
  assert.equal(result.query, 'Acme Co fake');
  assert.equal(Object.keys(result.errors).length, 0);
});

test('5. Brand containing quotes Ac"me => quotes removed', () => {
  const exactOn = buildSearchQuery({
    mode: 'brand',
    brandName: 'Ac"me',
    exactMatch: true,
  });
  assert.equal(exactOn.query, '"Acme"');

  const exactOff = buildSearchQuery({
    mode: 'brand',
    brandName: 'Ac"me',
    exactMatch: false,
  });
  assert.equal(exactOff.query, 'Acme');
});

test('6. Empty required field => no query, validation error', () => {
  const brandEmpty = buildSearchQuery({
    mode: 'brand',
    brandName: '   ',
  });
  assert.equal(brandEmpty.query, '');
  assert.ok(brandEmpty.errors.brand);

  const textEmpty = buildSearchQuery({
    mode: 'text',
    textContent: '   ',
  });
  assert.equal(textEmpty.query, '');
  assert.ok(textEmpty.errors.text);
});

test('Domain normalization edge cases', () => {
  assert.deepEqual(normalizeDomain('https://www.acme.com/about?ref=123#hash'), {
    valid: true,
    domain: 'acme.com',
  });
  assert.deepEqual(normalizeDomain('http://sub.domain.co.uk:8080/path/'), {
    valid: true,
    domain: 'sub.domain.co.uk',
  });
  assert.deepEqual(normalizeDomain('   '), { valid: true });

  const spaceDomain = normalizeDomain('acme com');
  assert.equal(spaceDomain.valid, false);
  assert.match(spaceDomain.error || '', /spaces/i);

  const invalidDomain = normalizeDomain('not-a-domain');
  assert.equal(invalidDomain.valid, false);
});

test('Word count warning (>30 words)', () => {
  const shortText = 'One two three four five';
  const shortResult = buildSearchQuery({
    mode: 'text',
    textContent: shortText,
  });
  assert.equal(shortResult.isTruncationRisk, false);

  const longWords = Array(35).fill('word').join(' ');
  const longResult = buildSearchQuery({
    mode: 'text',
    textContent: longWords,
    exactMatch: false,
  });
  assert.equal(longResult.wordCount, 35);
  assert.equal(longResult.isTruncationRisk, true);
});

test('Split into shorter queries in text mode', () => {
  const longText = 'First sentence is about brand exposure. Second sentence covers copyright infringement! Third sentence details unauthorized reupload on forums.';
  const queries = splitTextIntoQueries(longText, {
    exactMatch: true,
    selectedPlatforms: ['reddit'],
  });
  assert.ok(queries.length >= 2);
  assert.ok(queries[0].includes('First sentence is about brand exposure'));
  assert.ok(queries[0].includes('site:reddit.com'));
});

test('Engine URL generation with date support confirmation', () => {
  const g24 = buildEngineUrl('google', 'test query', '24h');
  assert.equal(g24.dateSupported, true);
  assert.equal(g24.url, 'https://www.google.com/search?q=test%20query&tbs=qdr:d');

  const ddgMonth = buildEngineUrl('duckduckgo', 'test query', 'month');
  assert.equal(ddgMonth.dateSupported, true);
  assert.equal(ddgMonth.url, 'https://duckduckgo.com/?q=test%20query&df=m');

  const bing = buildEngineUrl('bing', 'test query', 'week');
  assert.equal(bing.dateSupported, false);
  assert.equal(bing.url, 'https://www.bing.com/search?q=test%20query');

  const yandex = buildEngineUrl('yandex', 'test query', '24h');
  assert.equal(yandex.dateSupported, false);
  assert.equal(yandex.url, 'https://yandex.com/search/?text=test%20query');
});
