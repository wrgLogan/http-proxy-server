var proxy = [
    {
        url: '/rest/v0/*',
        target: 'http://127.0.0.1:8080'
    }
]

module.exports = proxy;