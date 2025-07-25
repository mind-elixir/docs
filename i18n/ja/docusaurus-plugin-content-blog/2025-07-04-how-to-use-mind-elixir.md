---
slug: "how-to-use-mind-elixir"
publishDate: "2025-07-05T10:05:18.254Z"
title: "Webページにマインドマップ機能を簡単に統合 - Mind Elixir"
tags:
  ["JavaScript", "マインドマップ", "フロントエンド開発", "可視化", "オープンソースツール", "coding"]
description: "Mind ElixirをWebプロジェクトに統合してマインドマップ機能を実装する方法を詳しく解説。基本的なインストールから高度なカスタマイズまで、完全なコード例とベストプラクティスを含み、開発者がこの強力なJavaScriptマインドマップライブラリを素早く習得できるよう支援します。"
multiLang: ["en", "es", "ja", "ko", "ru"]
---

情報爆発の時代において、私たちは日々大量の複雑な情報やアイデアを処理しなければなりません。従来の線形ノートでは思考の飛躍性や関連性を表現することが困難ですが、**マインドマップ**は半自動的なノートツールとして、思考の整理、知識構造の体系化、創造的インスピレーションの刺激に役立ち、同時にホワイトボードや描画ソフトウェアよりも操作が便利です。

知識管理プラットフォーム、オンライン教育サイト、コラボレーションツールの構築において、マインドマップ機能の統合はユーザーエクスペリエンスを大幅に向上させ、複雑な情報の表示とインタラクションをより直感的で効率的にします。

