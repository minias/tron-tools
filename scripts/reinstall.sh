#!/bin/bash
Ver="0.0.4"
npm run build
npm run package
code --uninstall-extension miniaslee.tron-tools
#mac
rm -rf ~/Library/Application\ Support/Code/CachedExtensionVSIXs/*
# win
#rm -rf %APPDATA%\Code\CachedExtensionVSIXs\
# linux
#rm -rf ~/.config/Code/CachedExtensionVSIXs/

code --install-extension tron-tools-$Ver.vsix