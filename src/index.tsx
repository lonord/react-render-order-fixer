import debug from 'debug'
import decorateComponentWithProps from 'decorate-component-with-props'
import * as React from 'react'

import ReRenderTrigger from './component/re-render-trigger'
import createActionEmitter from './util/action-emitter-creator'

const d = debug('react-render-order-fixer')

export default function createRenderOrderFixer() {

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

			render() {
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
