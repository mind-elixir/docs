<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [mind-elixir](./mind-elixir.md) &gt; [MindElixirInstance](./mind-elixir.mindelixirinstance.md)

## MindElixirInstance interface

The MindElixir instance

**Signature:**

```typescript
export interface MindElixirInstance extends MindElixirMethods 
```
**Extends:** [MindElixirMethods](./mind-elixir.mindelixirmethods.md)

## Properties

<table><thead><tr><th>

Property


</th><th>

Modifiers


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[alignment](./mind-elixir.mindelixirinstance.alignment.md)


</td><td>


</td><td>

Alignment


</td><td>


</td></tr>
<tr><td>

[allowUndo](./mind-elixir.mindelixirinstance.allowundo.md)


</td><td>


</td><td>

boolean


</td><td>


</td></tr>
<tr><td>

[arrows](./mind-elixir.mindelixirinstance.arrows.md)


</td><td>


</td><td>

[Arrow](./mind-elixir.arrow.md)<!-- -->\[\]


</td><td>


</td></tr>
<tr><td>

[before](./mind-elixir.mindelixirinstance.before.md)


</td><td>


</td><td>

Before


</td><td>


</td></tr>
<tr><td>

[bus](./mind-elixir.mindelixirinstance.bus.md)


</td><td>


</td><td>

ReturnType&lt;typeof Bus.create&lt;[EventMap](./mind-elixir.eventmap.md)<!-- -->&gt;&gt;


</td><td>


</td></tr>
<tr><td>

[container](./mind-elixir.mindelixirinstance.container.md)


</td><td>


</td><td>

HTMLElement


</td><td>


</td></tr>
<tr><td>

[contextMenu](./mind-elixir.mindelixirinstance.contextmenu.md)


</td><td>


</td><td>

boolean


</td><td>


</td></tr>
<tr><td>

[contextMenuOption?](./mind-elixir.mindelixirinstance.contextmenuoption.md)


</td><td>


</td><td>

ContextMenuOption


</td><td>

_(Optional)_


</td></tr>
<tr><td>

[currentArrow](./mind-elixir.mindelixirinstance.currentarrow.md)


</td><td>


</td><td>

[CustomSvg](./mind-elixir.customsvg.md) \| null


</td><td>


</td></tr>
<tr><td>

[currentNode](./mind-elixir.mindelixirinstance.currentnode.md)


</td><td>


</td><td>

[Topic](./mind-elixir.topic.md) \| null


</td><td>


</td></tr>
<tr><td>

[currentNodes](./mind-elixir.mindelixirinstance.currentnodes.md)


</td><td>


</td><td>

[Topic](./mind-elixir.topic.md)<!-- -->\[\] \| null


</td><td>


</td></tr>
<tr><td>

[currentSummary](./mind-elixir.mindelixirinstance.currentsummary.md)


</td><td>


</td><td>

[SummarySvgGroup](./mind-elixir.summarysvggroup.md) \| null


</td><td>


</td></tr>
<tr><td>

[direction](./mind-elixir.mindelixirinstance.direction.md)


</td><td>


</td><td>

number


</td><td>


</td></tr>
<tr><td>

[disposable](./mind-elixir.mindelixirinstance.disposable.md)


</td><td>


</td><td>

Array&lt;() =&gt; void&gt;


</td><td>


</td></tr>
<tr><td>

[draggable](./mind-elixir.mindelixirinstance.draggable.md)


</td><td>


</td><td>

boolean


</td><td>


</td></tr>
<tr><td>

[editable](./mind-elixir.mindelixirinstance.editable.md)


</td><td>


</td><td>

boolean


</td><td>


</td></tr>
<tr><td>

[generateMainBranch](./mind-elixir.mindelixirinstance.generatemainbranch.md)


</td><td>


</td><td>

(params: [MainLineParams](./mind-elixir.mainlineparams.md)<!-- -->) =&gt; PathString


</td><td>


</td></tr>
<tr><td>

[generateSubBranch](./mind-elixir.mindelixirinstance.generatesubbranch.md)


</td><td>


</td><td>

(params: [SubLineParams](./mind-elixir.sublineparams.md)<!-- -->) =&gt; PathString


</td><td>


</td></tr>
<tr><td>

[history](./mind-elixir.mindelixirinstance.history.md)


</td><td>


</td><td>

[Operation](./mind-elixir.operation.md)<!-- -->\[\]


</td><td>


</td></tr>
<tr><td>

[isFocusMode](./mind-elixir.mindelixirinstance.isfocusmode.md)


</td><td>


</td><td>

boolean


</td><td>


</td></tr>
<tr><td>

[keypress](./mind-elixir.mindelixirinstance.keypress.md)


</td><td>


</td><td>

boolean


</td><td>


</td></tr>
<tr><td>

[line1](./mind-elixir.mindelixirinstance.line1.md)


</td><td>


</td><td>

SVGElement


</td><td>


</td></tr>
<tr><td>

[line2](./mind-elixir.mindelixirinstance.line2.md)


</td><td>


</td><td>

SVGElement


</td><td>


