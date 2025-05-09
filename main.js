async function register ({
                             registerHook,
                             storageManager,
                             registerSetting
                         }) {
    const fieldNames = ['Course', 'Program', 'Year', 'Genre', 'Instructor', 'Tier'];

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

            // Store each field's value
            const annotationsText = body.pluginData[fieldNames[0]]
            if (!annotationsText) return
            const value = fieldNames.map(fieldName => {
                return {
                    [fieldName]: body.pluginData[fieldName]
                };
            });
            storageManager.storeData('sofatube' + '-' + video.id, value);
        }
    })

    // Add your custom value to the video, so the client autofill your field using the previously stored value
    registerHook({
        target: 'filter:api.video.get.result',
        handler: async (video) => {
            if (!video) return video
            if (!video.pluginData) video.pluginData = {}

            const result = await storageManager.getData('sofatube' + '-' + video.id)
            video.pluginData = result
            return video
        }
    })

}
async function unregister () {
    return
}

module.exports = {
    register,
    unregister
}
