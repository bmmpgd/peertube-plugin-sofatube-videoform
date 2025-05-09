// client/commonclient-plugin.js
async function register ({ registerVideoField, registerHook, peertubeHelpers }) {

    for (const type of ['upload', 'import-url', 'import-torrent', 'update']) {
        // the tab that the form field will show up in during video submission
        const videoFormTab = { type, tab: 'main' };

        registerVideoField({
            name: 'course',
            label: 'Course',
            type: 'select',
            options: [
                {label: 'SOFA-101 Intro to Film', value: 'sofa-101'},
                {label: 'SOFA-201 Film History', value: 'sofa-201'},
                {label: 'SOFA-301 Advanced Cinematography', value: 'sofa-301'}
            ],
            default: '',
            descriptionHTML: await peertubeHelpers.translate('Select the course this video was made for'),
            error: ({ formValues, value }) => {
                if (value) return { error: false }
                return { error: true, text: 'Please select a course' }
            }
        }, videoFormTab);

        registerVideoField({
            name: 'program',
            label: 'Program',
            type: 'select',
            options: [
                {label: 'FILMAN-BFA', value: 'Film & Animation (BFA)'},
                {label: 'DIGCIME', value: 'Motion Picture Science (2MJ)'},
                {label: 'DIGCIME-2M', value: 'Motion Picture Science (2MJ)'},
                {label: 'FILMAN', value: 'Film & Animation (2M)'},
                {label: 'JPHC', value: 'rit-plan-JPHC'},
                {label: 'JPHF', value: 'rit-plan-JPHF'},
                {label: 'JPHQ', value: 'rit-plan-JPHQ'},
                {label: 'SOFANM', value: 'rit-plan-SOFANM'},
                {label: 'SOFANM-BFA', value: 'rit-plan-SOFANM-BFA'},
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
    }

    registerHook({
        target: 'action:video-watch.player.loaded',
        handler: (video) => {
            //console.log('PLAYER LOADED, VIDEO INFO: ', video.video.pluginData);
            const divElement = document.createElement('div');
            divElement.className = 'attribute';
            divElement.setAttribute('_ngcontent-ng-c3551149677', '');

// Create the first span (label)
            const labelSpan = document.createElement('span');
            labelSpan.className = 'attribute-label';
            labelSpan.setAttribute('_ngcontent-ng-c3551149677', '');
            labelSpan.textContent = 'Course';

// Create the second span (value)
            const valueSpan = document.createElement('span');
            valueSpan.className = 'attribute-value';
            valueSpan.setAttribute('_ngcontent-ng-c3551149677', '');
            valueSpan.textContent = video.video.pluginData;

// Append the spans to the div
            divElement.appendChild(labelSpan);
            divElement.appendChild(valueSpan);
            document.getElementsByTagName('my-video-attributes')[0].append(divElement);

        }
    });
}

export {
    register
}
