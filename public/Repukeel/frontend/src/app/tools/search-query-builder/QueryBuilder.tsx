'use client';

import { useState, useMemo } from 'react';
import {
  PLATFORMS,
  GOAL_PRESETS,
  type PlatformPreset,
  type GoalPreset,
} from '@/data/queryPresets';
import {
  buildSearchQuery,
  buildEngineUrl,
  splitTextIntoQueries,
  type SearchMode,
  type DateRange,
  type SearchEngine,
} from '@/lib/queryBuilder';

export default function QueryBuilder() {
  const [mode, setMode] = useState<SearchMode>('brand');
  const [brandName, setBrandName] = useState('');
  const [textContent, setTextContent] = useState('');
  const [officialDomain, setOfficialDomain] = useState('');
  const [exactMatch, setExactMatch] = useState(true);
  const [extraKeywords, setExtraKeywords] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedGoalId, setSelectedGoalId] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRange>('all');
  const [copied, setCopied] = useState(false);
  const [splitQueries, setSplitQueries] = useState<string[]>([]);

  // Selected goal object
  const activeGoal: GoalPreset | undefined = useMemo(() => {
    return GOAL_PRESETS.find((g) => g.id === selectedGoalId);
  }, [selectedGoalId]);

  // Handle goal change (auto-selects suggested platforms if none currently selected)
  const handleGoalSelect = (goalId: string) => {
    if (selectedGoalId === goalId) {
      setSelectedGoalId('');
      return;
    }
    setSelectedGoalId(goalId);
    const goal = GOAL_PRESETS.find((g) => g.id === goalId);
    if (goal && selectedPlatforms.length === 0) {
      setSelectedPlatforms(goal.suggestedPlatformIds);
    }
  };

  // Toggle platform selection
  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // Build current query
  const queryResult = useMemo(() => {
    return buildSearchQuery({
      mode,
      brandName,
      textContent,
      officialDomain,
      exactMatch,
      extraKeywords,
      selectedPlatforms,
      goalModifier: activeGoal?.modifier,
    });
  }, [
    mode,
    brandName,
    textContent,
    officialDomain,
    exactMatch,
    extraKeywords,
    selectedPlatforms,
    activeGoal,
  ]);

  // Copy query to clipboard
  const handleCopy = async (textToCopy?: string) => {
    const text = textToCopy || queryResult.query;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Split text into shorter queries
  const handleSplitQueries = () => {
    const splits = splitTextIntoQueries(textContent, {
      officialDomain,
      exactMatch,
      extraKeywords,
      selectedPlatforms,
      goalModifier: activeGoal?.modifier,
    });
    setSplitQueries(splits);
  };

  // Open search engine
  const handleOpenEngine = (engine: SearchEngine, customQuery?: string) => {
    const targetQuery = customQuery || queryResult.query;
    if (!targetQuery) return;
    const { url } = buildEngineUrl(engine, targetQuery, dateRange);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 md:p-10">
      {/* Live Region for Screen Readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {copied ? 'Search query copied to clipboard.' : ''}
      </div>

      {/* Mode Tabs */}
      <div className="flex border-b border-gray-200 mb-8" role="tablist" aria-label="Search Mode">
        <button
          type="button"
          role="tab"
          id="tab-brand"
          aria-selected={mode === 'brand'}
          aria-controls="panel-query-builder"
          onClick={() => {
            setMode('brand');
            setSplitQueries([]);
          }}
          className={`min-h-[44px] px-6 py-3 font-bold text-sm sm:text-base border-b-2 transition-colors ${
            mode === 'brand'
              ? 'border-[#0c1940] text-[#0c1940]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          Brand / Business
        </button>
        <button
          type="button"
          role="tab"
          id="tab-text"
          aria-selected={mode === 'text'}
          aria-controls="panel-query-builder"
          onClick={() => {
            setMode('text');
            setSplitQueries([]);
          }}
          className={`min-h-[44px] px-6 py-3 font-bold text-sm sm:text-base border-b-2 transition-colors ${
            mode === 'text'
              ? 'border-[#0c1940] text-[#0c1940]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          Text / Content
        </button>
      </div>

      {/* Form Content */}
      <div id="panel-query-builder" role="tabpanel" aria-labelledby={mode === 'brand' ? 'tab-brand' : 'tab-text'}>
        <div className="space-y-6">
          {/* Mode 1: Brand Input */}
          {mode === 'brand' ? (
            <div>
              <label htmlFor="input-brand-name" className="block text-sm font-bold text-[#0a192f] mb-2">
                Brand or Business Name <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="input-brand-name"
                type="text"
                maxLength={100}
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g., RepuKeel or Acme Corp"
                aria-required="true"
                aria-invalid={!!queryResult.errors.brand}
                aria-describedby={queryResult.errors.brand ? 'brand-error' : 'brand-help'}
                className={`w-full min-h-[44px] px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#0c1940] ${
                  queryResult.errors.brand ? 'border-red-500 bg-red-50/30' : 'border-gray-300 bg-white'
                }`}
              />
              {queryResult.errors.brand ? (
                <p id="brand-error" className="text-xs text-red-600 mt-1.5 font-medium">
                  {queryResult.errors.brand}
                </p>
              ) : (
                <p id="brand-help" className="text-xs text-gray-500 mt-1.5">
                  The primary brand, product, or trademark you want to search for.
                </p>
              )}
            </div>
          ) : (
            /* Mode 2: Text / Content Input */
            <div>
              <label htmlFor="input-text-content" className="block text-sm font-bold text-[#0a192f] mb-2">
                Text or Phrase to Find <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <textarea
                id="input-text-content"
                rows={3}
                maxLength={1000}
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Paste a distinctive sentence from your article, course, bio, or description..."
                aria-required="true"
                aria-invalid={!!queryResult.errors.text}
                aria-describedby={queryResult.errors.text ? 'text-error' : 'text-help'}
                className={`w-full p-4 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#0c1940] ${
                  queryResult.errors.text ? 'border-red-500 bg-red-50/30' : 'border-gray-300 bg-white'
                }`}
              />
              {queryResult.errors.text ? (
                <p id="text-error" className="text-xs text-red-600 mt-1.5 font-medium">
                  {queryResult.errors.text}
                </p>
              ) : (
                <p id="text-help" className="text-xs text-gray-500 mt-1.5">
                  Unique copy or excerpt to search for across online publications and platforms.
                </p>
              )}
            </div>
          )}

          {/* Official Domain & Exact Match Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
              <label htmlFor="input-official-domain" className="block text-sm font-bold text-[#0a192f] mb-2">
                Your Official Domain <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                id="input-official-domain"
                type="text"
                maxLength={100}
                value={officialDomain}
                onChange={(e) => setOfficialDomain(e.target.value)}
                placeholder="e.g., https://example.com"
                aria-invalid={!!queryResult.errors.domain}
                aria-describedby={queryResult.errors.domain ? 'domain-error' : 'domain-help'}
                className={`w-full min-h-[44px] px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#0c1940] ${
                  queryResult.errors.domain ? 'border-red-500 bg-red-50/30' : 'border-gray-300 bg-white'
                }`}
              />
              {queryResult.errors.domain ? (
                <p id="domain-error" className="text-xs text-red-600 mt-1.5 font-medium">
                  {queryResult.errors.domain}
                </p>
              ) : (
                <p id="domain-help" className="text-xs text-gray-500 mt-1.5">
                  Excludes your own website from results using <code className="bg-gray-100 px-1 py-0.5 rounded text-[11px]">-site:domain</code>.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="input-extra-keywords" className="block text-sm font-bold text-[#0a192f] mb-2">
                Extra Keywords <span className="text-gray-400 font-normal">(Optional, max 5)</span>
              </label>
              <input
                id="input-extra-keywords"
                type="text"
                maxLength={100}
                value={extraKeywords}
                onChange={(e) => setExtraKeywords(e.target.value)}
                placeholder="e.g., leak review login fake"
                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0c1940]"
              />
              <p className="text-xs text-gray-500 mt-1.5">
                Additional modifier terms to narrow the inquiry.
              </p>
            </div>
          </div>

          {/* Exact Match Toggle */}
          <div className="pt-2">
            <label className="inline-flex items-center gap-3 cursor-pointer select-none min-h-[44px]">
              <input
                type="checkbox"
                checked={exactMatch}
                onChange={(e) => setExactMatch(e.target.checked)}
                className="w-4 h-4 rounded text-[#0c1940] border-gray-300 focus:ring-[#0c1940]"
              />
              <span className="text-sm font-semibold text-[#0a192f]">
                Exact match (wraps search term in quotes)
              </span>
            </label>
          </div>

          {/* Platforms Multi-select Chips */}
          <fieldset className="pt-2">
            <legend className="text-sm font-bold text-[#0a192f] mb-2">
              Target Platforms <span className="text-gray-400 font-normal">(Select one or more)</span>
            </legend>
            <div className="flex flex-wrap gap-2 pt-1" role="group" aria-label="Platform filters">
              {PLATFORMS.map((platform: PlatformPreset) => {
                const isSelected = selectedPlatforms.includes(platform.id);
                return (
                  <button
                    key={platform.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => togglePlatform(platform.id)}
                    className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      isSelected
                        ? 'bg-[#0c1940] text-white border-[#0c1940] shadow-sm'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                    }`}
                  >
                    {platform.name}
                  </button>
                );
              })}
              {selectedPlatforms.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedPlatforms([])}
                  className="min-h-[44px] px-3 py-2 text-xs font-semibold text-gray-500 hover:text-red-600 underline"
                >
                  Clear platforms
                </button>
              )}
            </div>
          </fieldset>

          {/* Investigation Goal Presets */}
          <fieldset className="pt-2">
            <legend className="text-sm font-bold text-[#0a192f] mb-2">
              Investigation Goal <span className="text-gray-400 font-normal">(Optional modifier preset)</span>
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {GOAL_PRESETS.map((goal: GoalPreset) => {
                const isSelected = selectedGoalId === goal.id;
                return (
                  <button
                    key={goal.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => handleGoalSelect(goal.id)}
                    className={`min-h-[44px] p-3.5 text-left rounded-xl border text-xs transition-all flex items-start justify-between ${
                      isSelected
                        ? 'bg-[#0c1940] text-white border-[#0c1940] shadow-sm'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <div>
                      <p className="font-bold">{goal.label}</p>
                      <p className={`text-[11px] mt-1 ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                        Adds: <code className="px-1 py-0.5 rounded text-[10px] bg-black/10">{goal.modifier}</code>
                      </p>
                    </div>
                    {isSelected && <span className="text-[#d4af37] font-bold ml-2">✓</span>}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Date Range Selector */}
          <div>
            <label htmlFor="select-date-range" className="block text-sm font-bold text-[#0a192f] mb-2">
              Date Filter <span className="text-gray-400 font-normal">(Supported on Google and DuckDuckGo)</span>
            </label>
            <select
              id="select-date-range"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as DateRange)}
              className="w-full sm:w-64 min-h-[44px] px-4 py-2 rounded-xl border border-gray-300 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0c1940]"
            >
              <option value="all">Any time</option>
              <option value="24h">Past 24 hours</option>
              <option value="week">Past week</option>
              <option value="month">Past month</option>
              <option value="year">Past year</option>
            </select>
          </div>
        </div>

        {/* ================= OUTPUT SECTION ================= */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-[#0a192f]">Generated Search Query</h2>
            {queryResult.wordCount > 0 && (
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                queryResult.isTruncationRisk ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'
              }`}>
                {queryResult.wordCount} words
              </span>
            )}
          </div>

          {/* Truncation warning if > 30 words */}
          {queryResult.isTruncationRisk && (
            <div className="mb-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span>
                <strong>Length note:</strong> Queries over ~30 words may be truncated or simplified by some search engines.
              </span>
              {mode === 'text' && (
                <button
                  type="button"
                  onClick={handleSplitQueries}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-bold hover:bg-amber-700 transition-colors whitespace-nowrap self-start sm:self-auto"
                >
                  Split into shorter queries
                </button>
              )}
            </div>
          )}

          {/* Read-only Query Box */}
          <div className="relative bg-[#0c1940] rounded-xl p-4 text-white font-mono text-sm break-all leading-relaxed shadow-inner">
            {queryResult.query ? (
              queryResult.query
            ) : (
              <span className="text-gray-400 italic font-sans text-xs">
                Enter your {mode === 'brand' ? 'brand name' : 'text'} above to generate your search query...
              </span>
            )}
          </div>

          {/* Actions: Copy & Open In Buttons */}
          <div className="mt-5 flex flex-wrap gap-3 items-center">
            <button
              type="button"
              disabled={!queryResult.query}
              onClick={() => handleCopy()}
              className="min-h-[44px] px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#d4af37] text-[#0c1940] hover:bg-[#c49f27] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              {copied ? 'Copied to Clipboard!' : 'Copy Query'}
            </button>

            <span className="text-xs text-gray-400 font-semibold px-2 hidden sm:inline">Open in:</span>

            {/* Google */}
            <button
              type="button"
              disabled={!queryResult.query}
              onClick={() => handleOpenEngine('google')}
              className="min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-[#0c1940] transition-colors disabled:opacity-40 disabled:cursor-not-allowed border border-gray-300"
            >
              Google
            </button>

            {/* Bing */}
            <button
              type="button"
              disabled={!queryResult.query}
              onClick={() => handleOpenEngine('bing')}
              title={dateRange !== 'all' ? 'Note: Date filter not supported in external URL for Bing' : undefined}
              className="min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-[#0c1940] transition-colors disabled:opacity-40 disabled:cursor-not-allowed border border-gray-300"
            >
              Bing
            </button>

            {/* DuckDuckGo */}
            <button
              type="button"
              disabled={!queryResult.query}
              onClick={() => handleOpenEngine('duckduckgo')}
              className="min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-[#0c1940] transition-colors disabled:opacity-40 disabled:cursor-not-allowed border border-gray-300"
            >
              DuckDuckGo
            </button>

            {/* Yandex */}
            <button
              type="button"
              disabled={!queryResult.query}
              onClick={() => handleOpenEngine('yandex')}
              title={dateRange !== 'all' ? 'Note: Date filter not supported in external URL for Yandex' : undefined}
              className="min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-[#0c1940] transition-colors disabled:opacity-40 disabled:cursor-not-allowed border border-gray-300"
            >
              Yandex
            </button>
          </div>

          {/* Engine date filter notification note */}
          {dateRange !== 'all' && (
            <p className="text-[11px] text-gray-500 mt-2">
              * Note: The date filter parameter is passed to Google and DuckDuckGo. Bing and Yandex do not reliably support external URL date parameters; your query will open in them without the date modifier.
            </p>
          )}

          {/* Split queries display (if user clicked split) */}
          {splitQueries.length > 0 && (
            <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
              <h3 className="text-xs font-bold text-[#0a192f] mb-3 uppercase tracking-wider">
                Split Queries ({splitQueries.length})
              </h3>
              <div className="space-y-3">
                {splitQueries.map((q, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-white rounded-lg border border-gray-200">
                    <code className="text-xs text-gray-800 break-all">{q}</code>
                    <div className="flex gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopy(q)}
                        className="px-2.5 py-1 text-xs font-bold bg-[#d4af37] text-[#0c1940] rounded hover:bg-[#c49f27]"
                      >
                        Copy
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenEngine('google', q)}
                        className="px-2.5 py-1 text-xs font-bold bg-[#0c1940] text-white rounded hover:bg-[#122353]"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Privacy & Safety Notices */}
          <div className="mt-8 pt-6 border-t border-gray-100 space-y-1.5 text-xs text-gray-500">
            <p className="flex items-center gap-1.5 text-gray-700 font-medium">
              <span className="text-emerald-600 font-bold">✓</span> RepuKeel does not see or store your searches.
            </p>
            <p>
              For your own brand and content. Don&apos;t use this tool to track or harass individuals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
