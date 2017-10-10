import debug from 'debug'
import decorateComponentWithProps from 'decorate-component-with-props'
import * as React from 'react'

import ReRenderTrigger from './component/re-render-trigger'
import createActionEmitter from './util/action-emitter-creator'

const d = debug('react-render-order-fixer')

export interface RenderOrderFixerOptions {
	alwaysUpdate?: boolean
}

export default function createRenderOrderFixer(options: RenderOrderFixerOptions = {}) {

	const { alwaysUpdate } = options
	const emitter = createActionEmitter()

	function withOrderFixer<P = {}>(Comp: React.ComponentClass<P>): React.ComponentClass<P> {
		return class ComponentWithOrderFixer extends React.Component<P> {

			handleAction = () => {
				d('Force update component: %s', Comp.displayName)
				this.forceUpdate()
			}

			componentWillUnmount() {
				emitter.removeListener(this.handleAction)
			}

			componentDidMount() {
				emitter.addListener(this.handleAction)
			}

			// Only update <Comp/> when `this.forceUpdate()` called
			shouldComponentUpdate() {
				return !!alwaysUpdate
			}

			render() {
				d('Component %s rendered', Comp.displayName)
				return (
					<Comp {...this.props} />
				)
			}

		}
	}

	return {
		withOrderFixer,
		ReRenderTrigger: decorateComponentWithProps(ReRenderTrigger, { emitter }),
		triggerAction: () => {
			d('Triggered by triggerAction()')
			emitter.fireAction()
		}
	}
}
