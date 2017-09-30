#!/usr/bin/env python
from threading import Lock
from flask import Flask, render_template, session, request
from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect
import nltk

from py_ms_cognitive import PyMsCognitiveImageSearch


from apiclient.discovery import build

# Set this variable to "threading", "eventlet" or "gevent" to test the
# different async modes, or leave it set to None for the application to choose
# the best option based on installed packages.
async_mode = None

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode=async_mode)
thread = None
thread_lock = Lock()

nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('maxent_ne_chunker')
nltk.download('words')

service = None

def background_thread():
    """Example of how to send server generated events to clients."""
    count = 0
    global service
    service = build("customsearch", "v1",
                    developerKey="** your developer key **")
    while True:
        socketio.sleep(10)
        count += 1
        # socketio.emit('my_response',
        #               {'data': 'Server generated event', 'count': count},
        #               namespace='/test')


@app.route('/')
def index():
    return render_template('index.html', async_mode=socketio.async_mode)


@socketio.on('my_event_continuous', namespace='/test')
def test_message_cont(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    sentence = message['data']
    tokens = nltk.word_tokenize(sentence)
    tagged = nltk.pos_tag(tokens)
    entities = nltk.ne_chunk(tagged)
    List1 = []
    for entity in list(entities):
                print(entity)
                if str(type(entity[0])) == "<class 'tuple'>":
                    if check_if_Noun(entity[0][1]):
                        print(str(entity[0][0]))
                        List1.append(entity[0][0])
                else:
                    if entity[0] == "name":
                        continue
                    if entity[0] == "Hello":
                        continue
                    if check_if_Noun(entity[1]):
                        print(entity[0])
                        List1.append(entity[0])

    emit('my_response',
         {'data': str(list(List1)), 'count': session['receive_count']})


@socketio.on('my_event', namespace='/test')
def test_message(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    sentence = message['data']
    tokens = nltk.word_tokenize(sentence)
    tagged = nltk.pos_tag(tokens)
    entities = nltk.ne_chunk(tagged)
    List1 = []
    for entity in list(entities):
                print(entity)
                if str(type(entity[0])) == "<class 'tuple'>":
                    if check_if_Noun(entity[0][1]):
                        print(str(entity[0][0]))
                        List1.append(entity[0][0])
                else:
                    if entity[0] == "name":
                        continue
                    if entity[0] == "Hello":
                        continue
                    if check_if_Noun(entity[1]):
                        print(entity[0])
                        List1.append(entity[0])

    search_term = str(List1).strip('[]')
    search_service = PyMsCognitiveImageSearch('202acb04bda84cc48f8bcf57027a30a2', search_term)
    first_fifty_result = search_service.search(limit=50, format='json')  # 1-50
    second_fifty_result = search_service.search(limit=50, format='json')  # 51-100


    emit('my_response',
         {'data': str(second_fifty_result[0].content_url), 'count': session['receive_count']})


@socketio.on('my_broadcast_event', namespace='/test')
def test_broadcast_message(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response',
         {'data': message['data'], 'count': session['receive_count']},
         broadcast=True)


@socketio.on('join', namespace='/test')
def join(message):
    join_room(message['room'])
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response',
         {'data': 'In rooms: ' + ', '.join(rooms()),
          'count': session['receive_count']})


@socketio.on('leave', namespace='/test')
def leave(message):
    leave_room(message['room'])
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response',
         {'data': 'In rooms: ' + ', '.join(rooms()),
          'count': session['receive_count']})


@socketio.on('close_room', namespace='/test')
def close(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response', {'data': 'Room ' + message['room'] + ' is closing.',
                         'count': session['receive_count']},
         room=message['room'])
    close_room(message['room'])


@socketio.on('my_room_event', namespace='/test')
def send_room_message(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response',
         {'data': message['data'], 'count': session['receive_count']},
         room=message['room'])


@socketio.on('disconnect_request', namespace='/test')
def disconnect_request():
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response',
         {'data': 'Disconnected!', 'count': session['receive_count']})
    disconnect()


@socketio.on('my_ping', namespace='/test')
def ping_pong():
    emit('my_pong')


@socketio.on('connect', namespace='/test')
def test_connect():
    global thread
    with thread_lock:
        if thread is None:
            thread = socketio.start_background_task(target=background_thread)
    emit('my_response', {'data': 'Connected', 'count': 0})


@socketio.on('disconnect', namespace='/test')
def test_disconnect():
    print('Client disconnected', request.sid)

def check_if_Noun(entity):
    if entity == 'NN':
        return True
    if entity == 'NNP':
        return True
    if entity == 'NNS':
        return True
    if entity == "GPE":
        return True
    else:
        return False


if __name__ == '__main__':
    socketio.run(app, debug=True)
