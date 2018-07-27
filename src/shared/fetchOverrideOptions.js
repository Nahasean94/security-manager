export function fetchOptionsOverride(options) {
    options.url = 'http://localhost:8080/graphql'
    const token = localStorage.getItem('SecurityManager')
    if (token) options.headers.Authorization = `Bearer ${token}`
}
