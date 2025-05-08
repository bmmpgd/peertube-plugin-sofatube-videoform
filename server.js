async function register ({
                             registerHook,
                             storageManager
                         }) {
    const fieldName = 'course-select'

    // Store data associated to this video
    registerHook({
        target: 'action:api.video.updated',
        handler: ({ video, req }) => {
            if (!req.body.pluginData) return

            const value = req.body.pluginData[fieldName]
            if (!value) return
            console.log(fieldName,': ',value);
            storageManager.storeData(fieldName + '-' + video.id, value)
        }
    })

    // Add your custom value to the video, so the client autofill your field using the previously stored value
    registerHook({
        target: 'filter:api.video.get.result',
        handler: async (video) => {
            if (!video) return video
            if (!video.pluginData) video.pluginData = {}

            const result = await storageManager.getData(fieldName + '-' + video.id)
            video.pluginData[fieldName] = result

            return video
        }
    })
}
