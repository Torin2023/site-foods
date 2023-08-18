#!/bin/bash
rsync -av --update index.html /Applications/AMPPS/www/site-foods/
rsync -av --update css/ /Applications/AMPPS/www/site-foods/css/
rsync -av --update icons/ /Applications/AMPPS/www/site-foods/icons/
rsync -av --update img/ /Applications/AMPPS/www/site-foods/img/
rsync -av --update dist/ /Applications/AMPPS/www/site-foods/dist/
