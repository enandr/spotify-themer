
# Spotify Themer

Use spotify-themer to change the spotify theme without editing the files manually



## spicetify Installation

### Install spicetify on MAC or LINUX
#### Install

```bash
curl -fsSL https://raw.githubusercontent.com/spicetify/spicetify-cli/master/install.sh | sh
```
#### Setup The Config
```bash
spicetify config
```
#### Restart To Affect Changes
```bash
spicetify restart
```

## Download Themes
```
cd /Users/[your name]/.config/spicetify/Themes
```
#### Clone the themes repo
```
git clone git@github.com:spicetify/spicetify-themes.git
```
#### Copy themes
Copy all the themes into
```
/Users/[your name]/.config/spicetify/Themes
```
## spotify-themer Installation

### Install spotify-themer on MAC or LINUX
#### Clone spotify-themer

```
git clone git@github.com:enandr/spotify-themer.git
```
#### open the spotify-themer folder
```
cd spotify-themer
```
#### install npm packages
```
npm install
```
#### install spotify-themer globally
```
npm -g ./
```
#### run the cli
```
spotify-themer
```
#### use the cli to pick your theme and color scheme
---
#### run the command below to apply the changes
```
spicetify apply 
```
