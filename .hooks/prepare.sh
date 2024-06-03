#!/usr/bin sh

# echo  "Preparing git config..."

git config --local user.name "Bhairesh M"
git config --local user.email "bhairesh@arithaconsulting.com"
git config core.hooksPath .hooks

chmod +x .hooks/*