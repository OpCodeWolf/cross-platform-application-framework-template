# NodeGUI Cross Platform Application Template
This template is a cross platform application built on NodeGui in Typescript


## Installation
```
npm install
```

### Debian
QT is required to be installed along with the libxcb plugins
Note: These need to be tested for minimum requirements. You may not need them all.
https://packages.debian.org/bullseye/amd64/libxcb-util1/download
To install all of the libxcb libraries:
```sh
sudo apt-get install libxcb-*
```

#### Using a custom Qt installation (Optional)

Just set export `QT_INSTALL_DIR=<your qt path>`  For example it would look something like this export `QT_INSTALL_DIR=/usr/local/Qt-6.6.0`. Add this in your .zshrc or .bashrc so that you dont need to repeat this process again.
The logs should say something like CustomQt detected at `<your qt path>`. Hence, skipping Mini Qt installation.

## Development

If you are using a custom Qt installation, you will need to add the QT_INSTALL_DIR export and then rm -rf node_modules and do npm install again.

```sh
npm run dev
```

### Development Resources:
Project Workspace: https://github.com/users/OpCodeWolf/projects/1/views/1

Bug Reports: I'm not currently accepting any Bug Fixes, until the initial project work is nearly completed.


## Packaging
Packaging will only package what is on the repository and you must be connected to the internet.
To package the project run the command:
```sh
npm run package
```
