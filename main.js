async function register ({
                             registerHook,
                             storageManager,
                             registerSetting
                         }) {
    const fieldNames = ['course', 'program'];

    registerSetting({
        name: 'enable-custom',
        label: 'Enable custom form.',
        type: 'input-checkbox',
        default: false,
        private: false,
        descriptionHTML: 'Enabling this will modify the video submission and editing form'
    })


    // Store data associated to this video when created or updated
    registerHook({
        target: 'action:api.video.updated',
        handler: async ({ video, body }) => {
            if (!body.pluginData) return;

            console.log('Server: Found pluginData in request:', body.pluginData);

            // Store each field's value
            for (const fieldName of fieldNames) {
                const value = body.pluginData[fieldName];
                if (!value) return

                await storageManager.storeData(fieldName + '-' + video.id, value);

            }
        }
    })

    // Add your custom value to the video, so the client autofill your field using the previously stored value
    registerHook({
        target: 'filter:api.video.get.result',
        handler: async (video) => {
            if (!video) return video
            if (!video.pluginData) video.pluginData = {}

            const result = await storageManager.getData('course' + '-' + video.id)
            video.pluginData['course'] = result
            return result
        }
    })

    /*registerHook({
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
    });*/
}
async function unregister () {
    return
}

module.exports = {
    register,
    unregister
}
