export default function createActionTrigger() {
	const listeners = []
	return {
		addListener: (fn) => {
			listeners.push(fn)
		},
		removeListener: (fn) => {
			const idx = listeners.indexOf(fn)
			if (idx >= 0) {
				listeners.splice(idx, 1)
			}
		},
		fireAction: () => {
			listeners.forEach(l => l())
		}
	}
}
