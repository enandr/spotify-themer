#!/usr/bin/env node
import inquirer from 'inquirer';
import {exec,execSync,spawnSync} from 'child_process';
import fs from 'fs'
import {userInfo} from 'os'
function startCli() {
    let currentTheme = ''
    let currentScheme = ''

    fs.readFile(`/Users/${userInfo().username}/.config/spicetify/config-xpui copy.ini`, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        data.split('\n').forEach(line => {
            if (line.includes('color_scheme')){
                currentScheme = line.substring(line.indexOf('= ') + 1);
            } else if (line.includes('current_theme')) {
                currentTheme = line.substring(line.indexOf('= ') + 1);;
            }
        })
        console.log('Your Current Theme Is:',currentTheme)
        console.log('Your Current Color Scheme Is:',currentScheme)
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'What are you wanting to do?',
                    name: "selection",
                    choices: ['Select spicetify Theme','Reset Spotify Theme']
                },
            ])
            .then(({selection}) => {
                switch (selection) {
                    case 'Reset Spotify Theme':
                        console.info('Install Is Not Working Yet');
                        break;
                    case 'Select spicetify Theme':
                        exec(`ls /Users/${userInfo().username}/.config/spicetify/Themes`,
                            function (error, stdout, stderr) {
                                const themes = []
                                const themeList = stdout.split('\n');
                                themeList.forEach(theme => {
                                    if (theme !== '') {
                                        themes.push(theme)
                                    }
                                })
                                pickBaseTheme(themes)
                            });
                        break;
                }
            })
            .catch((error) => {
                if (error.isTtyError) {
                    // Prompt couldn't be rendered in the current environment
                } else {
                    // Something else went wrong
                }
            });
    });
}

function pickBaseTheme(themes) {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What theme do you want to use?',
                name: "themeSelection",
                choices: themes
            },
        ])
        .then((answers) => {
            console.log(answers.themeSelection)
            pickColorScheme(answers.themeSelection)
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });
}

function pickColorScheme(theme) {
    fs.readFile(`/Users/${userInfo().username}/.config/spicetify/Themes/${theme}/color.ini`, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const availableColorSchemes = []
        data.split('\n').forEach(scheme => {
            if (scheme.includes('[') && scheme.includes(']')) {
                const positions = []
                positions.push(scheme.indexOf('[') + 1)
                positions.push(scheme.indexOf(']'))
                availableColorSchemes.push(scheme.substring(positions[0],positions[1]))
            }
        })
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'What theme do you want to use?',
                    name: "colorScheme",
                    choices: availableColorSchemes
                },
            ])
            .then(({colorScheme}) => {
                updateTheme(theme,colorScheme)
            })
            .catch((error) => {
                if (error.isTtyError) {
                    // Prompt couldn't be rendered in the current environment
                } else {
                    // Something else went wrong
                }
            });
    });
}

function updateTheme(theme,colorScheme) {
    console.log(theme,colorScheme)
    let currentTheme = ''
    let currentScheme = ''

    fs.readFile(`/Users/${userInfo().username}/.config/spicetify/config-xpui copy.ini`, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        data.split('\n').forEach(line => {
            if (line.includes('color_scheme')){
                currentScheme = line;
            } else if (line.includes('current_theme')) {
                currentTheme = line;
            }
        })

        let newTheme = currentTheme;
        newTheme = newTheme.split('= ')
        newTheme[1] = theme
        newTheme = newTheme.join('= ')
        const themeReplaced = data.replace(currentTheme, newTheme);

        let newScheme = currentScheme;
        newScheme = newScheme.split('= ')
        newScheme[1] = colorScheme
        newScheme = newScheme.join('= ')
        var allReplaced = themeReplaced.replace(currentScheme, newScheme);

        fs.writeFile(`/Users/${userInfo().username}/.config/spicetify/config-xpui.ini`, allReplaced, 'utf8', function (err) {
            if (err) return console.error(err);
            console.log('Update Has Completed. Please run:')
            console.log('spicetify apply')
            /*const myShellScript = execSync('spicetify apply',{encoding: 'utf-8',shell: "/bin/zsh"});
            myShellScript.stdout.on('data', (data)=>{
                console.log(data);
                // do whatever you want here with data
            });
            myShellScript.stderr.on('data', (data)=>{
                console.error(data);
            });*/
            /*exec('sh ./apply.sh',
                function (error, stdout, stderr) {
                console.log(stdout)
                });*/
            /*const changingTheme = spawn('sh',['spicetify apply'])
            changingTheme.stdout.on('data', output => {
                // the output data is captured and printed in the callback
                console.log("Output: ", output.toString())
            })
            changingTheme.stdout.on('error', output => {
                // the output data is captured and printed in the callback
                console.error("Output: ", output.toString())
            })*/
        });
    });
}

startCli();
