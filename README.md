# react-render-order-fixer
This library allows your react component to be re-rendered where it is needed.

Mainly for solving this issue: [https://github.com/draft-js-plugins/draft-js-plugins/issues/311](https://github.com/draft-js-plugins/draft-js-plugins/issues/311)

## Install

Install via npm:

```bash
$ npm i react-render-order-fixer
```

## Usage

For example, the rendering of `Component1` relies on the results after `Component2`'s rendering, but `Component1` needs to be placed above `Component2` in the DOM structure:

```
<div>
	<Component1/>
	<Component2/>
</div>
```

`Component1` will not remaining fully synced to the latest state.

With this library:

```
import createRenderOrderFixer from 'react-render-order-fixer'
const renderOrderFixer = createRenderOrderFixer()
const Component1Fixed = renderOrderFixer.withOrderFixer(Component1)
const { ReRenderTrigger } = renderOrderFixer

<div>
	<Component1Fixed/>
	<Component2/>
	<ReRenderTrigger/>
</div>
```

Wrapping `Component1` with `withOrderFixer`, and when `ReRenderTrigger` to be rendered, `Component1Fixed` will be rendered again.

If you want to trigger re-render by a custom action, just call `renderOrderFixer.triggerAction()`.

## License
MIT
