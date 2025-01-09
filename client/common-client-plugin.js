function register ({ registerHook, peertubeHelpers }) {
    const favicon = document.querySelector('link[rel="icon"]')
    favicon.href = peertubeHelpers.getBaseStaticRoute() + '/images/sofa.png'
}

export {
    register
}
