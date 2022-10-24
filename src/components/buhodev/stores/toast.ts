import { writable } from 'svelte/store'

type ToastOptions = {
	id: number
	type: string
	dismissible: boolean
	timeout: number
}

export const toasts = writable([])

export const addToast = (toast: ToastOptions) => {
	const id = Math.floor(Math.random() * 10000)

	const defaults: ToastOptions = {
		id,
		type: 'info',
		dismissible: true,
		timeout: 3000
	}

	toasts.update((all) => [{ ...defaults, ...toast }, ...all])

	if (toast.timeout) setTimeout(() => dismissToast(id), toast.timeout)
}

export const dismissToast = (id: ToastOptions['id']) => {
	toasts.update((all) => all.filter((t) => t.id !== id))
}
