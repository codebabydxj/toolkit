import { apiConfig } from "../api/apiConfig"

export const directives: any[] = [
    {
        name: 'permit', void: ({ permissions }: any) => {
            return (el: any, binding: any) => {
                if (apiConfig.debug) {
                    console.log(permissions)
                }
                if (!el) return
                const actions = permissions.map((item: any) => item.perms)
                if (typeof binding.value === 'string') {
                    if (!actions.includes(binding.value)) {
                        el.remove()
                    }
                } else {
                    if (!binding.value.find((item: any) => actions.includes(item))) {
                        el.remove()
                    }
                }
            }
        }
    },
    {
        name: 'role', void: ({ roles }: any) => {
            return (el: any, binding: any) => {
                if (apiConfig.debug) {
                    console.log(roles)
                }
                if (!el) return
                const actions = roles.map((item: any) => item.roleCode)
                if (typeof binding.value === 'string') {
                    if (!actions.includes(binding.value)) {
                        el.remove()
                    }
                } else {
                    if (!binding.value.find((item: any) => actions.includes(item))) {
                        el.remove()
                    }
                }
            }
        }
    },
    {
        name: 'reClick', void: () => {
            return (el: any, binding: any) => {
                if (!el) return
                const time = binding.value || 300
                el.addEventListener('click', (e: any) => {
                    if (el.classList.contains('is-disabled')) return
                    el.classList.add('is-disabled')
                    el.classList.add('is-loading')
                    el.disabled = true
                    const timer = setTimeout(() => {
                        el.classList.remove('is-disabled')
                        el.classList.remove('is-loading')
                        el.disabled = false
                        clearTimeout(timer)
                    }, time)
                })
            }
        },
    },
    {
        name: 'table', void: () => {
            return (el: any, binding: any) => {
                const column = binding.instance[binding.value || 'column']
                column.forEach((item: any) => {
                    if (item.label === 'Name')
                        item.fixed = 'right'
                });
            }
        }
    }
]