あなたのWebプロジェクトにマインドマップ機能を統合したい場合、[Mind Elixir](https://github.com/SSShooter/mind-elixir-core)を活用すれば、**わずか数行のコード**でWebサイトにプロフェッショナルレベルのマインドマップ機能を追加できます。例えば**個人ブログ**では、記事の知識構造を表示したり、インタラクティブな学習ノートを作成したりできます。このような機能はコンテンツをより生き生きと興味深くするだけでなく、ブログの専門性を大幅に向上させます。

![Mind Elixir 内核](https://img.ssshooter.com/img/how-to-use-mind-elixir/screenshot.jpg)

オープンソースのJavaScriptマインドマップコア[Mind Elixir](https://github.com/SSShooter/mind-elixir-core)は、以下の主要機能を備えています：

- **スムーズなユーザーエクスペリエンス**
  滑らかなインタラクション、自然なフィードバック、モバイル対応。
- **軽量かつ高性能**
  小さなファイルサイズ、高速読み込みとレンダリング、複雑なグラフィックでも高フレームレートを維持。
- **フレームワーク非依存**
  React、Vue、Svelte、またはネイティブプロジェクトのいずれでも簡単に統合または独立実行が可能。
- **プラグイン式アーキテクチャ**
  柔軟なプラグインシステム、公式拡張機能やカスタムプラグインをサポート、機能モジュールの自由な組み合わせ。
- **PNG / HTML エクスポート対応**
  マインドマップを画像やHTMLページとしてエクスポート、共有と埋め込みが簡単。
- **ノード要約 / ノード接続**
  ノード要約、接続線、タグなど多様なノードスタイルをサポート、様々なニーズに対応。
- **元に戻す / やり直し対応**
  完全な操作履歴スタック、あらゆる変更を素早く元に戻すまたはやり直し可能、安心して操作。
- **効率的なショートカットキー対応**
  豊富なキーボードショートカット、プロフェッショナルユーザーの操作効率を向上。
- **CSS変数によるスタイルカスタマイズ**
  CSS変数でノードスタイルと全体テーマを簡単に制御、高度にカスタマイズされた美しいレイアウトを実現。

それでは、プロジェクトにMind Elixirを素早く統合する方法を簡単にご紹介しましょう！🤗

## 超簡単統合

依存関係のインストール：

```bash
npm i mind-elixir -S
```

Mind Elixirのインポート：

```javascript
import MindElixir from "mind-elixir";
import "mind-elixir/style"; // 5.0以降のバージョンでは手動でスタイルをインポートする必要があります
```

もちろん、`script`タグで直接インポートすることも可能です：

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/mind-elixir/dist/MindElixir.js"></script>
```

初期化前に、マウント対象要素のスタイルを調整する必要があります。具体的には**明確な幅と高さを設定する**必要があり、特に高さに注意が必要です。CSSに苦労したことのあるフロントエンド開発者なら誰でも知っているように、高さ100%は扱いにくい設定です。以下では高さ500pxのdivを例に説明します。

```html
<div id="map"></div>
<style>
	#map {
		height: 500px;
		width: 100%;
	}
</style>
```

続いて正式な初期化です。他の初期化オプションを考慮しない場合、マウント要素を渡すだけで完了です！

```javascript
import MindElixir from "mind-elixir";
import "mind-elixir/style";

let options = {
	el: "#map", // or HTMLDivElement
};

let mei = new MindElixir(options);
const data = MindElixir.new("new topic");
mei.init(data);
```

これで最も基本的な統合が完了しました！

> [!TIP]
> Codepenで試す：https://codepen.io/ssshooter/pen/vEOqWjE

## イベントリスニング

プロジェクトでマインドマップを使用した後、最も一般的な要件はイベントリスニングです。様々なノード操作を監視し、ユーザーの操作に応答する必要があります。例えば、ユーザーが新しいノードを作成した場合、それを適時保存する必要があります。

Mind Elixirは`bus`を使用してイベントを配信します。この用語は「バス」という概念に由来し、すべてのイベントはこの「バス」によって配信されます。使用方法はブラウザの`addEventListener`と似ており、`bus`にアクセスできれば、どこからでもイベントを監視できます。

最新版Mind Elixir 5.0では、以下のイベントが利用可能です：

```ts
type EventMap = {
	operation: (info: Operation) => void;
	selectNode: (nodeObj: NodeObj, e?: MouseEvent) => void;
	selectNewNode: (nodeObj: NodeObj) => void;
	selectNodes: (nodeObj: NodeObj[]) => void;
	unselectNodes: (nodeObj: NodeObj[]) => void;
	expandNode: (nodeObj: NodeObj) => void;
	linkDiv: () => void;
	scale: (scale: number) => void;
	move: (data: { dx: number; dy: number }) => void;
	updateArrowDelta: (arrow: Arrow) => void;
	showContextMenu: (e: MouseEvent) => void;
};
```

ほとんどのノード操作イベントは`operation`イベントにまとめられています。百聞は一見に如かず！プロジェクトに追加してノードを操作してみれば、すぐに理解できます：

```ts
mei.bus.addListener("operation", (operation) => {
	console.log(operation);
});
```

時にはイベントリスニングだけでは不十分で、データがデータベースに挿入された後に表示させたい場合は、**操作インターセプト**を使用する必要があります。`options`に`before`オプションを追加します。これはオブジェクトで、キーはインターセプトしたい操作です。`addChild`操作をインターセプトしたい場合は、以下のように書きます：

```ts
let mei = new MindElixir({
	// ...
	before: {
		async addChild(el, obj) {
			try {
				await saveToDatabase(obj);
				return true;
			} catch (error) {
				console.error("Error adding child:", error);
				return false;
			}
		},
	},
});
```

このように`saveToDatabase()`が正常に実行された後にのみ子ノードが実際に追加され、実行に失敗した場合は挿入操作がキャンセルされます。

> [!TIP]
> Codepenで試す：https://codepen.io/ssshooter/pen/EajBbrM

## マインドマップの再描画

Mind Elixirコアのデフォルト動作を使用してマインドマップを更新する以外に、ノードデータを直接更新してマインドマップを再描画することも可能です。

完全なノードデータ構造は以下の通りです：

```ts
export interface NodeObj {
	topic: string;
	id: Uid;
	style?: {
		fontSize?: string;
		color?: string;
		background?: string;
		fontWeight?: string;
	};
	children?: NodeObj[];
	tags?: string[];
	icons?: string[];
	hyperLink?: string;
	expanded?: boolean;
	direction?: Left | Right;
	image?: {
		url: string;
		width: number;
		height: number;
		fit?: "fill" | "contain" | "cover";
	};
	branchColor?: string;
	dangerouslySetInnerHTML?: string;
	note?: string;
}
```

ノードデータを変更することで、ノードに**画像、タグ、ハイパーリンクなど**の要素を挿入できます。例えば、Mind Elixirインスタンスの`nodeData`を読み取って現在のマインドマップデータを取得し、それを変更してから`refresh`メソッドを呼び出してマインドマップを再描画できます。

```ts
const data = mind.nodeData;
console.log(data);
data.topic = data.topic + "new Data";
mind.refresh();
```

しかし、マインドマップ全体を全く新しいデータに更新したい場合はどうでしょうか？それも可能です！Mind Elixir形式に準拠したデータを`refresh`メソッドに渡すことで、即座に全体を更新できます。

```ts
import data from "https://esm.sh/mind-elixir/dist/example.js";
mind.refresh(data);
```

> [!TIP]
> Codepenで試す：https://codepen.io/ssshooter/pen/vEOqpOX

## 再設計の自由

Mind Elixirはマインドマップを再設計する自由を提供します。

まず、`theme`と`cssVar`を使用してマインドマップ全体のスタイルを簡単に調整できます。コアには明暗2つのテーマ`MindElixir.DARK_THEME`と`MindElixir.THEME`が組み込まれており、カスタムテーマが必要な場合は、テーマ形式に従ってオブジェクトを作成してMind Elixirに渡すことができます。

完全なMind Elixirテーマと使用方法は以下の通りです：

```ts
const PROFESSIONAL_THEME = {
	name: "Professional",
	type: "light",
	palette: ["#2c2c2c", "#404040", "#555555", "#6a6a6a", "#7f7f7f", "#949494", "#a9a9a9"],
	cssVar: {
		"--node-gap-x": "32px",
		"--node-gap-y": "12px",
		"--main-gap-x": "68px",
		"--main-gap-y": "48px",
		"--root-radius": "8px",
		"--main-radius": "6px",
		"--root-color": "#ffffff",
		"--root-bgcolor": "#1a1a1a",
		"--root-border-color": "#333333",
		"--main-color": "#2c2c2c",
		"--main-bgcolor": "#ffffff",
		"--topic-padding": "4px",
		"--color": "#4a4a4a",
		"--bgcolor": "#fafafa",
		"--selected": "#666666",
		"--panel-color": "#2c2c2c",
		"--panel-bgcolor": "#ffffff",
		"--panel-border-color": "#e0e0e0",
	},
};

let mind = new MindElixir({
	el: "#map",
	theme: PROFESSIONAL_THEME,
});
```

注意：`data`自体も`theme`を含むことができ、`options`の`theme`を上書きします。これは各マインドマップが独立したテーマを持てるようにするためです。固定テーマが必要な場合は、初期化時に`data`の`theme`を`undefined`に設定することを忘れないでください。

P.S. 初期化後にテーマを再度変更したい場合は、`changeTheme`メソッドを使用できます。

`cssVar`でよく使用されるmain-gapは、メインノード間の間隔を調整できます：

![Mind Elixir main-gap](https://img.ssshooter.com/img/how-to-use-mind-elixir/main-gap.jpg)

node-gapはノード内部の間隔を調整できます：

![Mind Elixir node-gap](https://img.ssshooter.com/img/how-to-use-mind-elixir/node-gap.png)

> [!TIP]
> Codepenで試す：https://codepen.io/ssshooter/pen/azOgVKX

CSS変数で調整できないその他のパラメータについても、CSSオーバーライドで直接微調整できます。

さらに深く掘り下げると、`generateMainBranch`と`generateSubBranch`を使用して接続線のスタイルを調整できます。（例については下記のcodepenリンクをご覧ください）

適切な`generateMainBranch`と`generateSubBranch`を作成した後、展開・折りたたみボタンの位置が正しくない場合は、CSSで微調整できます。デフォルトスタイルは以下の通りです：

```less
// メインノード（ルートノードの次のレベルのノード）の展開・折りたたみボタンスタイル
me-main > me-wrapper > me-parent > me-epd {
	top: 50%;
	transform: translateY(-50%);
}
// その他の子ノードの展開・折りたたみボタンスタイル
me-epd {
	top: 100%;
	transform: translateY(-50%);
}
// 左側の展開・折りたたみボタン専用調整
.lhs {
	& > me-wrapper > me-parent > me-epd {
		left: -10px;
	}
	me-epd {
		left: 5px;
	}
}
// 右側の展開・折りたたみボタン専用調整
.rhs {
	& > me-wrapper > me-parent > me-epd {
		right: -10px;
	}
	me-epd {
		right: 5px;
	}
}
```

> [!TIP]
> Codepenで試す：https://codepen.io/ssshooter/pen/WNmZMmq

## ノードスタイル

全体的なスタイル以外にも、ノードにカスタマイズ要件がある場合、ノード自体に`style`を設定できます：

```ts
//...
{
  fontSize?: string
  color?: string
  background?: string
  fontWeight?: string
}
// ...
```

ノードに**非常に強い**カスタマイズ要件があり、この程度の`style`設定では全く不十分だと感じる場合でも、問題ありません。それにも対応できます！

`dangerouslySetInnerHTML`を使用してより高度なカスタマイズも可能です。例えば：

```ts
const data = {
	nodeData: {
		id: "me-root",
		topic: "Mind Elixir",
		tags: ["Mind Map Core"],
		children: [
			{
				topic: "Customized Div",
				id: "c00a2264f4532615",
				children: [
					{
						topic: "",
						id: "c00a2264f4532614",
						dangerouslySetInnerHTML:
							'<div><style>.title{font-size:50px}</style><div class="title">Title</div><div style="color: red; font-size: 20px;">Hello world</div></div>',
					},
				],
			},
		],
	},
};
```

> [!TIP]
> Codepenで試す：https://codepen.io/ssshooter/pen/MYwMrjZ

## 画像エクスポート

[modern-screenshot](https://github.com/qq15725/modern-screenshot)のおかげで、SVGを巧妙に利用してdivをそのまま画像に変換できます。基本的に、あまりにも極端な`dangerouslySetInnerHTML`（例：動画）を使用していなければ、正常に画像をエクスポートできます。`@ssshooter/modern-screenshot`には`padding`オプションが追加されており、スクリーンショットの余白を調整できます。

```ts
import { domToPng } from "@ssshooter/modern-screenshot";

const download = async () => {
	const dataUrl = await domToPng(mind.nodes, {
		onCloneNode: (node) => {
			const n = node as HTMLDivElement;
			n.style.position = "";
			n.style.top = "";
			n.style.left = "";
			n.style.bottom = "";
			n.style.right = "";
		},
		padding: 300,
		quality: 1,
	});
	const link = document.createElement("a");
	link.download = "screenshot.png";
	link.href = dataUrl;
	link.click();
};
```

[modern-screenshot](https://github.com/qq15725/modern-screenshot)または最近リリースされた[snapdom](https://github.com/zumerlab/snapdom)を直接使用することも可能です。スクリーンショットが不完全な場合（主に要約と接続線が不完全な場合）は、`cssVar`の`--map-padding`を調整できます。

```ts
import { snapdom } from "@zumer/snapdom";

const dl2 = async () => {
	const result = await snapdom(mind.nodes);
	await result.download({ format: "jpg", filename: "my-capture" });
};
```

![Mind Elixir map-padding](https://img.ssshooter.com/img/how-to-use-mind-elixir/map-padding.jpg)

それでも画像の一部しかキャプチャされない場合は、scaleが1でないことが原因の可能性があります。スクリーンショット前に**scaleを1に設定**し、完了後に元のサイズに戻すことを試してください。

> [!TIP]
> Codepenで試す：https://codepen.io/ssshooter/pen/NPqZXXB

## サーバーサイドレンダリングフレームワークでの使用

Next.jsなどのサーバーサイドレンダリングフレームワークでMind Elixirを使用する際、`window is not defined`などの問題によく遭遇します。これはMind ElixirがDOM操作に大きく依存しており、**SSR環境では正常に動作しない**ためです。

この問題を解決するために、`useEffect`を使用してクライアントサイドレンダリング時にMind Elixirを読み込むことができます。以下は簡単な例です：

```tsx
"use client";
import { useEffect } from "react";
import { mindMapExample } from "./mapExample";

export const MindMap = ({ className }: { className: string }) => {
	useEffect(() => {
		import("mind-elixir").then((MindElixir) => {
			const theme = MindElixir.default.DARK_THEME;
			theme.cssVar["--bgcolor"] = "rgba(0,0,0,0)";
			const mei = new MindElixir.default({
				el: "#map",
				direction: 2,
				theme,
			});
			mei.init({
				nodeData: mindMapExample,
			});
			mei.toCenter();
			window.addEventListener("resize", () => {
				mei.toCenter();
			});
		});
	}, []);
	return (
		<div id="wrapper" className={className}>
			<div
				id="map"
				className="pointer-events-none h-[50vh] w-screen"
				onScroll={(e) => e.preventDefault()}
			></div>
		</div>
	);
};
```

## その他のMind Elixirオプション

Mind Elixirには他にも多くの設定可能なオプションがあります：

```ts
interface Options {
	// ...
	direction?: number; // ノードの配置方向、0 左 1 右 2 両側
	locale?: Locale; // 言語選択
	contextMenu?: boolean | ContextMenuOption; // 右クリックメニューを有効にするか、オプション追加可能
	toolBar?: boolean; // 内蔵ツールバーを有効にするか
	keypress?: boolean | KeypressOptions; // ショートカットキーを有効にするか、カスタムショートカット追加可能
	mouseSelectionButton?: 0 | 2; // ドラッグボタン、デフォルトは右クリックドラッグ
	before?: Before; // 上記で言及した操作インターセプト
	newTopicName?: string; // 新規ノードのデフォルト値
	allowUndo?: boolean; // 元に戻す/やり直しを有効にするか
	overflowHidden?: boolean; // 画面が移動可能か、マインドマップカード表示時に使用
	alignment?: Alignment; // nodesに設定すると画面中心がマインドマップ中心、rootに設定すると画面中心がルートノード中心、デフォルトはroot
	scaleSensitivity?: number; // スクロールホイールとメニューの拡大縮小感度
	draggable?: boolean; // ノードをドラッグ可能か
	editable?: boolean; // 編集可能か
	// ...
}
```

## まとめ

本記事の紹介を通じて、Mind Elixirの基本的な使用から高度なカスタマイズまでの様々なテクニックを習得できたと思います。使用中に問題が発生したり、より良いアイデアや提案がある場合は、コメント欄で共有していただくか、[GitHub](https://github.com/SSShooter/mind-elixir-core)でディスカッションに参加してPRを提出してください！一緒にMind Elixirをより完璧にしていきましょう！
