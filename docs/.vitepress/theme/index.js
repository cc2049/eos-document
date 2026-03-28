import DefaultTheme from 'vitepress/theme';
import RemoteMarkdown from './components/RemoteMarkdown.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('RemoteMarkdown', RemoteMarkdown);
  },
};
