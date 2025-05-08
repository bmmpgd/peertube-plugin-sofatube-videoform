async function register ({
                             registerHook,
                             storageManager,
                             registerSettingsScript
                         }) {
    const fieldNames = ['course', 'program'];

    // Store data associated to this video when created or updated
    registerHook({
        target: 'action:api.video.updated',
        handler: async ({ video, req }) => {
            console.log('Server: Video updated hook triggered');
            console.log('Request body:', req.body);

            if (!req.body.pluginData) {
                console.log('Server: No pluginData in request');
                return;
            }

            console.log('Server: Found pluginData in request:', req.body.pluginData);

            // Store each field's value
            for (const fieldName of fieldNames) {
                const value = req.body.pluginData[fieldName];
                if (value !== undefined) {
                    console.log(`Server: Storing ${fieldName} value:`, value);
                    await storageManager.storeData(`${fieldName}-${video.id}`, value);
                }
            }
        }
    });

    // Add your custom value to the video, so the client autofill your field using the previously stored value
    registerHook({
        target: 'filter:api.video.get.result',
        handler: async (video) => {
            console.log(video);
            if (!video) return video
            if (!video.pluginData) video.pluginData = {}

            const result = await storageManager.getData(fieldName + '-' + video.id)
            video.pluginData[fieldName] = result

            return video
        }
    })

    registerHook({
        target: 'action:api.video.created',
        handler: async ({ video, req }) => {
            console.log('Server: Video created hook triggered');

            if (!req.body.pluginData) {
                console.log('Server: No pluginData in creation request');
                return;
            }

            // Store each field's value
            for (const fieldName of fieldNames) {
                const value = req.body.pluginData[fieldName];
                if (value !== undefined) {
                    console.log(`Server: Storing ${fieldName} value on creation:`, value);
                    await storageManager.storeData(`${fieldName}-${video.id}`, value);
                }
            }
        }
    });
}
async function unregister () {
    return;
}

module.exports = {
    register,
    unregister
}
