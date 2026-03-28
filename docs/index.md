---
layout: home

hero:
  name: '易思文档中心'
  text: 'Eosine Docs'
  tagline: 升级文档 · 开发文档 · 接口文档
---

<div class="home-sections">

## 🔖 前端升级文档

<div class="features-grid">
<a class="feature-card" href="/Upgrade/CoreSDK/index.html">
    <div class="feature-title">基座</div>
    <div class="feature-desc">基座版本升级记录与变更</div>
  </a>
  <a class="feature-card" href="/Upgrade/DevPlatform/index.html">
    <div class="feature-title">开发平台</div>
    <div class="feature-desc">开发平台版本升级记录与变更</div>
  </a>
  <a class="feature-card" href="/Upgrade/VTable/index.html">
    <div class="feature-title">列表组件</div>
    <div class="feature-desc">列表组件版本升级记录与变更</div>
  </a>
  <a class="feature-card" href="/Upgrade/ETable/index.html">
    <div class="feature-title">子表组件</div>
    <div class="feature-desc">子表组件版本升级记录与变更</div>
  </a>
  <a class="feature-card" href="/Upgrade/Workbench/index.html">
    <div class="feature-title">工作台设计器</div>
    <div class="feature-desc">工作台设计器版本升级记录与变更</div>
  </a>
  <a class="feature-card" href="/Upgrade/Filter/index.html">
    <div class="feature-title">查询组件</div>
    <div class="feature-desc">查询组件版本升级记录与变更</div>
  </a>
  <a class="feature-card" href="/Upgrade/3DLoad/index.html">
    <div class="feature-title">3D智能配载</div>
    <div class="feature-desc">3D智能配载版本升级记录与变更</div>
  </a>
  <a class="feature-card" href="/Upgrade/AppCore/index.html">
    <div class="feature-title">App 基座</div>
    <div class="feature-desc">App 基座版本升级记录与变更</div>
  </a>
</div>

## 🔖 JAVA升级文档

<div class="features-grid">
<a class="feature-card" href="/ApiDoc/Upgrade/index.html">
    <div class="feature-title">基座</div>
    <div class="feature-desc">JAVA基座升级文档</div>
  </a>
  <a class="feature-card" href="/ApiDoc/Upgrade/core.html">
    <div class="feature-title">核心包</div>
    <div class="feature-desc">JAVA核心包升级文档</div>
  </a>
  <a class="feature-card" href="/ApiDoc/Upgrade/core-test.html">
    <div class="feature-title">核心包转测</div>
    <div class="feature-desc">JAVA核心包转测说明文档</div>
  </a>
</div>

## 📖 组件开发文档

<div class="features-grid">
  <a class="feature-card" href="/DevelopmentDoc/CoreSDK/index.html">
    <div class="feature-title">基座</div>
    <div class="feature-desc">eosine/core-sdk</div>
  </a>
  <a class="feature-card" href="/DevelopmentDoc/DevPlatform/dataSet.html">
    <div class="feature-title">开发平台</div>
    <div class="feature-desc">eosine/dev-platform</div>
  </a>
  <a class="feature-card" href="/DevelopmentDoc/VTable/index.html">
    <div class="feature-title">列表组件</div>
    <div class="feature-desc">eosine/vtable</div>
  </a>
  <a class="feature-card" href="/DevelopmentDoc/ETable/index.html">
    <div class="feature-title">子表组件</div>
    <div class="feature-desc">eosine/etable</div>
  </a>
  <a class="feature-card" href="/DevelopmentDoc/Workbench/index.html">
    <div class="feature-title">工作台设计器</div>
    <div class="feature-desc">eosine/workbench</div>
  </a>
  <a class="feature-card" href="/DevelopmentDoc/Filter/index.html">
    <div class="feature-title">查询组件</div>
    <div class="feature-desc">eosine/filter</div>
  </a>
  <a class="feature-card" href="/DevelopmentDoc/3DLoad/index.html">
    <div class="feature-title">3D智能配载</div>
    <div class="feature-desc">eosine/3dload</div>
  </a>
  <a class="feature-card" href="/DevelopmentDoc/AppCore/index.html">
    <div class="feature-title">App 基座</div>
    <div class="feature-desc">eosine/app-core</div>
  </a>
</div>

## 📖 JAVA开发文档

<div class="features-grid">
  <a class="feature-card" href="/ApiDoc/CoreDevelop/dynamic-api.html">
    <div class="feature-title">核心包接口</div>
    <div class="feature-desc">JAVA核心包接口开发文档</div>
  </a>
  <a class="feature-card" href="/ApiDoc/Tools/coreUtils.html">
    <div class="feature-title">工具类</div>
    <div class="feature-desc">JAVA核心包工具类说明文档</div>
  </a>
</div>
</div>

<style>
.home-sections {
  max-width: 1152px;
  margin: 0 auto;
}
.home-sections h2 {
  font-size: 1.4rem;
  font-weight: 700;
  margin: 48px 0 20px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 32px;
  color: var(--vp-c-text-1);
}
.home-sections h2:first-child {
  border-top: none;
  padding-top: 0;
  margin-top: 0;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}
.feature-card {
  display: block;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px 24px;
  text-decoration: none !important;
  transition: border-color 0.25s, background 0.25s;
  background: var(--vp-c-bg-soft);
}
.feature-card:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.feature-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}
.feature-desc {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
