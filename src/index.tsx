import debug from 'debug'
import * as React from 'react'

import createActionTrigger from './util/action-trigger'

const d = debug('react-render-order-fixer')

export default function createRenderOrderFixer() {

	const action = createActionTrigger()

	function withOrderFixer<P = {}>(Comp: React.ComponentClass<P>): React.ComponentClass<P> {
		return class ComponentWithOrderFixer extends React.Component<P> {

			handleAction = () => {
				d('Force update component: %s', Comp.displayName)
				this.forceUpdate()
			}

			componentWillUnmount() {
				action.removeListener(this.handleAction)
			}

			componentDidMount() {
				action.addListener(this.handleAction)
			}

			render() {
				return (
					<Comp {...this.props} />
				)
			}

		}
	}

	class ReRenderTrigger extends React.Component<any, any> {

		handleUpdate = () => {
			d('Triggered by TriggerComponent')
			action.fireAction()
		}

		componentDidUpdate() {
			this.handleUpdate()
		}

		componentDidMount() {
			this.handleUpdate()
		}

		render() {
			return null
		}
	}

	return {
		withOrderFixer,
		ReRenderTrigger,
		triggerAction: () => {
			d('Triggered by triggerAction()')
			action.fireAction()
		}
	}
}
