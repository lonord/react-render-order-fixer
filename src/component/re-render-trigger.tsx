import debug from 'debug'
import * as React from 'react'
import { ActionEmitter } from '../util/action-emitter-creator'

const d = debug('react-render-order-fixer:ReRenderTrigger')

export interface ReRenderTriggerProps {
	emitter: ActionEmitter
}

export default class ReRenderTrigger extends React.Component<ReRenderTriggerProps, any> {

	handleUpdate = () => {
		d('Triggered by TriggerComponent')
		this.props.emitter && this.props.emitter.fireAction()
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