</td></tr>
<tr><td>

[lines](./mind-elixir.mindelixirinstance.lines.md)


</td><td>


</td><td>

SVGElement


</td><td>


</td></tr>
<tr><td>

[linkController](./mind-elixir.mindelixirinstance.linkcontroller.md)


</td><td>


</td><td>

SVGElement


</td><td>


</td></tr>
<tr><td>

[linkSvgGroup](./mind-elixir.mindelixirinstance.linksvggroup.md)


</td><td>


</td><td>

SVGElement


</td><td>


</td></tr>
<tr><td>

[locale](./mind-elixir.mindelixirinstance.locale.md)


</td><td>


</td><td>

[Locale](./mind-elixir.locale.md)


</td><td>


</td></tr>
<tr><td>

[map](./mind-elixir.mindelixirinstance.map.md)


</td><td>


</td><td>

HTMLElement


</td><td>


</td></tr>
<tr><td>

[mindElixirBox](./mind-elixir.mindelixirinstance.mindelixirbox.md)


</td><td>


</td><td>

HTMLElement


</td><td>


</td></tr>
<tr><td>

[mouseSelectionButton](./mind-elixir.mindelixirinstance.mouseselectionbutton.md)


</td><td>


</td><td>

0 \| 2


</td><td>


</td></tr>
<tr><td>

[newTopicName](./mind-elixir.mindelixirinstance.newtopicname.md)


</td><td>


</td><td>

string


</td><td>


</td></tr>
<tr><td>

[nodeData](./mind-elixir.mindelixirinstance.nodedata.md)


</td><td>


</td><td>

[NodeObj](./mind-elixir.nodeobj.md)


</td><td>


</td></tr>
<tr><td>

[nodeDataBackup](./mind-elixir.mindelixirinstance.nodedatabackup.md)


</td><td>


</td><td>

[NodeObj](./mind-elixir.nodeobj.md)


</td><td>


</td></tr>
<tr><td>

[nodes](./mind-elixir.mindelixirinstance.nodes.md)


</td><td>


</td><td>

HTMLElement


</td><td>


</td></tr>
<tr><td>

[overflowHidden](./mind-elixir.mindelixirinstance.overflowhidden.md)


</td><td>


</td><td>

boolean


</td><td>


</td></tr>
<tr><td>

[P2](./mind-elixir.mindelixirinstance.p2.md)


</td><td>


</td><td>

HTMLElement


</td><td>


</td></tr>
<tr><td>

[P3](./mind-elixir.mindelixirinstance.p3.md)


</td><td>


</td><td>

HTMLElement


</td><td>


</td></tr>
<tr><td>

[redo](./mind-elixir.mindelixirinstance.redo.md)


</td><td>


</td><td>

() =&gt; void


</td><td>


</td></tr>
<tr><td>

[root](./mind-elixir.mindelixirinstance.root.md)


</td><td>


</td><td>

HTMLElement


</td><td>


</td></tr>
<tr><td>

[scaleVal](./mind-elixir.mindelixirinstance.scaleval.md)


</td><td>


</td><td>

number


</td><td>


</td></tr>
<tr><td>

[selection](./mind-elixir.mindelixirinstance.selection.md)


</td><td>


</td><td>

SelectionArea


</td><td>


</td></tr>
<tr><td>

[selectionContainer?](./mind-elixir.mindelixirinstance.selectioncontainer.md)


</td><td>


</td><td>

string \| HTMLElement


</td><td>

_(Optional)_


</td></tr>
<tr><td>

[summaries](./mind-elixir.mindelixirinstance.summaries.md)


</td><td>


</td><td>

[Summary](./mind-elixir.summary.md)<!-- -->\[\]


</td><td>


</td></tr>
<tr><td>

[summarySvg](./mind-elixir.mindelixirinstance.summarysvg.md)


</td><td>


</td><td>

SVGElement


</td><td>


</td></tr>
<tr><td>

[tempDirection](./mind-elixir.mindelixirinstance.tempdirection.md)


</td><td>


</td><td>

number \| null


</td><td>


</td></tr>
<tr><td>

[theme](./mind-elixir.mindelixirinstance.theme.md)


</td><td>


</td><td>

[Theme](./mind-elixir.theme.md)


</td><td>


</td></tr>
<tr><td>

[toolBar](./mind-elixir.mindelixirinstance.toolbar.md)


</td><td>


</td><td>

boolean


</td><td>


</td></tr>
<tr><td>

[undo](./mind-elixir.mindelixirinstance.undo.md)


</td><td>


</td><td>

() =&gt; void


</td><td>


</td></tr>
<tr><td>

[userTheme?](./mind-elixir.mindelixirinstance.usertheme.md)


</td><td>


</td><td>

[Theme](./mind-elixir.theme.md)


</td><td>

_(Optional)_


</td></tr>
<tr><td>

[waitCopy](./mind-elixir.mindelixirinstance.waitcopy.md)


</td><td>


</td><td>

[Topic](./mind-elixir.topic.md)<!-- -->\[\] \| null


</td><td>


</td></tr>
</tbody></table>
