from pyramid.view import view_config
from model import Player, History, Game


@view_config(route_name='home', renderer='templates/index.pt')
def my_view(request):
    return {'project': 'angular-tictactoe'}
    
@view_config(route_name='api.init', renderer='json')
def init_game(request):
    print "Init game..."
    player1 = Player("Player 1")
    player2 = Player("Player 2")
    game = Game(player1, player2)
    # Store game object to session
    request.session['game'] = game
    # Print game id for DEBUG
    print game.id()
    return game.toJSON()

@view_config(route_name='api.update', renderer='json')
def update_board(request):
    if 'game' not in request.session:
        return NO_GAME_OBJECT_ERROR
    game = request.session['game']

    if 'history' not in request.session:
        request.session['history'] = History()
    history = request.session['history']

    print 'Update game board...'
    index = int(request.params['index'])
    print game.id() #for DEBUG
    game.update_board(index)
    game.check_winner()
    request.session['game'] = game

    if game.is_finished():
        print "Save to history..."
        history.add(game)
        request.session['history'] = history
    return game.toJSON()

@view_config(route_name='api.history', renderer='json')
def get_history(request):
    history = request.session['history']
    print 'Get game history...'
    return history.toJSON()