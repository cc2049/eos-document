/**
 * VitePress 构建时外部 Markdown 索引插件
 *
 * 功能：在 build 阶段预抓取 <ExternalMd src="..." /> 引用的外部文档，
 *       将其内容以隐藏块形式注入到 .md 文件，使 VitePress 本地搜索
 *       可以索引到外部动态加载的文档内容。
 *
 * 开发模式（pnpm dev）：跳过抓取，由 ExternalMd 组件在浏览器端正常加载。
 * 构建模式（pnpm build）：抓取外部内容并注入，使搜索索引覆盖。
 */

// 去除可能导致 VitePress 编译报错的敏感标签
function sanitize(md) {
  return (
    md
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      // 去除 frontmatter（外部文档可能带有）
      .replace(/^---[\s\S]*?---\n?/, '')
  );
}

export function externalMdIndexPlugin() {
  let isBuild = false;

  return {
    name: 'vitepress-external-md-index',
    enforce: 'pre',

    configResolved(config) {
      isBuild = config.command === 'build';
    },

    async transform(code, id) {
      // 只处理 .md 文件，且只在构建时生效
      if (!isBuild || !id.endsWith('.md')) return null;
      if (!code.includes('<ExternalMd')) return null;

      const pattern = /<ExternalMd\s+src="([^"]+)"\s*\/>/g;
      let result = code;
      let match;
      let changed = false;

      while ((match = pattern.exec(code)) !== null) {
        const [full, url] = match;
        try {
          const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const raw = await res.text();
          const content = sanitize(raw);

          // 注入为不可见块，紧跟在组件标签后面
          // VitePress 本地搜索会索引此内容，但页面上不显示
          const hidden = [
            '',
            '<div class="vp-external-md-index" style="display:none;position:absolute;pointer-events:none;opacity:0" aria-hidden="true">',
            '',
            content,
            '',
            '</div>',
            '',
          ].join('\n');

          result = result.replace(full, full + hidden);
          changed = true;
          console.log(`[externalMdIndex] ✓ 已索引: ${url}`);
        } catch (e) {
          console.warn(`[externalMdIndex] ✗ 抓取失败 ${url}: ${e.message}`);
        }
      }

      return changed ? { code: result, map: null } : null;
    },
  };
}
