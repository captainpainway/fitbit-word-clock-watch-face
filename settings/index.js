function Colors(props) {
    return (
        <Page>
            <Section>
                <Toggle
                    settingsKey="showHR"
                    label="Show Heart Rate"
                />
                <Toggle
                    settingsKey="showSteps"
                    label="Show Step Counter"
                />
                <Text bold align="center">Main Color Settings</Text>
                <ColorSelect
                    settingsKey="textcolor"
                    colors={[
                        {color: 'white'},
                        {color: '#ff007a'},
                        {color: 'orange'},
                        {color: 'gold'},
                        {color: 'aquamarine'},
                        {color: 'deepskyblue'},
                        {color: 'plum'},
                        {color: '#551584'}
                    ]}
                />
                <Text bold align="center">Heart Rate Color Settings</Text>
                <ColorSelect
                    settingsKey="hrcolor"
                    colors={[
                        {color: 'white'},
                        {color: '#ff007a'},
                        {color: 'orange'},
                        {color: 'gold'},
                        {color: 'aquamarine'},
                        {color: 'deepskyblue'},
                        {color: 'plum'},
                        {color: '#551584'}
                    ]}
                />
                <Text bold align="center">Step Counter Color Settings</Text>
                <ColorSelect
                    settingsKey="stepcolor"
                    colors={[
                        {color: 'white'},
                        {color: '#ff007a'},
                        {color: 'orange'},
                        {color: 'gold'},
                        {color: 'aquamarine'},
                        {color: 'deepskyblue'},
                        {color: 'plum'},
                        {color: '#551584'}
                    ]}
                />
            </Section>
        </Page>
    );
}

registerSettingsPage(Colors);
