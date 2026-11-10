import type { MindElixirData } from 'mind-elixir'

type Branch = { topic: string; children: string[] }

type Copy = {
  root: string
  tag: string
  branches: Branch[]
}

const COPY: Record<string, Copy> = {
  en: {
    root: 'Mind Elixir Core',
    tag: 'JavaScript mind map',
    branches: [
      {
        topic: 'Framework agnostic',
        children: ['React', 'Vue', 'Svelte', 'Vanilla JS'],
      },
      {
        topic: 'Zero dependencies',
        children: ['33 kB gzipped', 'TypeScript types included'],
      },
      {
        topic: 'Rich editing',
        children: [
          'Multi-select drag & drop',
          'Node linking',
          'Summaries',
          'Undo / redo',
        ],
      },
      {
        topic: 'Export & theming',
        children: ['SVG', 'PNG', 'Custom themes', 'Plugins'],
      },
    ],
  },
  'zh-Hans': {
    root: 'Mind Elixir Core',
    tag: 'JavaScript 思维导图',
    branches: [
      {
        topic: '框架无关',
        children: ['React', 'Vue', 'Svelte', '原生 JS'],
      },
      {
        topic: '零依赖',
        children: ['gzip 后 33 kB', '自带 TypeScript 类型'],
      },
      {
        topic: '强大编辑能力',
        children: ['多选拖拽', '节点连线', '摘要', '撤销 / 重做'],
      },
      {
        topic: '导出与主题',
        children: ['SVG', 'PNG', '自定义主题', '插件'],
      },
    ],
  },
  ja: {
    root: 'Mind Elixir Core',
    tag: 'JavaScript マインドマップ',
    branches: [
      {
        topic: 'フレームワーク非依存',
        children: ['React', 'Vue', 'Svelte', 'Vanilla JS'],
      },
      {
        topic: '依存関係ゼロ',
        children: ['gzip で 33 kB', 'TypeScript 型定義付き'],
      },
      {
        topic: '充実した編集機能',
        children: ['複数選択ドラッグ', 'ノード連結', 'サマリー', '元に戻す / やり直し'],
      },
      {
        topic: '書き出しとテーマ',
        children: ['SVG', 'PNG', 'カスタムテーマ', 'プラグイン'],
      },
    ],
  },
}

export function createHomepageMindMap(locale: string): MindElixirData {
  const copy = COPY[locale] ?? COPY.en

  return {
    nodeData: {
      id: 'root',
      topic: copy.root,
      tags: [copy.tag],
      children: copy.branches.map((branch, branchIndex) => ({
        id: `branch-${branchIndex}`,
        topic: branch.topic,
        expanded: true,
        children: branch.children.map((topic, childIndex) => ({
          id: `branch-${branchIndex}-${childIndex}`,
          topic,
        })),
      })),
    },
  }
}
