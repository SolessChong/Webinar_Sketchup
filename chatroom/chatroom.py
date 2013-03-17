import cgi
import logging
import os
import sys
import webapp2

from django.utils import simplejson as json
from google.appengine.api import app_identity
from google.appengine.api import channel
from google.appengine.api import users
from google.appengine.ext import db
from google.appengine.ext.webapp import template
from datetime import datetime
from datetime import timedelta


TEST_TRANSCRIPT_ITEMS = [
    ['Joe Schmoe', 'Hello world'],
    ['John Smith', 'Hello Joe!'],
    ['Test Test', 'Testing 123']]


TEST_ROSTER_ITEMS = [
    ['1', 'Joe Schmoe', True],
    ['2', 'Test 1', True],
    ['3', 'John Smith', False],
    ['4,', 'Test Test', False]]


class Person(db.Model):
  nickname = db.StringProperty()
  online = db.BooleanProperty()


class Roster():
    def get_roster(self):
        query = db.Query(Person)
        query.order('online')
        roster = []
        for person in query:
            roster.append([person.key().name(), person.nickname, person.online])
        return roster


class Broadcaster():
    def broadcast(self, message):
        people = Person.all()
        for person in people:
            channel.send_message(str(person.key().name()), json.dumps([message]))

    def broadcast_message(self, person, message):
        self.broadcast(['m', [person.nickname, message]])

    def broadcast_roster(self):
        # TODO(moishel): get the roster message and broadcast it.
        pass


class UpdateNicknameHandler(webapp2.RequestHandler):
    def post(self):
        user = users.get_current_user()
        if not user:
            self.response.set_status(401)
            return
        person = Person.get_by_key_name(user.user_id())
        nickname = cgi.escape(self.request.get('nickname'))
        if not person:
            person = Person(key_name=user.user_id(),
                            nickname = nickname,
                            online = False);
        else:
            person.nickname = nickname
        person.put()
        Broadcaster().broadcast_roster()
        self.redirect('/')


class SendMessageHandler(webapp2.RequestHandler):
    def post(self):
        user = users.get_current_user()
        if not user:
            self.response.set_status(401)
            return
        person = Person.get_by_key_name(user.user_id())
        if not person:
            self.response.set_status(401)
            return
        message = cgi.escape(self.request.get('m'))
        Broadcaster().broadcast_message(person, message)


class ChatroomHandler(webapp2.RequestHandler):
    def get_initial_messages(self):
        initial_messages = []
        if self.request.get('test') == 'y':
            initial_messages = map(lambda x: ['m', x], TEST_TRANSCRIPT_ITEMS)
            initial_messages.append(['r', TEST_ROSTER_ITEMS])
        else:
            roster = Roster().get_roster()
            initial_messages = [['r', roster]]
            # TODO(moishel): store and broadcast a recent transcript
        return initial_messages

    def get(self):
        user = users.get_current_user()
        if user:
            person = Person.get_by_key_name(user.user_id())
            if not person:
                path = os.path.join(os.path.dirname(__file__), 'welcome.html')
                self.response.out.write(template.render(path, {'nickname': user.nickname()}))
            else:
                token = channel.create_channel(user.user_id())
                initial_messages = self.get_initial_messages()
                path = os.path.join(os.path.dirname(__file__), 'chatroom.html')
                self.response.out.write(template.render(path,
                                                        {'token': token,
                                                         'initial_messages': json.dumps(initial_messages)}))
        else:
            self.redirect(users.create_login_url(self.request.uri))


class ChannelPresenceHandler(webapp2.RequestHandler):
    def post(self, connect_state):
        pass

app = webapp2.WSGIApplication([
    ('/', ChatroomHandler),
    ('/updatenick', UpdateNicknameHandler),
    ('/sendmessage', SendMessageHandler),
    ('/_ah/channel/(connected|disconnected)/', ChannelPresenceHandler)], debug=True)
