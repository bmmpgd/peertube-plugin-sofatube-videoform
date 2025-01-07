import {RegisterServerOptions} from '@peertube/peertube-types'

async function register({registerHook, peertubeHelpers}: RegisterServerOptions) {
    // Register client files that will be injected
    await peertubeHelpers.plugin.registerClientFiles([
        'client/common-client-plugin.js'
    ])
}

export {
    register
}
