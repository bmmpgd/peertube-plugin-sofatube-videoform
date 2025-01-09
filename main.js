async function register({registerVideoField, registerHook}) {
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

    registerHook({
        target: 'action:video-watch.video.loaded',
        handler: ({video}) => {
            if (!video.pluginData?.['course-select']) return

            const courseValue = video.pluginData['course-select']
            const course = courseOptions.find(c => c.value === courseValue)

            if (!course) return

            // Create and insert course info element
            const courseInfo = document.createElement('div')
            courseInfo.className = 'course-info'
            courseInfo.innerHTML = `
        <style>
          .course-info {
            margin: 10px 0;
            padding: 8px;
            background: #f5f5f5;
            border-radius: 4px;
          }
          .course-label {
            font-weight: bold;
            margin-right: 5px;
          }
        </style>
        <span class="course-label">Course:</span>
        <span>${course.label}</span>
      `

            const videoInfoElement = document.querySelector('.video-info-first-row')
            if (videoInfoElement) {
                videoInfoElement.appendChild(courseInfo)
            }
        }
    })
}

async function unregister () {
    return
}

module.exports = {
    register
}
