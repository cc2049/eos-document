<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  src: String,
});

const html = ref('');
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    const { default: MarkdownIt } = await import('markdown-it');
    const md = new MarkdownIt({ html: true, linkify: true });
    const res = await fetch(props.src);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    html.value = md.render(text);
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <div v-if="loading" style="color: var(--vp-c-text-2)">加载中...</div>
    <div v-else-if="error" style="color: var(--vp-c-danger-1)">加载失败：{{ error }}</div>
    <div v-else v-html="html" />
  </div>
</template>
