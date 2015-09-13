from pyramid.config import Configurator
from pyramid.session import UnencryptedCookieSessionFactoryConfig

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    my_session_factory = UnencryptedCookieSessionFactoryConfig('itsaseekreet', 1200)
    config = Configurator(settings=settings, session_factory=my_session_factory)
    config.include('pyramid_chameleon')
    config.add_static_view('static', 'static', cache_max_age=0) #default cache_max_age = 3600
    config.add_route('home', '/')
    config.add_route('cities', '/cities')
    config.add_route('city', '/cities/{name}')
    config.add_route('api.test', '/api/test')
    config.add_route('api.init', '/api/init')
    config.add_route('api.update', '/api/update')
    config.add_route('api.history', '/api/history')
    config.scan()
    return config.make_wsgi_app()
