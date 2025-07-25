---
slug: "how-to-use-mind-elixir"
publishDate: "2025-07-05T10:05:18.254Z"
title: "轻松在网页中集成专业思维导图功能 - Mind Elixir"
tags: ["JavaScript", "思维导图", "前端开发", "可视化", "开源工具", "coding"]
description: "详细介绍如何使用 Mind Elixir 在网页项目中集成思维导图功能。从基础安装到高级定制，包含完整代码示例和最佳实践，帮助开发者快速上手这个强大的 JavaScript 思维导图库。"
multiLang: ['en', 'es', 'ja', 'ko', 'ru']
---

在信息爆炸的时代，我们每天都要处理大量复杂的信息和想法。传统的线性笔记往往难以展现思维的跳跃性和关联性，而**思维导图**作为一种半自动档的笔记工具，能够帮助我们更好地整理思路、梳理知识结构、激发创意灵感，同时操作又比白板、画图软件的操作更便利。

无论是构建知识管理平台、在线教育网站，还是协作工具，集成思维导图功能都能显著提升用户体验，让复杂信息的展示和交互变得更加直观高效。

如果你想在自己的 Web 项目中集成思维导图功能，借助 [Mind Elixir](https://github.com/SSShooter/mind-elixir-core)，**最快只需几行代码**就能在你的网站中添加专业级的思维导图功能。比如在**个人博客**中，你可以用思维导图来展示文章的知识结构、制作交互式的学习笔记，这样的功能不仅能让内容更加生动有趣，还能显著提升博客的专业度。

![Mind Elixir 内核](https://img.ssshooter.com/img/how-to-use-mind-elixir/screenshot.jpg)

开源的 JavaScript 思维导图内核 [Mind Elixir](https://github.com/SSShooter/mind-elixir-core)，拥有以下核心特性：

- **流畅的用户体验**
  交互顺滑、反馈自然，支持移动端。
- **轻量且高性能**
  小体积，快速加载与渲染，确保复杂图形下依然保持高帧率。
- **框架无关**
  无论是 React、Vue、Svelte，还是原生项目，都可轻松集成或独立运行。
- **插件式架构**
  灵活的插件系统，支持官方扩展或自定义插件，自由组合功能模块。
- **支持导出 PNG / HTML**
  将思维导图导出为图片或 HTML 页面，方便分享与嵌入。
- **节点摘要 / 节点连接**
  支持节点摘要、连接线、标签等多种节点样式，满足不同需求。
- **支持撤销 / 重做**
  完整的操作历史栈，任何修改都可快速回退或重做，放心操作。
- **高效快捷键支持**
  丰富的键盘快捷方式，提升专业用户的操作效率。
- **CSS 变量样式自定义**
  通过 CSS 变量轻松控制节点样式和整体主题，实现高度定制化美观布局。

下面简单介绍一下怎么快速在你的项目中集成 Mind Elixir 吧！🤗

## 超简易接入

安装依赖：

```bash
npm i mind-elixir -S
```

引入 Mind Elixir：

```javascript
import MindElixir from "mind-elixir";
import "mind-elixir/style"; // 5.0 后的版本需要主动引入样式
```

当然你也可以直接用 `script` 引入：

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/mind-elixir/dist/MindElixir.js"></script>
```

在初始化前，我们还需要调整一下你的挂载目标元素样式。准确来说是需要**给它一个明确的宽高**，尤其注意高度哦。被 CSS 折磨过的前端朋友都知道，高度 100% 是一个比较难驾驭的设定。下面就直接以 500px 高的 div 为例。

```html
<div id="map"></div>
<style>
	#map {
		height: 500px;
		width: 100%;
	}
</style>
```

接着是正式初始化，如果不考虑其他初始化选项，只需要传入挂载元素即可！

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

到这里就已经完成最基础的接入啦！

> [!TIP]
> 在 Codepen 试玩：https://codepen.io/ssshooter/pen/vEOqWjE

## 事件监听

在你的项目里用上思维导图之后，最常见的需求便是监听事件了，你需要监听各种节点操作，然后对用户操作做出响应。例如用户新建了一个节点，你需要及时把它保存起来。

Mind Elixir 使用 `bus` 派发事件，这个词来源于“总线”这个概念，所有事件都会由这个“总线”派发。使用上跟浏览器的 `addEventListener` 类似，只要你能拿到 `bus`，你就可以在任何地方监听事件。

截止到最新版 Mind Elixir 5.0，有以下事件：

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

其中大部分节点操作事件都被归到 `operation` 事件中，Talk is cheap！在项目中加上然后再操作一下节点就很好懂了：

```ts
mei.bus.addListener("operation", (operation) => {
	console.log(operation);
});
```

有时候监听事件还不够，如果你需要确保数据插入到数据库之后，再让它显示出来，那就要用到**操作拦截**了。在 `options` 中加入 `before` 选项，这是一个对象，key 为你需要拦截的操作，如果你需要拦截 `addChild` 操作，可以这样写：

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

这样在 `saveToDatabase()` 运行成功之后才会真正添加子节点，运行失败会取消插入操作。

> [!TIP]
> 在 Codepen 试玩：https://codepen.io/ssshooter/pen/EajBbrM

## 思维导图重绘

除了使用 Mind Elixir 内核的默认行为更新思维导图，你还可以通过直接更新节点数据来重绘思维导图。

完整的节点数据结构如下：

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

通过修改节点数据可以在节点插入**图片、标签、超链接等**元素。举个例子，你可以通过读取 Mind Elixir 实例的 `nodeData` 获取到当前的思维导图数据，然后对它进行修改，最后调用 `refresh` 方法重绘思维导图。

```ts
const data = mind.nodeData;
console.log(data);
data.topic = data.topic + "new Data";
mind.refresh();
```

但是如果你想把整个思维导图更新到全新的数据呢？也可以！把符合 Mind Elixir 格式的数据传到 `refresh` 方法，就能立即更新全图。

```ts
import data from "https://esm.sh/mind-elixir/dist/example.js";
mind.refresh(data);
```

> [!TIP]
> 在 Codepen 试玩：https://codepen.io/ssshooter/pen/vEOqpOX

## 重新设计的自由

Mind Elixir 赋予你重新设计思维套图的自由。

首先你可以通过 `theme` 和 `cssVar` 简单调整整个思维导图的风格。内核自带明暗两个主题 `MindElixir.DARK_THEME` 和 `MindElixir.THEME` 可供选择，如果需要自定义主题，可以按照主题格式写一个对象传入 Mind Elixir。

一个完整的 Mind Elixir 主题和使用方式如下：

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

注意 `data` 本身也可以包含 `theme`，且会覆盖掉 `options` 中的 `theme`。这是为了保证每个思维导图都可以有独立的主题，如果你需要固定主题，记得在初始化时把 `data` 的 `theme` 置为 `undefined`。

P.S. 在初始化后想要再次修改主题，可以使用 `changeTheme` 方法。

`cssVar` 中比较常用的 main-gap 可以调整主节点间的间距：

![Mind Elixir main-gap](https://img.ssshooter.com/img/how-to-use-mind-elixir/main-gap.jpg)

node-gap 可以调整节点内部的间距：

![Mind Elixir node-gap](https://img.ssshooter.com/img/how-to-use-mind-elixir/node-gap.png)

> [!TIP]
> 在 Codepen 试玩：https://codepen.io/ssshooter/pen/azOgVKX

其他不能通过 css 变量调整的参数，你也可以直接通过 CSS 覆盖来微调。

在深入一点，可以通过 `generateMainBranch` 和 `generateSubBranch` 调整连线的样式。（例子请看下面 codepen 链接）

写好合适的 `generateMainBranch` 和 `generateSubBranch` 之后，如果你发现展开收缩的按钮位置不对，可以通过 CSS 进行微调。默认样式如下：

```less
// 主节点（根节点的下一级节点）的展开收缩按钮样式
me-main > me-wrapper > me-parent > me-epd {
	top: 50%;
	transform: translateY(-50%);
}
// 其他子节点的展开收缩按钮样式
me-epd {
	top: 100%;
	transform: translateY(-50%);
}
// 左侧的展开收缩按钮专用调整
.lhs {
	& > me-wrapper > me-parent > me-epd {
		left: -10px;
	}
	me-epd {
		left: 5px;
	}
}
// 右侧的展开收缩按钮专用调整
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
> 在 Codepen 试玩：https://codepen.io/ssshooter/pen/WNmZMmq

## 节点样式

要是除了整体风格，你对节点也有自定义需求，节点本身是可以设置 `style` 的：

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

如果你对节点有**非常强的**自定义需求，觉得这点 `style` 配置根本不够用，那也没问题，还可以满足你！

你还可以通过 `dangerouslySetInnerHTML` 玩得更花，例如：

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
> 在 Codepen 试玩：https://codepen.io/ssshooter/pen/MYwMrjZ

## 导出图片

感谢 [modern-screenshot](https://github.com/qq15725/modern-screenshot)，它利用 svg 巧妙地把 div 原封不动地转换为图片，基本上如果你没有搞太离谱的 `dangerouslySetInnerHTML`（例如视频），都能正常导出图片。`@ssshooter/modern-screenshot` 额外添加了 `padding` 选项可以调整截图的边距。

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

直接使用 [modern-screenshot](https://github.com/qq15725/modern-screenshot) 或者最近才发布的 [snapdom](https://github.com/zumerlab/snapdom) 都是可以的。如果遇到截图不完整的情况（主要是总结和连线不完整的情况）可以调整 `cssVar` 中的 `--map-padding`。

```ts
import { snapdom } from "@zumer/snapdom";

const dl2 = async () => {
	const result = await snapdom(mind.nodes);
	await result.download({ format: "jpg", filename: "my-capture" });
};
```

![Mind Elixir map-padding](https://img.ssshooter.com/img/how-to-use-mind-elixir/map-padding.jpg)

如果还是出现图片只截取到一部分的情况，可能是 scale 不等于 1 导致的，可以尝试在截图前**设置 scale 为 1**，完成后恢复原来的大小。

> [!TIP]
> 在 Codepen 试玩：https://codepen.io/ssshooter/pen/NPqZXXB

## 在端渲染框架使用

在 Next.js 等后端渲染框架中使用 Mind Elixir 常常会遇到 `window is not defined` 之类的问题。原因是 Mind Elixir 高强度依赖各种 DOM 操作，**在 SSR 的环境下是无法正常工作的**。

为了解决这个问题，可以使用 `useEffect` 在客户端渲染时加载 Mind Elixir。下面是一个简单的示例：

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

## 其他 Mind Elixir 选项

Mind Elixir 还有很多其他选项可以配置：

```ts
interface Options {
	// ...
	direction?: number; // 节点排布方向，0 左 1 右 2 两侧
	locale?: Locale; // 语言选择
	contextMenu?: boolean | ContextMenuOption; // 是否启用右键菜单，可添加选项
	toolBar?: boolean; // 是否启动内置工具栏
	keypress?: boolean | KeypressOptions; // 是否启用快捷键，可添加自定义快捷键
	mouseSelectionButton?: 0 | 2; // 拖拽按键，默认右键拖拽
	before?: Before; // 上面提到的操作拦截
	newTopicName?: string; // 新增节点的默认值
	allowUndo?: boolean; // 是否启用撤消/重做
	overflowHidden?: boolean; // 画面是否可以移动，显示思维导图卡片时可用
	alignment?: Alignment; // 设为 nodes 时画面中心为思维导图中心，设为 root 时画面中心为根节点中心，默认 root
	scaleSensitivity?: number; // 滚轮和菜单的放大缩小敏感度
	draggable?: boolean; // 是否可以拖拽节点
	editable?: boolean; // 是否可编辑
	// ...
}
```

## 结语

通过本文的介绍，相信你已经掌握了 Mind Elixir 从基础使用到高级定制的各种技巧啦。如果你在使用过程中遇到问题，或者有更好的想法和建议，可以在评论区分享，也欢迎在 [GitHub](https://github.com/SSShooter/mind-elixir-core) 上参与讨论，提 PR！一起让 Mind Elixir 变得更完美！
