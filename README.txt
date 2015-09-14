angular-tictactoe README

1. mkvirtualenv angular

2. pip install pyramid 

3. pcreate -s starter angular-tictactoe

Clean mytemplate.pt

4. Add bootstrap support
     <app>/static/css
     <app>/static/font
     <app>/static/js
5. Run python setup.py test -q to test 
   Run python setup.py develop for development

6. pserve development.ini

7. Add angular.js 
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>


Deploy to Heroku

heroku create --stack cedar

git push heroku master

heroku scale web=1

heroku open

heroku ps

heroku logs -t