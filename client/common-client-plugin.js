function register ({ registerVideoField }) {
    const courseOptions = [
        { label: 'SOFA-101 Intro to Film', value: 'sofa-101' },
        { label: 'SOFA-201 Film History', value: 'sofa-201' },
        { label: 'SOFA-301 Advanced Cinematography', value: 'sofa-301' }
        // Add more courses as needed
    ]

    registerVideoField({
        name: 'course-select',
        label: 'Course',
        type: 'select',
        options: courseOptions,
        default: null,
        // This will appear in the video upload form
        descriptionHTML: 'Select the course this video belongs to',
        // Optional validation
        validate: async (value) => {
            if (!value) return { error: 'Please select a course' }
            return { error: null }
        }
    })
}

export {
    register
}
