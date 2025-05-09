// client/commonclient-plugin.js
const courseOptions = import('../assets/formfields/courses');
const programOptions = import('../assets/formfields/programs');
const genreOptions = import('../assets/formfields/genre');
const instructorOptions = import('../assets/formfields/instructors');
async function register ({ registerVideoField, registerHook, peertubeHelpers }) {


    for (const type of ['upload', 'import-url', 'import-torrent', 'update']) {
        // the tab that the form field will show up in during video submission
        const videoFormTab = { type, tab: 'main' };

        registerVideoField({
            name: 'Course',
            label: 'Course',
            type: 'select',
            options: [
                {label: 'SOFA-101 Intro to Film', value: 'SOFA-101 Intro to Film'},
                {label: 'SOFA-201 Film History', value: 'SOFA-201 Film History'},
                {label: 'SOFA-301 Advanced Cinematography', value: 'SOFA-301 Advanced Cinematography'}
            ],
            default: '',
            descriptionHTML: await peertubeHelpers.translate('Select the course this video was made for'),
            error: ({ formValues, value }) => {
                if (value) return { error: false }
                return { error: true, text: 'Please select a course' }
            }
        }, videoFormTab);

        registerVideoField({
            name: 'Program',
            label: 'Program',
            type: 'select',
            options: [
                {label: 'FILMAN-BFA', value: 'Film & Animation (BFA)'},
                {label: 'DIGCIME', value: 'Motion Picture Science (2MJ)'},
                {label: 'DIGCIME-2M', value: 'Motion Picture Science (2MJ)'},
                {label: 'FILMAN', value: 'Film & Animation (2M)'},
                {label: 'JPHC', value: 'RIT-plan-JPHC'},
                {label: 'JPHF', value: 'RIT-plan-JPHF'},
                {label: 'JPHQ', value: 'RIT-plan-JPHQ'},
                {label: 'SOFANM', value: 'RIT-plan-SOFANM'},
                {label: 'SOFANM-BFA', value: 'RIT-plan-SOFANM-BFA'},
                {label: 'DIGCIME-BS', value: 'Motion Picture Science (BS)'},
                {label: 'FILMAN-MFA', value: 'Film and Animation (MFA)'},
            ],
            default: '',
            descriptionHTML: await peertubeHelpers.translate('Select your RIT program'),
            error: ({ formValues, value }) => {
                if (value) return { error: false }
                return { error: true, text: 'Please select a program' }
            }
        }, videoFormTab );
        registerVideoField({
            name: 'Year',
            label: 'Year',
            type: 'select',
            options: [
                {label: '1', value: '1'},
                {label: '2', value: '2'},
                {label: '3', value: '3'},
                {label: '4', value: '4'},
                {label: '5', value: '5'},
                {label: '6', value: '6'},
            ],
            default: '1',
            descriptionHTML: await peertubeHelpers.translate('Select your program year level.'),
            error: ({ formValues, value }) => {
                if (value) return { error: false }
                return { error: true, text: 'Please select a year level' }
            }
        }, videoFormTab );
        registerVideoField({
            name: 'Genre',
            label: 'Genre',
            type: 'select',
            options: [
                {label: 'Fiction', value: 'Fiction'},
                {label: 'Non-fiction', value: 'Non-fiction'},
                {label: 'Experimental', value: 'Experimental'},
                {label: 'Documentary', value: 'Documentary'},
                {label: '3D Animation', value: '3D Animation'},
                {label: '2D Animation', value: '2D Animation'},
                {label: 'Stop motion', value: 'Stop motion'},
                {label: 'Craft track', value: 'Craft track'}
            ],
            default: '1',
            descriptionHTML: await peertubeHelpers.translate('Select your program year level.'),
            error: ({ formValues, value }) => {
                if (value) return { error: false }
                return { error: true, text: 'Please select a year level' }
            }
        }, videoFormTab );
        registerVideoField({
            name: 'Instructor',
            label: 'Instructor',
            type: 'select',
            options: [
                {label: 'Ricardo Figueroa', value: 'Ricardo Figueroa'},
                {label: 'Munjal Yagnik', value: 'Munjal Yagnik'},
                {label: 'Vashti Anderson', value: 'Vashti Anderson'},
                {label: 'David Long', value: 'David Long'}
            ],
            default: '',
            descriptionHTML: await peertubeHelpers.translate('Select the professor for the course.'),
            error: ({ formValues, value }) => {
                if (value) return { error: false }
                return { error: true, text: 'Please select a professor.' }
            }
        }, videoFormTab );
        registerVideoField({
            name: 'Tier',
            label: 'Tier Level',
            type: 'select',
            options: [
                {label: 'Tier 1', value: '1'},
                {label: 'Tier 2', value: '2'}
            ],
            default: '',
            descriptionHTML: '',
            error: ({ formValues, value }) => {
                if (value) return { error: false }
                return { error: true, text: 'Please select a tier level.' }
            }
        }, videoFormTab );
    }

    registerHook({
        target: 'action:video-watch.player.loaded',
        handler: (video) => {
            for (const field of video.video.pluginData) {
                const divElement = document.createElement('div');
                divElement.className = 'attribute';
                divElement.setAttribute('_ngcontent-ng-c3551149677', '');

// Create the first span (label)
                const labelSpan = document.createElement('span');
                labelSpan.className = 'attribute-label';
                labelSpan.setAttribute('_ngcontent-ng-c3551149677', '');
                labelSpan.textContent = Object.keys(field);

// Create the second span (value)
                const valueSpan = document.createElement('span');
                valueSpan.className = 'attribute-value';
                valueSpan.setAttribute('_ngcontent-ng-c3551149677', '');
                valueSpan.textContent = Object.values(field);

// Append the spans to the div
                divElement.appendChild(labelSpan);
                divElement.appendChild(valueSpan);
                document.getElementsByTagName('my-video-attributes')[0].append(divElement);
            }
        }
    });
}

export {
    register
}
