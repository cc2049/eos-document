import { defineConfig } from 'vitepress';
import { pagefindPlugin } from 'vitepress-plugin-pagefind';
import { externalMdIndexPlugin } from './plugins/externalMdIndex.js';
export default defineConfig({
  title: '易思文档中心',
  description: '易思文档中心',
  base: '/eos-document/',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  lang: 'zh-cn',
  themeConfig: {
    logo: '/favicon.ico',
    nav: [
      { text: '首页', link: '/' },
      {
        text: '前端升级文档',
        items: [
          { text: '基座', link: '/Upgrade/CoreSDK/index.md' },
          { text: '开发平台', link: '/Upgrade/DevPlatform/index.md' },
          { text: '表格组件', link: '/Upgrade/VTable/index.md' },
          { text: '可编辑表格组件', link: '/Upgrade/ETable/index.md' },
          { text: '工作台设计器', link: '/Upgrade/Workbench/index.md' },
          { text: '查询组件', link: '/Upgrade/Filter/index.md' },
          { text: '3D智能配载', link: '/Upgrade/3DLoad/index.md' },
          { text: 'App 基座', link: '/Upgrade/AppCore/index.md' },
        ],
      },
      {
        text: '开发文档',
        items: [
          { text: '基座', link: '/DevelopmentDoc/CoreSDK/index.md' },
          { text: '开发平台', link: '/DevelopmentDoc/DevPlatform/dataSet.md' },
          { text: '表格组件', link: '/DevelopmentDoc/VTable/index.md' },
          { text: '可编辑表格组件', link: '/DevelopmentDoc/ETable/index.md' },
          { text: '工作台设计器', link: '/DevelopmentDoc/Workbench/index.md' },
          { text: '查询组件', link: '/DevelopmentDoc/Filter/index.md' },
          { text: '3D智能配载', link: '/DevelopmentDoc/3DLoad/index.md' },
        ],
      },
      {
        text: 'JAVA升级文档',
        items: [
          { text: '基座', link: '/ApiDoc/Upgrade/index.md' },
          { text: '核心包', link: '/ApiDoc/Upgrade/core.md' },
          { text: '核心包转测', link: '/ApiDoc/Upgrade/core-test.md' },
        ],
      },
      {
        text: 'JAVA开发文档',
        items: [
          { text: '核心包接口', link: '/ApiDoc/CoreDevelop/index.md' },
          { text: '工具类', link: '/ApiDoc/Tools/index.md' },
        ],
      },
    ],
    search: {
      provider: 'local',
    },
    //文档页脚
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    sidebar: {
      '/Upgrade/CoreSDK/': [{ text: '版本升级文档', items: [{ text: '基座', link: '/Upgrade/CoreSDK/index.md' }] }],
      '/Upgrade/DevPlatform/': [
        { text: '版本升级文档', items: [{ text: '开发平台', link: '/Upgrade/DevPlatform/index.md' }] },
      ],
      '/Upgrade/VTable/': [{ text: '版本升级文档', items: [{ text: '表格组件', link: '/Upgrade/VTable/index.md' }] }],
      '/Upgrade/ETable/': [
        { text: '版本升级文档', items: [{ text: '可编辑表格组件', link: '/Upgrade/ETable/index.md' }] },
      ],
      '/Upgrade/Workbench/': [
        { text: '版本升级文档', items: [{ text: '工作台设计器', link: '/Upgrade/Workbench/index.md' }] },
      ],
      '/Upgrade/Filter/': [{ text: '版本升级文档', items: [{ text: '查询组件', link: '/Upgrade/Filter/index.md' }] }],
      '/Upgrade/3DLoad/': [{ text: '版本升级文档', items: [{ text: '3D智能配载', link: '/Upgrade/3DLoad/index.md' }] }],
      '/DevelopmentDoc/CoreSDK/': [
        {
          text: 'PASS平台基座',
          items: [
            { text: '介绍', link: '/DevelopmentDoc/CoreSDK/index.md' },
            { text: '路由（Router）', link: '/DevelopmentDoc/CoreSDK/Router.md' },
            { text: '状态管理（Store）', link: '/DevelopmentDoc/CoreSDK/Store.md' },
            {
              text: '工具类（Utils）',
              link: '/DevelopmentDoc/CoreSDK/Utils/util.md',
              items: [
                { text: 'index.js', link: '/DevelopmentDoc/CoreSDK/Utils/index.md' },
                { text: 'aes.js', link: '/DevelopmentDoc/CoreSDK/Utils/aes.md' },
                { text: 'dict.js', link: '/DevelopmentDoc/CoreSDK/Utils/dict.md' },
                { text: 'eventBus.js', link: '/DevelopmentDoc/CoreSDK/Utils/eventBus.md' },
                { text: 'gpsToAmap.js', link: '/DevelopmentDoc/CoreSDK/Utils/gpsToAmap.md' },
                { text: 'htmlToPdf.js', link: '/DevelopmentDoc/CoreSDK/Utils/htmlToPdf.md' },
                { text: 'reg.js', link: '/DevelopmentDoc/CoreSDK/Utils/reg.md' },
                { text: 'theme.js', link: '/DevelopmentDoc/CoreSDK/Utils/theme.md' },
                { text: 'upVersion.js', link: '/DevelopmentDoc/CoreSDK/Utils/upVersion.md' },
                { text: 'useWebSocketV2.js', link: '/DevelopmentDoc/CoreSDK/Utils/useWebSocketV2.md' },
                { text: 'validate.js', link: '/DevelopmentDoc/CoreSDK/Utils/validate.md' },
                { text: 'auth.js', link: '/DevelopmentDoc/CoreSDK/Utils/auth.md' },
                { text: 'dynamicTitle.js', link: '/DevelopmentDoc/CoreSDK/Utils/dynamicTitle.md' },
                { text: 'loadPackage.js', link: '/DevelopmentDoc/CoreSDK/Utils/loadPackage.md' },
                { text: 'request.js', link: '/DevelopmentDoc/CoreSDK/Utils/request.md' },
                { text: 'ruoyi.js', link: '/DevelopmentDoc/CoreSDK/Utils/ruoyi.md' },
                { text: 'tourLauncher.js', link: '/DevelopmentDoc/CoreSDK/Utils/tourLauncher.md' },
              ],
            },
          ],
        },
      ],
      '/DevelopmentDoc/DevPlatform/': [
        {
          text: '开发平台',
          items: [
            { text: '数据集/接口集', link: '/DevelopmentDoc/DevPlatform/dataSet.md' },
            { text: '创建页面', link: '/DevelopmentDoc/DevPlatform/pageList.md' },
            { text: '设计界面', link: '/DevelopmentDoc/DevPlatform/designer.md' },
            {
              text: '属性面板',
              link: '/DevelopmentDoc/DevPlatform/attr.md',
              items: [
                { text: '业务面板', link: '/DevelopmentDoc/DevPlatform/attr/Business.md' },
                { text: '样式面板', link: '/DevelopmentDoc/DevPlatform/attr/Style.md' },
                { text: '全局面板', link: '/DevelopmentDoc/DevPlatform/attr/Global.md' },
                { text: '数据面板', link: '/DevelopmentDoc/DevPlatform/attr/Data.md' },
              ],
            },
          ],
        },
        {
          text: '组件',
          items: [
            { text: '读取/文本', link: '/DevelopmentDoc/DevPlatform/comp/ExTextBox.md' },
            { text: '多行文本', link: '/DevelopmentDoc/DevPlatform/comp/ExTextarea.md' },
            { text: '数字', link: '/DevelopmentDoc/DevPlatform/comp/ExNumber.md' },
            { text: '日期/日期范围', link: '/DevelopmentDoc/DevPlatform/comp/ExDate.md' },
            { text: '单选', link: '/DevelopmentDoc/DevPlatform/comp/ExRadio.md' },
            { text: '复选', link: '/DevelopmentDoc/DevPlatform/comp/ExCheckbox.md' },
            { text: '下拉列表/下拉树', link: '/DevelopmentDoc/DevPlatform/comp/ExSelect.md' },
            { text: '图片/图片上传', link: '/DevelopmentDoc/DevPlatform/comp/ExUpload.md' },
            { text: '附件', link: '/DevelopmentDoc/DevPlatform/comp/ExUploadFile.md' },
            { text: '顶部按钮', link: '/DevelopmentDoc/DevPlatform/comp/ExTopButton.md' },
            { text: '表单页签', link: '/DevelopmentDoc/DevPlatform/comp/ExFormTab.md' },
            { text: '子表', link: '/DevelopmentDoc/DevPlatform/comp/ExSubTable.md' },
            { text: '评分', link: '/DevelopmentDoc/DevPlatform/comp/ExRate.md' },
            { text: '业务组件', link: '/DevelopmentDoc/DevPlatform/comp/ExBusiness.md' },
            { text: '代码编辑器', link: '/DevelopmentDoc/DevPlatform/comp/ExCodeEditor.md' },
            { text: '富文本', link: '/DevelopmentDoc/DevPlatform/comp/ExEditor.md' },
            { text: '省市区', link: '/DevelopmentDoc/DevPlatform/comp/ExArea.md' },
            { text: '车牌号', link: '/DevelopmentDoc/DevPlatform/comp/ExCarNum.md' },
            { text: '级联选择', link: '/DevelopmentDoc/DevPlatform/comp/ExRegion.md' },
          ],
        },
      ],
      '/DevelopmentDoc/VTable/': [
        { text: '表格组件', items: [{ text: '开始', link: '/DevelopmentDoc/VTable/index.md' }] },
      ],
      '/DevelopmentDoc/ETable/': [
        { text: '可编辑表格组件', items: [{ text: '开始', link: '/DevelopmentDoc/ETable/index.md' }] },
      ],
      '/DevelopmentDoc/Workbench/': [
        { text: '工作台设计器', items: [{ text: '开始', link: '/DevelopmentDoc/Workbench/index.md' }] },
      ],
      '/DevelopmentDoc/Filter/': [
        { text: '查询组件', items: [{ text: '开始', link: '/DevelopmentDoc/Filter/index.md' }] },
      ],
      '/DevelopmentDoc/3DLoad/': [
        { text: '3D智能配载', items: [{ text: '开始', link: '/DevelopmentDoc/3DLoad/index.md' }] },
      ],
      '/ApiDoc/Upgrade/': [
        { text: '基座升级文档', link: '/ApiDoc/Upgrade/index.md' },
        { text: '核心包升级文档', link: '/ApiDoc/Upgrade/core.md' },
        { text: '核心包转测文档', link: '/ApiDoc/Upgrade/core-test.md' },
      ],
      '/ApiDoc/CoreDevelop/': [
        {
          text: '核心包接口文档',
          items: [
            { text: 'dynamic-API', link: '/ApiDoc/CoreDevelop/dynamic-api.md' },
            { text: 'page-API', link: '/ApiDoc/CoreDevelop/page-api.md' },
            { text: 'file-API', link: '/ApiDoc/CoreDevelop/file-api.md' },
          ],
        },
      ],
      '/ApiDoc/Tools/': [
        {
          text: '工具类文档',
          items: [
            {
              text: 'eosoft-common',
              items: [
                { text: 'core', link: '/ApiDoc/Tools/coreUtils.md' },
                { text: 'mybatis', link: '/ApiDoc/Tools/mybatisUtils.md' },
                { text: 'redis', link: '/ApiDoc/Tools/redisUtils.md' },
                { text: 'security', link: '/ApiDoc/Tools/securityUtils.md' },
              ],
            },
            {
              text: 'eosoft-starters',
              items: [
                { text: 'sms', link: '/ApiDoc/Tools/smsUtils.md' },
                { text: 'page', link: '/ApiDoc/Tools/pageUtils.md' },
                { text: 'file', link: '/ApiDoc/Tools/fileUtils.md' },
                { text: 'dynamic', link: '/ApiDoc/Tools/dynamicUtils.md' },
              ],
            },
          ],
        },
      ],
    },
  },
  vite: {
    plugins: [
      externalMdIndexPlugin(),
      pagefindPlugin({
        btnPlaceholder: '搜索',
        placeholder: '搜索文档',
        emptyText: '暂无数据',
        header: '共: {{searchResult}} 条结果',
        toSelect: '选择',
        toNavigate: '切换',
        toClose: '关闭',
        searchBy: '',
      }),
    ],
  },
});
