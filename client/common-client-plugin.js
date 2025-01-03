function register ({ registerHook, registerVideoField, peertubeHelpers }) {
    const commonOptions = {
        name: 'Course',
        label: 'Course the video was created for',
        descriptionHTML: 'Dropdown of SOFA courses',

        // type: 'input' | 'input-checkbox' | 'input-password' | 'input-textarea' | 'markdown-text' | 'markdown-enhanced' | 'select' | 'html'
        // /!\ 'input-checkbox' could send "false" and "true" strings instead of boolean
        type: 'select',

        default: '',

        // Optional, to hide a field depending on the current form state
        // liveVideo is in the options object when the user is creating/updating a live
        // videoToUpdate is in the options object when the user is updating a video
        /*hidden: ({ formValues, videoToUpdate, liveVideo }) => {
            return formValues.pluginData['other-field'] === 'toto'
        },*/

        // Optional, to display an error depending on the form state
        error: ({ formValues, value }) => {
            if (formValues['privacy'] !== 1 && formValues['privacy'] !== 2) return { error: false }
            if (value === true) return { error: false }

            return { error: true, text: 'Should be enabled' }
        }
    }

    const videoFormOptions = {
        // Optional, to choose to put your setting in a specific tab in video form
        // type: 'main' | 'plugin-settings'
        tab: 'main'
    }

    for (const type of [ 'upload', 'import-url', 'import-torrent', 'update', 'go-live' ]) {
        registerVideoField(commonOptions, { type, ...videoFormOptions  })
    }

}

export {
  register
}
