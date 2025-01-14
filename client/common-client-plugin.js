function register ({ registerHook, registerVideoField, peertubeHelpers }) {
    const favicon = document.querySelector('link[rel="icon"]')
    favicon.href = peertubeHelpers.getBaseStaticRoute() + '/images/sofa.png'

    const courseOptions = [
        {label: 'SOFA-101 Intro to Film', value: 'sofa-101'},
        {label: 'SOFA-201 Film History', value: 'sofa-201'},
        {label: 'SOFA-301 Advanced Cinematography', value: 'sofa-301'}
    ]

    // Register the field for the upload form
    registerVideoField({
        name: 'course-select',
        label: 'Course',
        type: 'select',
        options: courseOptions,
        default: null,
        descriptionHTML: 'Select the course this video belongs to',
        validate: async (value) => {
            if (!value) return {error: 'Please select a course'}
            return {error: null}
        }
    })
}

export {
    register
}
